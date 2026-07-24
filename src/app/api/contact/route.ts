import { NextResponse } from "next/server";

interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string; // honeypot
}

const LIMITS = {
  name: 80,
  subject: 120,
  message: 2000,
  body: 10_000,
};

const EMAIL_RE =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function truncate(input: string, max: number): string {
  return input.length > max ? input.slice(0, max) : input;
}

// Rate limit em memória por IP (best-effort; em produção, usar Upstash/Vercel KV)
const buckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 60_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

function getIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getIp(request);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente em alguns instantes." },
      { status: 429 }
    );
  }

  let body: ContactBody;
  try {
    const raw = await request.text();
    if (raw.length > LIMITS.body) {
      return NextResponse.json({ error: "Payload muito grande." }, { status: 413 });
    }
    body = JSON.parse(raw) as ContactBody;
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar a mensagem." },
      { status: 400 }
    );
  }

  // Honeypot: bots preenchem o campo invisível "company"
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nome, e-mail e mensagem são obrigatórios." },
      { status: 400 }
    );
  }

  if (name.length > LIMITS.name || subject.length > LIMITS.subject || message.length > LIMITS.message) {
    return NextResponse.json(
      { error: "Um ou mais campos excedem o tamanho máximo permitido." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const safe = {
    name: escapeHtml(truncate(name, LIMITS.name)),
    email: escapeHtml(truncate(email, 254)),
    subject: escapeHtml(truncate(subject, LIMITS.subject)),
    message: escapeHtml(truncate(message, LIMITS.message)),
    ip,
    timestamp: new Date().toISOString(),
  };

  // Em produção, encaminhar para Resend/SendGrid/SMTP.
  // Log seguro: tudo escapado contra XSS em coletores downstream.
  console.info("[Contact]", {
    name: safe.name,
    email: safe.email,
    subject: safe.subject,
    messagePreview: safe.message.slice(0, 120),
    messageLength: safe.message.length,
    ip: safe.ip,
    timestamp: safe.timestamp,
  });

  return NextResponse.json({
    success: true,
    message: "Mensagem recebida com sucesso! Entrarei em contato em breve.",
  });
}

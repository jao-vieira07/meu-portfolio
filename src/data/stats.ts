export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export const stats: StatItem[] = [
  { label: "Projetos no GitHub", value: 3 },
  { label: "Tecnologias em foco", value: 6 },
  { label: "Commits no GitHub", value: 50, suffix: "+" },
  { label: "Horas de estudo", value: 200, suffix: "+" },
];

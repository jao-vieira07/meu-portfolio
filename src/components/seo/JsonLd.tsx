import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: siteUrl,
    sameAs: [
      profile.social.linkedin,
      profile.social.github,
      profile.social.instagram,
    ],
    knowsAbout: [
      "Java",
      "PostgreSQL",
      "JDBC",
      "Git",
      "Programação Orientada a Objetos",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "UNIFIL",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

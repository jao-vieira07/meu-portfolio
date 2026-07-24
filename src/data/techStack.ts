export interface TechItem {
  name: string;
  icon: string;
  description: string;
  color: string;
}

export const techStack: TechItem[] = [
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    description:
      "Linguagem que utilizo nos meus projetos. Base em OOP, lógica de programação e persistência.",
    color: "#f89820",
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    description: "Iniciando os estudos.",
    color: "#6db33f",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    description:
      "Banco relacional usado no projeto de financiamento, com modelagem e consultas SQL.",
    color: "#336791",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-plain.svg",
    description:
      "Controle de versão no dia a dia: commits, branches e organização dos meus repositórios.",
    color: "#f05032",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    description:
      "Onde publico meus projetos, acompanho evolução e mantenho meu código versionado.",
    color: "#ffffff",
  },
];

export type ProjectCategory = "Back-End" | "Full Stack" | "Estudos" | "APIs";

export interface Project {
  id: string;
  title: string;
  description: string;
  challenges: string[];
  technologies: string[];
  category: ProjectCategory;
  github: string;
  demo?: string;
  video?: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "sistema-financiamento",
    title: "Sistema de Financiamento Imobiliário",
    description:
      "Sistema de financiamento imobiliário em Java com persistência em PostgreSQL via JDBC e padrão DAO. Refatoração focada em organização de código e acesso a dados.",
    challenges: [
      "Modelar entidades e relacionamentos no PostgreSQL",
      "Implementar camada DAO para isolamento do banco",
      "Refatorar o sistema mantendo a lógica de negócio funcional",
    ],
    technologies: ["Java", "PostgreSQL", "JDBC", "Git", "GitHub"],
    category: "Back-End",
    github: "https://github.com/jao-vieira07/Sistema-de-Financiamento-Refatorado",
    image: "/images/project-crud.svg",
    featured: true,
  },
  {
    id: "pequeno-ecommerce",
    title: "Pequeno E-commerce",
    description:
      "Projeto de estudo em Java simulando um pequeno e-commerce, com foco em lógica de negócio, estrutura de classes e prática de programação orientada a objetos.",
    challenges: [
      "Estruturar classes e responsabilidades do domínio",
      "Aplicar conceitos de OOP em um cenário prático",
      "Versionar o projeto com Git e GitHub",
    ],
    technologies: ["Java", "Git", "GitHub"],
    category: "Estudos",
    github: "https://github.com/jao-vieira07/Pequeno-Ecommerce",
    image: "/images/project-api.svg",
    featured: true,
  },
  {
    id: "meu-portfolio",
    title: "Portfólio Pessoal",
    description:
      "Este portfólio — desenvolvido com Next.js, TypeScript e Tailwind CSS — para apresentar minha trajetória, projetos e contato profissional.",
    challenges: [
      "Criar interface responsiva com identidade visual própria",
      "Organizar conteúdo de forma clara para recrutadores",
      "Publicar e manter o site atualizado",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Git", "GitHub"],
    category: "Full Stack",
    github: "https://github.com/jao-vieira07/meu-portfolio",
    demo: "https://meu-portfolio-six-delta.vercel.app",
    image: "/images/project-fullstack.svg",
    featured: false,
  },
];

export const projectCategories: ProjectCategory[] = [
  "Back-End",
  "Full Stack",
  "Estudos",
  "APIs",
];

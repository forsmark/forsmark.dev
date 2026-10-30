export interface Role {
  title: string;
  company: string;
  period: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface ResumeData {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  statement: string;
  motto: string;
  email: string;
  linkedin: string;
  github: string;
  roles: Role[];
  education: Education[];
  principles: Principle[];
}

export interface Project {
  id: string;
  tier: "lead" | "more";
  title: string;
  problem: string;
  people: string;
  build: string[];
  status: string;
  year: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
  images?: { src: string; caption?: string }[];
}

export interface Role {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  description: string;
  tech: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Skill {
  name: string;
  since: number;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
  primary?: boolean;
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  aboutShort: string;
  linkedin: string;
  roles: Role[];
  education: Education[];
  skillGroups: SkillGroup[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  year: string;
  demoUrl?: string;
  githubUrl?: string;
  previewHeight?: "sm" | "md" | "lg";
  preview?: string;
  images?: { src: string; caption?: string }[];
}

export interface StatItem {
  label: string;
  value: string;
  subtext?: string;
  icon?: string;
}

export interface SkillItem {
  name: string;
  category: 'Databases' | 'Languages' | 'Web & Frontend' | 'Backend & Data' | 'Tools & DevOps';
  level?: 'Expert' | 'Advanced' | 'Proficient' | 'Familiar';
  icon?: string;
  color?: string;
  highlight?: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location?: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
  schemaDetails?: {
    tablesCount: number;
    seededRecords: number;
    normalization: string;
    architecture: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Database & SQL' | 'Machine Learning' | 'Web Application' | 'E-Commerce';
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  sqlSchemaPreview?: {
    table: string;
    columns: string[];
    sampleRows: Record<string, string | number | boolean>[];
  };
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  year: string;
  grade?: string;
  details?: string;
  coursework?: string[];
}

export interface PortfolioData {
  id: string;
  fullName: string;
  preferredName?: string;
  tagline: string;
  secondaryTagline?: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  avatarUrl: string;
  availableForHire: boolean;
  targetRole: string;
  stats: StatItem[];
  skills: SkillItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  strengths: string[];
  resumePdfUrl: string;
  atsScore?: number;
}

export interface SQLQueryResult {
  query: string;
  columns: string[];
  rows: Record<string, string | number | boolean>[];
  executionTimeMs: number;
  rowsAffected: number;
  message?: string;
}

export interface SampleResumePreset {
  id: string;
  label: string;
  role: string;
  icon: string;
  snippet: string;
}

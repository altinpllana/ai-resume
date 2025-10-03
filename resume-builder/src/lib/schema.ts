export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
  descriptionBullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  years: string;
}

export type TemplateType = 'simple' | 'modern';

export interface ResumeForm {
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string;
  jobDescription: string;
  template: TemplateType;
}

let uid = 0;

function createId() {
  uid += 1;
  return `item-${Date.now()}-${uid}`;
}

export function createExperienceItem(): ExperienceItem {
  return {
    id: createId(),
    company: '',
    role: '',
    start: '',
    end: '',
    description: '',
    descriptionBullets: []
  };
}

export function createEducationItem(): EducationItem {
  return {
    id: createId(),
    school: '',
    degree: '',
    years: ''
  };
}

export function createResumeForm(): ResumeForm {
  return {
    personal: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: ''
    },
    summary: '',
    experience: [createExperienceItem()],
    education: [createEducationItem()],
    skills: '',
    jobDescription: '',
    template: 'simple'
  };
}

export function parseSkills(input: string): string[] {
  const unique = new Set(
    input
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0)
  );
  return Array.from(unique);
}

export function splitBullets(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

import type { ResumeForm } from './schema';
import { parseSkills } from './schema';

export interface AiExperienceUpdate {
  descriptionBullets: string[];
}

export interface AiResponse {
  summary: string;
  experience: AiExperienceUpdate[];
  skills: string[];
}

export async function improveResume(form: ResumeForm): Promise<AiResponse> {
  const payload = {
    personal: form.personal,
    summary: form.summary,
    experience: form.experience.map((item) => ({
      company: item.company,
      role: item.role,
      start: item.start,
      end: item.end,
      description: item.description
    })),
    education: form.education.map((item) => ({
      school: item.school,
      degree: item.degree,
      years: item.years
    })),
    skills: parseSkills(form.skills),
    jobDescription: form.jobDescription || undefined
  };

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorBody.error || 'Failed to contact AI service.');
  }

  const data = (await response.json()) as AiResponse;
  return data;
}

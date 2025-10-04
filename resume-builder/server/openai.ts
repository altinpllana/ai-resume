import OpenAI from 'openai';

type ExperienceInput = {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
};

type EducationInput = {
  school: string;
  degree: string;
  years: string;
};

export interface ResumePayload {
  personal: Record<string, string>;
  summary: string;
  experience: ExperienceInput[];
  education: EducationInput[];
  skills: string[];
  jobDescription?: string;
}

let client: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }
  if (!client) {
    client = new OpenAI({ apiKey });
  }
  return client;
}

export async function requestImprovements(payload: ResumePayload): Promise<string> {
  const openai = getClient();
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const system = `You are an expert resume editor. Improve clarity, concision, and impact without inventing facts. Maintain a professional tone, third-person omitted perspective, and consistent verb tense.`;
  const user = `Here is the resume data as JSON:\n${JSON.stringify(payload, null, 2)}\n\nInstructions:\n- Rewrite the summary into 3-4 sentences that highlight achievements succinctly.\n- For each experience item, produce 3-5 bullet points focusing on quantifiable impact and action verbs.\n- Suggest 10-15 relevant skills based on the resume and optional job description.\n- Keep information truthful to the input.\n- Respond with strict minified JSON matching this schema:\n{\n  "summary": "string",\n  "experience": [{"descriptionBullets": ["..."]}],\n  "skills": ["Skill A"]\n}`;

  const response = await openai.chat.completions.create({
    model,
    temperature: 0.4,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  });

  const choice = response.choices[0]?.message?.content;
  if (!choice) {
    throw new Error('No response from OpenAI');
  }
  return choice.trim();
}

import type { ResumeForm } from './schema';

const STORAGE_KEY = 'resume-builder-data';

export function saveResume(form: ResumeForm) {
  const payload = JSON.stringify(form);
  localStorage.setItem(STORAGE_KEY, payload);
}

export function loadResume(): ResumeForm | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ResumeForm;
  } catch (error) {
    console.error('Failed to parse stored resume', error);
    return null;
  }
}

export function clearResume() {
  localStorage.removeItem(STORAGE_KEY);
}

export function downloadResume(form: ResumeForm) {
  const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.json';
  link.click();
  URL.revokeObjectURL(url);
}

export function readResumeFile(file: File): Promise<ResumeForm> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as ResumeForm;
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid resume JSON file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}

export { STORAGE_KEY };

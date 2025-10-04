<template>
  <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <TopBar />
    <main class="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 pb-32 pt-6 lg:flex-row print:mx-0 print:w-full print:max-w-none print:flex-col print:gap-0 print:p-0">
      <section class="lg:w-2/5 print:hidden screen-only">
        <div class="sticky top-6 flex flex-col gap-4 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
          <div v-if="aiError" class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/40 dark:text-red-200">
            {{ aiError }}
          </div>
          <div v-else-if="statusMessage" class="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            {{ statusMessage }}
          </div>
          <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <FormPanel
              :form="form"
              @update-personal="updatePersonal"
              @update-summary="(value) => (form.summary = value)"
              @update-experience="updateExperience"
              @update-education="updateEducation"
              @update-skills="(value) => (form.skills = value)"
              @update-job-description="(value) => (form.jobDescription = value)"
              @update-colors="updateColors"
            />
          </div>
        </div>
      </section>
      <section class="flex-1 lg:w-3/5 print:w-full print:px-0">
        <div class="flex flex-col gap-4 print:gap-0">
          <div class="flex flex-wrap items-center justify-between gap-3 screen-only">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Preview</h2>
            <div class="flex flex-wrap gap-2 text-sm">
              <button
                v-for="option in templateOptions"
                :key="option.value"
                type="button"
                @click="form.template = option.value"
                class="rounded-md border px-3 py-1.5 font-medium transition"
                :class="[
                  form.template === option.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-400/10 dark:text-blue-200'
                    : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300'
                ]"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
          <PreviewPanel :form="form" :skills="skillsList" :template="form.template" :colors="form.colors" />
        </div>
      </section>
    </main>
    <footer class="screen-only fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            @click="handleImprove"
            :disabled="aiLoading"
          >
            <span v-if="aiLoading" class="flex items-center gap-2">
              <span class="h-2 w-2 animate-ping rounded-full bg-white"></span>
              Thinking...
            </span>
            <span v-else>Improve With AI</span>
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
            @click="handlePrint"
          >
            Print / Export PDF
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
            @click="handleSave"
          >
            Save
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
            @click="handleLoad"
          >
            Load
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
            @click="handleDownload"
          >
            Download JSON
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
            @click="triggerUpload"
          >
            Upload JSON
          </button>
          <input ref="uploadInput" type="file" accept="application/json" class="hidden" @change="onUpload" />
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Data is stored locally in your browser when you save.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import TopBar from './components/TopBar.vue';
import FormPanel from './components/FormPanel.vue';
import PreviewPanel from './components/PreviewPanel.vue';
import {
  createEducationItem,
  createExperienceItem,
  createResumeForm,
  parseSkills,
  splitBullets,
  type ExperienceItem,
  type EducationItem,
  type PersonalInfo,
  type ResumeForm
} from './lib/schema';
import { downloadResume, loadResume, readResumeFile, saveResume } from './lib/storage';
import { improveResume } from './lib/ai';

const form = reactive<ResumeForm>(createResumeForm());
const aiLoading = ref(false);
const aiError = ref('');
const statusMessage = ref('');
const uploadInput = ref<HTMLInputElement | null>(null);

const templateOptions = [
  { value: 'simple' as const, label: 'Simple' },
  { value: 'modern' as const, label: 'Modern' },
  { value: 'classic' as const, label: 'Classic' },
  { value: 'elegant' as const, label: 'Elegant' },
  { value: 'bold' as const, label: 'Bold' },
  { value: 'compact' as const, label: 'Compact' }
];

const skillsList = computed(() => parseSkills(form.skills));

function updatePersonal({ field, value }: { field: keyof PersonalInfo; value: string }) {
  form.personal[field] = value;
}

function normalizeExperience(list: ExperienceItem[]): ExperienceItem[] {
  const items = list.length ? list : [createExperienceItem()];
  return items.map((item) => ({
    id: item.id || createExperienceItem().id,
    company: item.company || '',
    role: item.role || '',
    start: item.start || '',
    end: item.end || '',
    description: item.description || '',
    descriptionBullets: Array.isArray(item.descriptionBullets)
      ? item.descriptionBullets
      : splitBullets(item.description || '')
  }));
}

function normalizeEducation(list: EducationItem[]): EducationItem[] {
  const items = list.length ? list : [createEducationItem()];
  return items.map((item) => ({
    id: item.id || createEducationItem().id,
    school: item.school || '',
    degree: item.degree || '',
    years: item.years || ''
  }));
}

function updateExperience(items: ExperienceItem[]) {
  form.experience = normalizeExperience(items);
}

function updateEducation(items: EducationItem[]) {
  form.education = normalizeEducation(items);
}

function updateColors(value: ResumeForm['colors']) {
  form.colors = { ...value };
}

function plainForm(): ResumeForm {
  return JSON.parse(JSON.stringify(form)) as ResumeForm;
}

async function handleImprove() {
  aiError.value = '';
  statusMessage.value = '';
  aiLoading.value = true;
  try {
    const response = await improveResume(form);
    if (response.summary) {
      form.summary = response.summary;
    }
    if (Array.isArray(response.experience)) {
      response.experience.forEach((item, index) => {
        const target = form.experience[index];
        if (!target) return;
        const bullets = item.descriptionBullets?.filter((bullet) => bullet.trim().length > 0) ?? [];
        target.descriptionBullets = bullets;
        target.description = bullets.join('\n');
      });
    }
    if (Array.isArray(response.skills) && response.skills.length) {
      form.skills = response.skills.join(', ');
    }
    statusMessage.value = 'AI suggestions applied.';
  } catch (error) {
    aiError.value = error instanceof Error ? error.message : 'Failed to contact AI service.';
  } finally {
    aiLoading.value = false;
  }
}

function handlePrint() {
  window.print();
}

function handleSave() {
  aiError.value = '';
  saveResume(plainForm());
  statusMessage.value = 'Resume saved to this browser.';
}

function handleLoad() {
  aiError.value = '';
  const stored = loadResume();
  if (!stored) {
    statusMessage.value = 'No saved resume found.';
    return;
  }
  applyForm(stored);
  statusMessage.value = 'Resume loaded from storage.';
}

function handleDownload() {
  aiError.value = '';
  downloadResume(plainForm());
  statusMessage.value = 'Resume JSON downloaded.';
}

function triggerUpload() {
  uploadInput.value?.click();
}

async function onUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;
  try {
    aiError.value = '';
    const data = await readResumeFile(file);
    applyForm(data);
    statusMessage.value = 'Resume uploaded.';
  } catch (error) {
    aiError.value = error instanceof Error ? error.message : 'Failed to read resume file.';
    statusMessage.value = '';
  } finally {
    target.value = '';
  }
}

function applyForm(data: ResumeForm) {
  Object.assign(form.personal, data.personal || {});
  form.summary = data.summary || '';
  form.skills = data.skills || '';
  form.jobDescription = data.jobDescription || '';
  form.template = data.template || form.template;
  form.colors = {
    text: data.colors?.text || form.colors.text,
    heading: data.colors?.heading || form.colors.heading,
    divider: data.colors?.divider || form.colors.divider
  };
  form.experience = normalizeExperience(Array.isArray(data.experience) ? data.experience : []);
  form.education = normalizeEducation(Array.isArray(data.education) ? data.education : []);
}
</script>

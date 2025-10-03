<template>
  <article class="print-page space-y-8">
    <header class="space-y-1">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">{{ personal.fullName || 'Your Name' }}</h1>
      <p class="text-lg font-medium text-gray-600 dark:text-gray-300">{{ personal.title || 'Professional Title' }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        <span v-if="personal.email">{{ personal.email }}</span>
        <span v-if="personal.phone"> • {{ personal.phone }}</span>
        <span v-if="personal.location"> • {{ personal.location }}</span>
        <span v-if="personal.website"> • {{ personal.website }}</span>
      </p>
    </header>

    <section v-if="summary" class="space-y-2">
      <h2 class="text-base font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">Summary</h2>
      <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ summary }}</p>
    </section>

    <section v-if="experience.length" class="space-y-4">
      <h2 class="text-base font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">Experience</h2>
      <div v-for="item in experience" :key="item.id" class="space-y-1">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ item.role || 'Role' }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.company }}</p>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatRange(item.start, item.end) }}</p>
        </div>
        <ul v-if="bulletPoints(item).length" class="list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li v-for="(bullet, idx) in bulletPoints(item)" :key="idx">{{ bullet }}</li>
        </ul>
      </div>
    </section>

    <section v-if="education.length" class="space-y-3">
      <h2 class="text-base font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">Education</h2>
      <div v-for="item in education" :key="item.id" class="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p class="text-sm font-semibold text-gray-800 dark:text-gray-200">{{ item.school }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.degree }}</p>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.years }}</p>
      </div>
    </section>

    <section v-if="skills.length" class="space-y-2">
      <h2 class="text-base font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="skill in skills"
          :key="skill"
          class="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200"
        >
          {{ skill }}
        </span>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import type { EducationItem, ExperienceItem, PersonalInfo } from '../lib/schema';
import { splitBullets } from '../lib/schema';

const props = defineProps<{
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
}>();

function formatRange(start: string, end: string) {
  if (!start && !end) return '';
  return [start, end || 'Present'].filter(Boolean).join(' – ');
}

function bulletPoints(item: ExperienceItem) {
  return item.descriptionBullets.length ? item.descriptionBullets : splitBullets(item.description);
}
</script>

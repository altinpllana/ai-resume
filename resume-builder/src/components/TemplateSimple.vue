<template>
  <article class="print-page space-y-8" :style="styleVars">
    <header class="space-y-1">
      <h1 class="text-3xl font-semibold heading">{{ personal.fullName || 'Your Name' }}</h1>
      <p class="text-lg font-medium subheading">{{ personal.title || 'Professional Title' }}</p>
      <p class="text-sm muted">
        <span v-if="personal.email">{{ personal.email }}</span>
        <span v-if="personal.phone"> • {{ personal.phone }}</span>
        <span v-if="personal.location"> • {{ personal.location }}</span>
        <span v-if="personal.website"> • {{ personal.website }}</span>
      </p>
    </header>

    <section v-if="summary" class="space-y-2">
      <h2 class="section-heading">Summary</h2>
      <p class="text-sm whitespace-pre-line">{{ summary }}</p>
    </section>

    <section v-if="experience.length" class="space-y-4">
      <h2 class="section-heading">Experience</h2>
      <div v-for="item in experience" :key="item.id" class="space-y-1">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p class="text-sm font-semibold heading">{{ item.role || 'Role' }}</p>
            <p class="text-sm muted">{{ item.company }}</p>
          </div>
          <p class="text-sm muted">{{ formatRange(item.start, item.end) }}</p>
        </div>
        <ul v-if="bulletPoints(item).length" class="list-disc space-y-1 pl-5 text-sm">
          <li v-for="(bullet, idx) in bulletPoints(item)" :key="idx">{{ bullet }}</li>
        </ul>
      </div>
    </section>

    <section v-if="education.length" class="space-y-3">
      <h2 class="section-heading">Education</h2>
      <div v-for="item in education" :key="item.id" class="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p class="text-sm font-semibold heading">{{ item.school }}</p>
          <p class="text-sm muted">{{ item.degree }}</p>
        </div>
        <p class="text-sm muted">{{ item.years }}</p>
      </div>
    </section>

    <section v-if="skills.length" class="space-y-2">
      <h2 class="section-heading">Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in skills" :key="skill" class="skill-tag">
          {{ skill }}
        </span>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { EducationItem, ExperienceItem, PersonalInfo, ResumeColors } from '../lib/schema';
import { splitBullets } from '../lib/schema';

const props = defineProps<{
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  colors: ResumeColors;
}>();

const styleVars = computed(() => ({
  '--resume-text': props.colors.text,
  '--resume-heading': props.colors.heading,
  '--resume-divider': props.colors.divider,
  color: 'var(--resume-text)'
}));

function formatRange(start: string, end: string) {
  if (!start && !end) return '';
  return [start, end || 'Present'].filter(Boolean).join(' – ');
}

function bulletPoints(item: ExperienceItem) {
  return item.descriptionBullets.length ? item.descriptionBullets : splitBullets(item.description);
}
</script>

<style scoped>
.heading {
  color: var(--resume-heading);
}

.subheading {
  color: var(--resume-heading);
  opacity: 0.8;
}

.muted {
  color: var(--resume-text);
  opacity: 0.7;
}

.section-heading {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--resume-heading);
  border-bottom: 1px solid var(--resume-divider);
  padding-bottom: 0.25rem;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid var(--resume-divider);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--resume-heading);
}

ul {
  color: var(--resume-text);
}
</style>

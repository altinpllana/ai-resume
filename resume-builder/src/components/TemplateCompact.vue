<template>
  <article class="print-page space-y-5" :style="styleVars">
    <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold heading">{{ personal.fullName || 'Your Name' }}</h1>
        <p class="text-sm font-medium subheading">{{ personal.title || 'Professional Title' }}</p>
      </div>
      <p class="text-xs muted flex flex-wrap gap-x-3 gap-y-1">
        <span v-if="personal.email">{{ personal.email }}</span>
        <span v-if="personal.phone">{{ personal.phone }}</span>
        <span v-if="personal.location">{{ personal.location }}</span>
        <span v-if="personal.website">{{ personal.website }}</span>
      </p>
    </header>

    <section v-if="summary" class="grid gap-1">
      <h2 class="section-heading">Summary</h2>
      <p class="text-sm whitespace-pre-line">{{ summary }}</p>
    </section>

    <section v-if="experience.length" class="grid gap-3">
      <h2 class="section-heading">Experience</h2>
      <div class="grid gap-3">
        <div v-for="item in experience" :key="item.id" class="grid gap-1">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p class="text-sm font-semibold heading">{{ item.role || 'Role' }}</p>
              <p class="text-xs muted">{{ item.company }}</p>
            </div>
            <p class="text-xs uppercase tracking-wide muted">{{ formatRange(item.start, item.end) }}</p>
          </div>
          <ul v-if="bulletPoints(item).length" class="list-disc space-y-1 pl-5 text-xs">
            <li v-for="(bullet, idx) in bulletPoints(item)" :key="idx">{{ bullet }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="grid gap-2">
      <h2 class="section-heading">Education</h2>
      <div class="grid gap-2 sm:grid-cols-2">
        <div v-for="item in education" :key="item.id" class="rounded border px-3 py-2" :style="{ borderColor: colors.divider }">
          <p class="text-sm font-semibold heading">{{ item.school }}</p>
          <p class="text-xs muted">{{ item.degree }}</p>
          <p class="text-xs uppercase tracking-wide muted">{{ item.years }}</p>
        </div>
      </div>
    </section>

    <section v-if="skills.length" class="grid gap-2">
      <h2 class="section-heading">Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in skills" :key="skill" class="skill-dot">{{ skill }}</span>
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
  return [start, end || 'Present'].filter(Boolean).join(' / ');
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
  opacity: 0.75;
}

.muted {
  color: var(--resume-text);
  opacity: 0.68;
}

.section-heading {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--resume-heading);
}

.skill-dot {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid var(--resume-divider);
  padding: 0.2rem 0.6rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--resume-heading);
  background-color: color-mix(in srgb, #ffffff 80%, var(--resume-divider) 20%);
}

@supports not (background: color-mix(in srgb, white 50%, black 50%)) {
  .skill-dot {
    background-color: #f3f4f6;
  }
}

ul {
  color: var(--resume-text);
}
</style>

<template>
  <article class="print-page space-y-8" :style="styleVars">
    <header class="space-y-3 border-b pb-4" :style="{ borderColor: colors.divider }">
      <div>
        <h1 class="text-3xl font-semibold tracking-tight heading">{{ personal.fullName || 'Your Name' }}</h1>
        <p class="text-base font-medium subheading">{{ personal.title || 'Professional Title' }}</p>
      </div>
      <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm muted">
        <span v-if="personal.email">{{ personal.email }}</span>
        <span v-if="personal.phone">{{ personal.phone }}</span>
        <span v-if="personal.location">{{ personal.location }}</span>
        <span v-if="personal.website">{{ personal.website }}</span>
      </div>
    </header>

    <section v-if="summary" class="grid gap-2">
      <h2 class="section-heading">Profile</h2>
      <p class="text-sm whitespace-pre-line">{{ summary }}</p>
    </section>

    <section v-if="experience.length" class="grid gap-4">
      <h2 class="section-heading">Professional Experience</h2>
      <div v-for="item in experience" :key="item.id" class="grid gap-2">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p class="text-sm font-semibold heading">{{ item.role || 'Role' }}</p>
            <p class="text-xs uppercase tracking-wide muted">{{ item.company }}</p>
          </div>
          <p class="text-xs uppercase tracking-wide muted">{{ formatRange(item.start, item.end) }}</p>
        </div>
        <ul v-if="bulletPoints(item).length" class="list-disc space-y-1 pl-5 text-sm">
          <li v-for="(bullet, idx) in bulletPoints(item)" :key="idx">{{ bullet }}</li>
        </ul>
      </div>
    </section>

    <section v-if="education.length" class="grid gap-3">
      <h2 class="section-heading">Education</h2>
      <div v-for="item in education" :key="item.id" class="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p class="text-sm font-semibold heading">{{ item.school }}</p>
          <p class="text-xs uppercase tracking-wide muted">{{ item.degree }}</p>
        </div>
        <p class="text-xs uppercase tracking-wide muted">{{ item.years }}</p>
      </div>
    </section>

    <section v-if="skills.length" class="grid gap-2">
      <h2 class="section-heading">Core Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in skills" :key="skill" class="skill-chip">
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
  return [start, end || 'Present'].filter(Boolean).join(' • ');
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
  opacity: 0.65;
}

.section-heading {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--resume-heading);
  border-bottom: 1px solid var(--resume-divider);
  padding-bottom: 0.35rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  background: color-mix(in srgb, var(--resume-divider) 40%, #fff 60%);
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--resume-heading);
}

ul {
  color: var(--resume-text);
}

@supports not (background: color-mix(in srgb, white 50%, black 50%)) {
  .skill-chip {
    background: #f3f4f6;
  }
}
</style>

<template>
  <article class="print-page space-y-6" :style="styleVars">
    <header class="grid gap-3">
      <div>
        <h1 class="text-3xl font-semibold heading">{{ personal.fullName || 'Your Name' }}</h1>
        <p class="text-base font-medium subheading">{{ personal.title || 'Professional Title' }}</p>
      </div>
      <div class="grid gap-1 text-sm muted sm:grid-cols-2">
        <span v-if="personal.email">{{ personal.email }}</span>
        <span v-if="personal.phone">{{ personal.phone }}</span>
        <span v-if="personal.location">{{ personal.location }}</span>
        <span v-if="personal.website">{{ personal.website }}</span>
      </div>
    </header>

    <section v-if="summary" class="grid gap-2">
      <h2 class="section-heading">Summary</h2>
      <p class="text-sm whitespace-pre-line">{{ summary }}</p>
    </section>

    <section v-if="experience.length" class="grid gap-4">
      <h2 class="section-heading">Experience</h2>
      <div class="grid gap-4">
        <div
          v-for="item in experience"
          :key="item.id"
          class="grid gap-2 rounded-lg border p-4 shadow-sm"
          :style="{ borderColor: colors.divider, boxShadow: `0 2px 4px ${shadowColor}` }"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p class="text-sm font-semibold heading">{{ item.role || 'Role' }}</p>
              <p class="text-sm muted">{{ item.company }}</p>
            </div>
            <p class="text-xs uppercase tracking-wide muted">{{ formatRange(item.start, item.end) }}</p>
          </div>
          <ul v-if="bulletPoints(item).length" class="list-disc space-y-1 pl-5 text-sm">
            <li v-for="(bullet, idx) in bulletPoints(item)" :key="idx">{{ bullet }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section v-if="education.length" class="grid gap-3">
      <h2 class="section-heading">Education</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        <div v-for="item in education" :key="item.id" class="rounded-lg border p-3" :style="{ borderColor: colors.divider }">
          <p class="text-sm font-semibold heading">{{ item.school }}</p>
          <p class="text-sm muted">{{ item.degree }}</p>
          <p class="text-xs uppercase tracking-wide muted">{{ item.years }}</p>
        </div>
      </div>
    </section>

    <section v-if="skills.length" class="grid gap-2">
      <h2 class="section-heading">Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in skills" :key="skill" class="skill-pill">{{ skill }}</span>
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

const shadowColor = computed(() => `${props.colors.divider}33`);

function formatRange(start: string, end: string) {
  if (!start && !end) return '';
  return [start, end || 'Present'].filter(Boolean).join(' · ');
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
  opacity: 0.78;
}

.muted {
  color: var(--resume-text);
  opacity: 0.7;
}

.section-heading {
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--resume-heading);
}

.skill-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background: color-mix(in srgb, var(--resume-divider) 30%, #ffffff 70%);
  padding: 0.3rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--resume-heading);
}

@supports not (background: color-mix(in srgb, white 50%, black 50%)) {
  .skill-pill {
    background: #f5f5f5;
  }
}

ul {
  color: var(--resume-text);
}
</style>

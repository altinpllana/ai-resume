<template>
  <form class="space-y-8" @submit.prevent>
    <section class="space-y-4">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Personal</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="form.personal.fullName"
            @input="onPersonal('fullName', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="title">Title</label>
          <input
            id="title"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="form.personal.title"
            @input="onPersonal('title', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="email">Email</label>
          <input
            id="email"
            type="email"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="form.personal.email"
            @input="onPersonal('email', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="phone">Phone</label>
          <input
            id="phone"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="form.personal.phone"
            @input="onPersonal('phone', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="location">Location</label>
          <input
            id="location"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="form.personal.location"
            @input="onPersonal('location', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="website">Portfolio / LinkedIn</label>
          <input
            id="website"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="form.personal.website"
            @input="onPersonal('website', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </section>

    <section class="space-y-2">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Summary</h2>
      <textarea
        id="summary"
        rows="4"
        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        :value="form.summary"
        @input="emit('update-summary', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
    </section>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Experience</h2>
      <ExperienceGroup :items="form.experience" @update="emit('update-experience', $event)" />
    </section>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Education</h2>
      <EducationGroup :items="form.education" @update="emit('update-education', $event)" />
    </section>

    <section class="space-y-2">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Skills</h2>
      <input
        id="skills"
        type="text"
        placeholder="Comma-separated list"
        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        :value="form.skills"
        @input="emit('update-skills', ($event.target as HTMLInputElement).value)"
      />
    </section>

    <section class="space-y-2">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">Target Job Description</h2>
      <textarea
        id="jobDescription"
        rows="5"
        placeholder="Optional"
        class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
        :value="form.jobDescription"
        @input="emit('update-job-description', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
    </section>
  </form>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import ExperienceGroup from './ExperienceGroup.vue';
import EducationGroup from './EducationGroup.vue';
import type { ResumeForm, PersonalInfo } from '../lib/schema';

const props = defineProps<{ form: ResumeForm }>();
const form = toRef(props, 'form');

const emit = defineEmits<{
  (e: 'update-personal', payload: { field: keyof PersonalInfo; value: string }): void;
  (e: 'update-summary', value: string): void;
  (e: 'update-experience', value: ResumeForm['experience']): void;
  (e: 'update-education', value: ResumeForm['education']): void;
  (e: 'update-skills', value: string): void;
  (e: 'update-job-description', value: string): void;
}>();

function onPersonal(field: keyof PersonalInfo, value: string) {
  emit('update-personal', { field, value });
}
</script>

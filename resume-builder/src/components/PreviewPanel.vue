<template>
  <section class="h-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950 print:border-0 print:shadow-none">
    <component
      :is="templateComponent"
      :personal="form.personal"
      :summary="form.summary"
      :experience="form.experience"
      :education="form.education"
      :skills="skills"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TemplateSimple from './TemplateSimple.vue';
import TemplateModern from './TemplateModern.vue';
import type { ResumeForm } from '../lib/schema';

const props = defineProps<{
  form: ResumeForm;
  skills: string[];
  template: 'simple' | 'modern';
}>();

const templateComponent = computed(() =>
  props.template === 'modern' ? TemplateModern : TemplateSimple
);
</script>

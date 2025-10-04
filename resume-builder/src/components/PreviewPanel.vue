<template>
  <section class="print-resume h-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950 print:h-auto print:overflow-visible print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none">
    <component
      :is="templateComponent"
      :personal="form.personal"
      :summary="form.summary"
      :experience="form.experience"
      :education="form.education"
      :skills="skills"
      :colors="colors"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TemplateSimple from './TemplateSimple.vue';
import TemplateModern from './TemplateModern.vue';
import TemplateClassic from './TemplateClassic.vue';
import TemplateElegant from './TemplateElegant.vue';
import TemplateBold from './TemplateBold.vue';
import TemplateCompact from './TemplateCompact.vue';
import type { ResumeForm, TemplateType } from '../lib/schema';

const templates: Record<TemplateType, any> = {
  simple: TemplateSimple,
  modern: TemplateModern,
  classic: TemplateClassic,
  elegant: TemplateElegant,
  bold: TemplateBold,
  compact: TemplateCompact
};

const props = defineProps<{
  form: ResumeForm;
  skills: string[];
  template: TemplateType;
  colors: ResumeForm['colors'];
}>();

const templateComponent = computed(() => templates[props.template] ?? TemplateSimple);
</script>

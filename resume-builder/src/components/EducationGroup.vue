<template>
  <div class="space-y-6">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700"
    >
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Education {{ index + 1 }}</h4>
        <button
          type="button"
          class="text-sm text-red-600 hover:underline"
          @click="remove(item.id)"
        >
          Remove
        </button>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" :for="`school-${item.id}`">
            School
          </label>
          <input
            :id="`school-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.school"
            @input="updateField(item.id, 'school', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" :for="`degree-${item.id}`">
            Degree
          </label>
          <input
            :id="`degree-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.degree"
            @input="updateField(item.id, 'degree', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" :for="`years-${item.id}`">
            Years
          </label>
          <input
            :id="`years-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.years"
            @input="updateField(item.id, 'years', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </div>
    <button
      type="button"
      class="rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
      @click="add"
    >
      + Add Education
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createEducationItem, type EducationItem } from '../lib/schema';

const props = defineProps<{ items: EducationItem[] }>();
const emit = defineEmits<{ (e: 'update', value: EducationItem[]): void }>();

const items = computed(() => props.items);

function updateField(id: string, field: keyof EducationItem, value: string) {
  const next = items.value.map((item) =>
    item.id === id ? { ...item, [field]: value } : item
  );
  emit('update', next);
}

function add() {
  emit('update', [...items.value, createEducationItem()]);
}

function remove(id: string) {
  if (items.value.length === 1) {
    emit('update', [createEducationItem()]);
    return;
  }
  emit('update', items.value.filter((item) => item.id !== id));
}
</script>

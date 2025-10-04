<template>
  <div class="space-y-6">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700"
    >
      <div class="mb-4 flex items-center justify-between">
        <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200">Experience {{ index + 1 }}</h4>
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
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="company-{{ item.id }}">
            Company
          </label>
          <input
            :id="`company-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.company"
            @input="updateField(item.id, 'company', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="role-{{ item.id }}">
            Role
          </label>
          <input
            :id="`role-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.role"
            @input="updateField(item.id, 'role', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="start-{{ item.id }}">
            Start
          </label>
          <input
            :id="`start-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.start"
            @input="updateField(item.id, 'start', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="end-{{ item.id }}">
            End
          </label>
          <input
            :id="`end-${item.id}`"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            :value="item.end"
            @input="updateField(item.id, 'end', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300" :for="`description-${item.id}`">
          Description / Bullets (one per line)
        </label>
        <textarea
          :id="`description-${item.id}`"
          rows="4"
          class="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          :value="item.description"
          @input="updateDescription(item.id, ($event.target as HTMLTextAreaElement).value)"
        ></textarea>
      </div>
    </div>
    <button
      type="button"
      class="rounded-md border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-blue-400"
      @click="add"
    >
      + Add Experience
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createExperienceItem, type ExperienceItem, splitBullets } from '../lib/schema';

const props = defineProps<{ items: ExperienceItem[] }>();
const emit = defineEmits<{ (e: 'update', value: ExperienceItem[]): void }>();

const items = computed(() => props.items);

function updateField(id: string, field: keyof ExperienceItem, value: string | string[]) {
  const next = items.value.map((item) =>
    item.id === id ? { ...item, [field]: value } : item
  );
  emit('update', next);
}

function updateDescription(id: string, value: string) {
  const bullets = splitBullets(value);
  const next = items.value.map((item) =>
    item.id === id
      ? { ...item, description: value, descriptionBullets: bullets }
      : item
  );
  emit('update', next);
}

function add() {
  emit('update', [...items.value, createExperienceItem()]);
}

function remove(id: string) {
  if (items.value.length === 1) {
    emit('update', [createExperienceItem()]);
    return;
  }
  emit('update', items.value.filter((item) => item.id !== id));
}
</script>

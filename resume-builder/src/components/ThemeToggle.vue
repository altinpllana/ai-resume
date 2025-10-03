<template>
  <button
    type="button"
    @click="toggle"
    class="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
    :aria-pressed="isDark"
  >
    <span v-if="isDark">Light</span>
    <span v-else>Dark</span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDark = ref(false);

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    root.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  isDark.value = dark;
}

function toggle() {
  applyTheme(!isDark.value);
}

onMounted(() => {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    applyTheme(true);
  } else {
    applyTheme(false);
  }
});
</script>

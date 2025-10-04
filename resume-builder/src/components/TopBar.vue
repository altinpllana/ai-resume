<template>
  <header class="screen-only border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <h1 class="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">Resume Builder</h1>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';
</script>

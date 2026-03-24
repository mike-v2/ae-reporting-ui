<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app-container">
    <RouterView />
  </div>
</template>

<style>
/* Global resets and base styles */
:root {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light;
  color: #0f172a;
  background-color: #f8fafc;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app-container {
  min-height: 100vh;
}
</style>

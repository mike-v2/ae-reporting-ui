<script setup lang="ts">
import { ref, onMounted } from 'vue'

const message = ref('Loading...')

onMounted(async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/hello`)
    const data = await response.json()
    message.value = data.text
  } catch (error) {
    console.error("Error connecting to backend:", error)
    message.value = 'Failed to connect to backend'
  }
})
</script>

<template>
  <main style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
    <h1>Hello World Vue + .NET</h1>
    <p>Message from Database: <strong>{{ message }}</strong></p>
  </main>
</template>

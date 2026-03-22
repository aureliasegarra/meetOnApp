<template>
  <div class="screen">
    <div class="screen-content">
      <!-- Progress dots -->
      <div class="progress-dots">
        <div v-for="i in totalSteps" :key="i" class="dot"
          :class="{ active: i === currentStep, done: i < currentStep }"></div>
      </div>

      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 10 },
})
</script>

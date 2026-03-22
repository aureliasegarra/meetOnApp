<template>
  <StepLayout :current-step="2">
    <h2 class="screen-title">{{ t('title') }}</h2>

    <div class="options-scroll">
      <div class="options-grid">
        <button
          v-for="range in ageRanges"
          :key="range"
          class="option-btn"
          :class="{ selected: store.ageRange === range }"
          @click="select(range)"
        >
          <span class="check-circle"><span class="check-icon">✓</span></span>
          {{ range }}
        </button>
      </div>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="!store.ageRange" @click="next">
        {{ t('continue') }}
      </button>
    </div>
  </StepLayout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'
import StepLayout from '../components/StepLayout.vue'

const router = useRouter()
const store = useProfileStore()

const ageRanges = ['18–25', '26–35', '36–45', '46–55', '55+']

const i18n = {
  fr: { title: 'Votre tranche d\'âge', continue: 'Continuer' },
  en: { title: 'Your age range', continue: 'Continue' },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]

function select(range) {
  store.ageRange = range
}

function next() {
  if (!store.ageRange) return
  store.persist()
  router.push('/genre')
}
</script>

<style scoped>
.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
/* Last item spans full if odd count */
.options-grid .option-btn:last-child:nth-child(odd) {
  grid-column: 1 / -1;
  max-width: 50%;
  margin: 0 auto;
}
</style>

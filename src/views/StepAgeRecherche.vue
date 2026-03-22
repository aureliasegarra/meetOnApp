<template>
  <StepLayout :current-step="10">
    <h2 class="screen-title">{{ t('title') }}</h2>
    <p class="screen-subtitle">{{ t('subtitle') }}</p>

    <div class="options-scroll">
      <button
        v-for="range in ageRanges"
        :key="range"
        class="option-btn"
        :class="{ selected: store.targetAgeRanges.includes(range) }"
        @click="store.toggleTargetAge(range)"
      >
        <span class="check-circle"><span class="check-icon">✓</span></span>
        {{ range }}
      </button>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="store.targetAgeRanges.length === 0" @click="next">
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
  fr: { title: 'Quelle tranche d\'âge recherchez-vous ?', subtitle: 'Choisissez une ou plusieurs options', continue: 'Continuer' },
  en: { title: 'Which age range are you looking for?', subtitle: 'Choose one or more options', continue: 'Continue' },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]

function next() {
  if (store.targetAgeRanges.length === 0) return
  store.complete()
  router.push('/confirmation')
}
</script>

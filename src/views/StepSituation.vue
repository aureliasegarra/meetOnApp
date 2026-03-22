<template>
  <StepLayout :current-step="9">
    <h2 class="screen-title">{{ t('title') }}</h2>

    <div class="options-scroll">
      <button
        v-for="s in situations"
        :key="s.value"
        class="option-btn"
        :class="{ selected: store.situation === s.value }"
        @click="store.situation = s.value"
      >
        <span class="check-circle"><span class="check-icon">✓</span></span>
        {{ s.label }}
      </button>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="!store.situation" @click="next">
        {{ t('continue') }}
      </button>
    </div>
  </StepLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'
import StepLayout from '../components/StepLayout.vue'

const router = useRouter()
const store = useProfileStore()

const i18n = {
  fr: {
    title: 'Votre situation', continue: 'Continuer',
    situations: [
      { value: 'single', label: 'Célibataire' },
      { value: 'couple', label: 'En couple' },
      { value: 'open', label: 'Ouvert·e' },
    ]
  },
  en: {
    title: 'Your situation', continue: 'Continue',
    situations: [
      { value: 'single', label: 'Single' },
      { value: 'couple', label: 'In a relationship' },
      { value: 'open', label: 'Open' },
    ]
  },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]
const situations = computed(() => i18n[store.lang]?.situations ?? i18n.fr.situations)

function next() {
  if (!store.situation) return
  store.persist()
  router.push('/age-recherche')
}
</script>

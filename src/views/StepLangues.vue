<template>
  <StepLayout :current-step="4">
    <h2 class="screen-title">{{ t('title') }}</h2>
    <p class="screen-subtitle">{{ t('subtitle') }}</p>

    <div class="options-scroll">
      <button
        v-for="lang in languages"
        :key="lang.value"
        class="option-btn"
        :class="{ selected: store.languages.includes(lang.value) }"
        @click="store.toggleLanguage(lang.value)"
      >
        <span class="check-circle"><span class="check-icon">✓</span></span>
        {{ lang.label }}
      </button>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="store.languages.length === 0" @click="next">
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
    title: 'Vos langues', subtitle: 'Choisissez une ou plusieurs options.',
    continue: 'Continuer',
    languages: [
      { value: 'fr', label: 'Français' }, { value: 'en', label: 'Anglais' },
      { value: 'de', label: 'Allemand' }, { value: 'it', label: 'Italien' },
      { value: 'es', label: 'Espagnol' }, { value: 'pt', label: 'Portugais' },
    ]
  },
  en: {
    title: 'Your languages', subtitle: 'Choose one or more options.',
    continue: 'Continue',
    languages: [
      { value: 'fr', label: 'French' }, { value: 'en', label: 'English' },
      { value: 'de', label: 'German' }, { value: 'it', label: 'Italian' },
      { value: 'es', label: 'Spanish' }, { value: 'pt', label: 'Portuguese' },
    ]
  },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]
const languages = computed(() => i18n[store.lang]?.languages ?? i18n.fr.languages)

function next() {
  store.persist()
  router.push('/interets')
}
</script>

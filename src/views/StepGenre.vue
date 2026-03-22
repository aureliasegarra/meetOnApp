<template>
  <StepLayout :current-step="3">
    <h2 class="screen-title">{{ t('title') }}</h2>

    <div class="options-scroll">
      <button
        v-for="g in genders"
        :key="g.value"
        class="option-btn"
        :class="{ selected: store.gender === g.value }"
        @click="store.gender = g.value"
      >
        <span class="check-circle"><span class="check-icon">✓</span></span>
        {{ g.label }}
      </button>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="!store.gender" @click="next">
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
    title: 'Votre genre', continue: 'Continuer',
    genders: [{ value: 'F', label: 'Femme' }, { value: 'M', label: 'Homme' }, { value: 'NB', label: 'Non binaire' }]
  },
  en: {
    title: 'Your gender', continue: 'Continue',
    genders: [{ value: 'F', label: 'Woman' }, { value: 'M', label: 'Man' }, { value: 'NB', label: 'Non-binary' }]
  },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]
const genders = computed(() => i18n[store.lang]?.genders ?? i18n.fr.genders)

function next() {
  if (!store.gender) return
  store.persist()
  router.push('/langues')
}
</script>

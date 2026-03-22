<template>
  <StepLayout :current-step="5">
    <h2 class="screen-title">{{ t('title') }}</h2>
    <p class="screen-subtitle">{{ t('subtitle') }}</p>

    <div class="options-scroll">
      <button
        v-for="interest in interests"
        :key="interest.value"
        class="option-btn"
        :class="{ selected: store.interests.includes(interest.value) }"
        @click="store.toggleInterest(interest.value)"
      >
        <span class="check-circle"><span class="check-icon">✓</span></span>
        {{ interest.label }}
      </button>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="store.interests.length === 0" @click="next">
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
    title: 'Vos centres d\'intérêt', subtitle: 'Choisissez une ou plusieurs options.',
    continue: 'Continuer',
    interests: [
      { value: 'travel', label: 'Voyages & découvertes' },
      { value: 'art', label: 'Art, culture & loisirs' },
      { value: 'economy', label: 'Économie & politique' },
      { value: 'tech', label: 'Sciences & tech' },
      { value: 'society', label: 'Société & santé' },
      { value: 'lifestyle', label: 'Lifestyle, design & mode' },
      { value: 'sport', label: 'Sport & bien-être' },
    ]
  },
  en: {
    title: 'Your interests', subtitle: 'Choose one or more options.',
    continue: 'Continue',
    interests: [
      { value: 'travel', label: 'Travel & discovery' },
      { value: 'art', label: 'Art, culture & leisure' },
      { value: 'economy', label: 'Economy & politics' },
      { value: 'tech', label: 'Science & tech' },
      { value: 'society', label: 'Society & health' },
      { value: 'lifestyle', label: 'Lifestyle, design & fashion' },
      { value: 'sport', label: 'Sport & wellness' },
    ]
  },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]
const interests = computed(() => i18n[store.lang]?.interests ?? i18n.fr.interests)

function next() {
  store.persist()
  router.push('/distance')
}
</script>

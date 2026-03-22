<template>
  <StepLayout :current-step="8">
    <h2 class="screen-title">{{ t('title') }}</h2>
    <p class="screen-subtitle">{{ t('subtitle') }}</p>

    <div class="options-scroll">
      <button
        v-for="act in activities"
        :key="act.value"
        class="option-btn"
        :class="{ selected: store.activity === act.value }"
        @click="store.activity = act.value"
      >
        <span class="option-icon">{{ act.icon }}</span>
        {{ act.label }}
      </button>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="!store.activity" @click="next">
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
    title: 'Que voulez-vous faire maintenant ?',
    subtitle: 'Choix unique',
    continue: 'Continuer',
    activities: [
      { value: 'drink', label: 'Prendre un verre', icon: '🍷' },
      { value: 'meal', label: 'Partager un repas', icon: '🍽️' },
      { value: 'walk', label: 'Aller marcher', icon: '🚶' },
      { value: 'activity', label: 'Partager une activité', icon: '—' },
    ]
  },
  en: {
    title: 'What do you want to do now?',
    subtitle: 'Single choice',
    continue: 'Continue',
    activities: [
      { value: 'drink', label: 'Grab a drink', icon: '🍷' },
      { value: 'meal', label: 'Share a meal', icon: '🍽️' },
      { value: 'walk', label: 'Go for a walk', icon: '🚶' },
      { value: 'activity', label: 'Share an activity', icon: '—' },
    ]
  },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]
const activities = computed(() => i18n[store.lang]?.activities ?? i18n.fr.activities)

function next() {
  if (!store.activity) return
  store.persist()
  router.push('/situation')
}
</script>

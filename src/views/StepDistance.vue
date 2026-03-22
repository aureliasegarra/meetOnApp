<template>
  <StepLayout :current-step="6">
    <h2 class="screen-title">{{ t('title') }}</h2>

    <div class="options-scroll" style="overflow:visible; flex:1">
      <div class="slider-container" style="margin-top: 40px">
        <div class="slider-label">
          {{ t('label') }} <strong>{{ displayDistance }}</strong>
        </div>
        <div class="range-wrapper">
          <input
            type="range"
            class="meeton-range"
            :min="0"
            :max="steps.length - 1"
            :value="stepIndex"
            :style="{ '--val': `${(stepIndex / (steps.length - 1)) * 100}%` }"
            @input="onSlide($event.target.value)"
          />
          <div class="range-labels">
            <span>500 m</span>
            <span>10 km</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-area">
      <button class="btn-primary" @click="next">
        {{ t('continue') }}
      </button>
    </div>
  </StepLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'
import StepLayout from '../components/StepLayout.vue'

const router = useRouter()
const store = useProfileStore()

const steps = [0.5, 1, 2, 3, 5, 7, 10]
const stepIndex = ref(steps.indexOf(store.maxDistance) !== -1 ? steps.indexOf(store.maxDistance) : 4)

const displayDistance = computed(() => {
  const v = steps[stepIndex.value]
  return v < 1 ? `${v * 1000} m` : `${v} km`
})

function onSlide(val) {
  stepIndex.value = parseInt(val)
  store.maxDistance = steps[stepIndex.value]
}

const i18n = {
  fr: { title: 'Où voulez-vous rencontrer ?', label: 'Distance maximale :', continue: 'Continuer' },
  en: { title: 'Where do you want to meet?', label: 'Max distance:', continue: 'Continue' },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]

function next() {
  store.persist()
  router.push('/localisation')
}
</script>

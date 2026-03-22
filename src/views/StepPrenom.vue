<template>
  <StepLayout :current-step="1">
    <h2 class="screen-title">{{ t('title') }}</h2>

    <div class="options-scroll" style="flex:1; overflow:visible">
      <input
        v-model="store.firstName"
        class="meeton-input"
        :placeholder="t('placeholder')"
        type="text"
        autocomplete="given-name"
        @keyup.enter="next"
        autofocus
      />
    </div>

    <div class="bottom-area">
      <button class="btn-primary" :disabled="!store.firstName.trim()" @click="next">
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

const i18n = {
  fr: { title: 'Votre prénom', placeholder: 'Prénom', continue: 'Continuer' },
  en: { title: 'Your first name', placeholder: 'First name', continue: 'Continue' },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]

function next() {
  if (!store.firstName.trim()) return
  store.persist()
  router.push('/age')
}
</script>

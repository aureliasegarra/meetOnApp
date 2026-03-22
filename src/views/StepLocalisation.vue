<template>
  <StepLayout :current-step="7">
    <div class="loc-center">
      <div class="loc-icon">📍</div>
      <h2 class="screen-title" style="text-align:center; margin-bottom:16px">{{ t('title') }}</h2>
      <p class="loc-desc">{{ t('desc') }}</p>
    </div>

    <div class="bottom-area">
      <button class="btn-primary btn-orange" @click="authorize">
        {{ t('authorize') }}
      </button>
      <button class="btn-text" @click="skip">{{ t('skip') }}</button>
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
  fr: {
    title: 'Activez votre localisation',
    desc: 'Pour vous proposer des rencontres proches de vous, ici et maintenant.',
    authorize: 'Autoriser',
    skip: 'Pas maintenant',
  },
  en: {
    title: 'Enable your location',
    desc: 'To suggest people near you, here and now.',
    authorize: 'Authorize',
    skip: 'Not now',
  },
}
const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]

async function authorize() {
  try {
    await navigator.geolocation.getCurrentPosition(() => {})
    store.locationGranted = true
  } catch(e) {
    store.locationGranted = false
  }
  store.persist()
  router.push('/activite')
}

function skip() {
  store.locationGranted = false
  store.persist()
  router.push('/activite')
}
</script>

<style scoped>
.loc-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px 0;
}

.loc-icon {
  font-size: 56px;
  margin-bottom: 28px;
  filter: drop-shadow(0 0 20px rgba(245, 166, 35, 0.5));
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.loc-desc {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-secondary);
  max-width: 280px;
  line-height: 1.6;
  margin: 0 auto;
}
</style>

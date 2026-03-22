<template>
  <div class="screen splash-screen">
    <div class="screen-content">
      <div class="lang-toggle">
        <button class="lang-btn" :class="{ active: store.lang === 'fr' }" @click="store.setLang('fr')">FR</button>
        <span class="lang-separator">|</span>
        <button class="lang-btn" :class="{ active: store.lang === 'en' }" @click="store.setLang('en')">EN</button>
      </div>

      <div class="splash-center">
        <div class="logo-area fade-up">
          <h1 class="logo-title">MeetOn</h1>
          <div class="logo-underline"></div>
        </div>

        <p class="tagline fade-up" style="animation-delay:0.1s">
          {{ t('tagline') }}
        </p>
      </div>

      <div class="splash-bottom fade-up" style="animation-delay:0.2s">
        <button class="btn-primary" @click="start">{{ t('start') }}</button>

        <div class="feature-row" style="margin-top:28px">
          <div class="feature-item">
            <span class="feature-icon">⏱</span>
            <span>{{ t('f1') }}</span>
          </div>
          <div class="feature-divider"></div>
          <div class="feature-item">
            <span class="feature-icon" style="color:var(--orange)">📍</span>
            <span>{{ t('f2') }}</span>
          </div>
          <div class="feature-divider"></div>
          <div class="feature-item">
            <span class="feature-icon">👥</span>
            <span>{{ t('f3') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'
import { computed } from 'vue'

const router = useRouter()
const store = useProfileStore()

const i18n = {
  fr: { tagline: 'Des rencontres, ici et maintenant.', start: 'Commencer', f1: 'En quelques minutes', f2: 'Dans la vraie vie', f3: 'Près de vous' },
  en: { tagline: 'Meet people, here and now.', start: 'Get started', f1: 'In minutes', f2: 'In real life', f3: 'Near you' },
}

const t = (k) => i18n[store.lang]?.[k] ?? i18n.fr[k]

function start() {
  router.push('/prenom')
}
</script>

<style scoped>
.splash-screen {
  justify-content: space-between;
}

.splash-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 0 20px;
}

.logo-title {
  font-family: var(--font-main);
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #fff 30%, var(--orange) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-underline {
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--orange), transparent);
  margin: 8px auto 0;
  border-radius: 1px;
}

.tagline {
  font-family: var(--font-body);
  font-size: 17px;
  color: var(--orange);
  margin-top: 14px;
  font-weight: 400;
  letter-spacing: 0.2px;
}

.splash-bottom {
  padding-bottom: 8px;
}
</style>

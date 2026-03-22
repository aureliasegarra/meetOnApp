<template>
  <div class="screen confirmation-screen">
    <div class="screen-content">
      <div class="confirm-center">
        <!-- Animated orbit rings -->
        <div class="orbit-wrapper">
          <div class="orbit ring1"></div>
          <div class="orbit ring2"></div>
          <div class="orbit ring3"></div>
          <div class="orbit-core">✓</div>
        </div>

        <h2 class="confirm-title fade-up" style="animation-delay:0.1s">
          {{ t('title') }}
        </h2>

        <p class="confirm-sub fade-up" style="animation-delay:0.2s">
          {{ t('subtitle', { name: store.firstName }) }}
        </p>

        <!-- Profile summary pills -->
        <div class="profile-summary fade-up" style="animation-delay:0.3s">
          <span class="pill">{{ store.ageRange }}</span>
          <span class="pill">{{ genderLabel }}</span>
          <span class="pill">{{ store.maxDistance < 1 ? store.maxDistance * 1000 + 'm' : store.maxDistance + 'km' }}</span>
          <span class="pill">{{ activityLabel }}</span>
        </div>
      </div>

      <div class="bottom-area fade-up" style="animation-delay:0.4s">
        <button class="btn-primary btn-orange" @click="launch">
          {{ t('cta') }}
        </button>
        <button class="btn-text" @click="edit">{{ t('edit') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'

const router = useRouter()
const store = useProfileStore()

const i18n = {
  fr: {
    title: 'Votre profil est enregistré',
    subtitle: (v) => `Prêt·e ${v.name ? ', ' + v.name : ''} ?`,
    cta: 'Lancer la recherche',
    edit: 'Modifier mon profil',
    genders: { F: 'Femme', M: 'Homme', NB: 'Non binaire' },
    activities: { drink: 'Prendre un verre', meal: 'Partager un repas', walk: 'Aller marcher', activity: 'Partager une activité' },
  },
  en: {
    title: 'Your profile is saved',
    subtitle: (v) => `Ready${v.name ? ', ' + v.name : ''}?`,
    cta: 'Start searching',
    edit: 'Edit my profile',
    genders: { F: 'Woman', M: 'Man', NB: 'Non-binary' },
    activities: { drink: 'Grab a drink', meal: 'Share a meal', walk: 'Go for a walk', activity: 'Share an activity' },
  },
}

const t = (k, vars = {}) => {
  const entry = i18n[store.lang]?.[k] ?? i18n.fr[k]
  return typeof entry === 'function' ? entry(vars) : entry
}

const genderLabel = computed(() => i18n[store.lang]?.genders?.[store.gender] ?? store.gender)
const activityLabel = computed(() => i18n[store.lang]?.activities?.[store.activity] ?? store.activity)

function launch() {
  // In a real app, this would navigate to the matching/map screen
  alert(store.lang === 'fr' ? '🚀 Recherche lancée ! (Fonctionnalité à venir)' : '🚀 Search launched! (Coming soon)')
}

function edit() {
  router.push('/prenom')
}
</script>

<style scoped>
.confirmation-screen {
  justify-content: center;
}

.confirm-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
  padding: 20px 0;
}

/* Orbit animation */
.orbit-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 8px;
}

.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid transparent;
  animation: spin linear infinite;
}

.ring1 {
  inset: 0;
  border-color: rgba(245, 166, 35, 0.5);
  animation-duration: 4s;
  box-shadow: 0 0 12px rgba(245, 166, 35, 0.2);
}

.ring2 {
  inset: 12px;
  border-color: rgba(74, 158, 255, 0.4);
  animation-duration: 6s;
  animation-direction: reverse;
}

.ring3 {
  inset: 24px;
  border-color: rgba(245, 166, 35, 0.25);
  animation-duration: 8s;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.orbit-core {
  position: absolute;
  inset: 36px;
  background: radial-gradient(circle, rgba(245,166,35,0.3), rgba(245,166,35,0.05));
  border-radius: 50%;
  border: 1.5px solid var(--orange);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--orange);
  font-weight: 700;
  box-shadow: 0 0 24px rgba(245, 166, 35, 0.4);
}

.confirm-title {
  font-family: var(--font-main);
  font-size: 26px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.confirm-sub {
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-secondary);
}

.profile-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding: 0 8px;
}

.pill {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50px;
  padding: 6px 14px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-secondary);
  white-space: nowrap;
}
</style>

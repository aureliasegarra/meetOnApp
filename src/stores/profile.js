import { defineStore } from 'pinia'
import { saveProfile, loadProfile } from '../db.js'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    firstName: '',
    ageRange: '',
    gender: '',
    languages: [],
    interests: [],
    maxDistance: 5,
    activity: '',
    situation: '',
    targetAgeRanges: [],
    lang: 'fr',
    locationGranted: false,
    isComplete: false,
    id: null,
  }),

  actions: {
    async init() {
      const saved = await loadProfile()
      if (saved) {
        Object.assign(this.$state, saved)
      }
    },

    async persist() {
      await saveProfile({ ...this.$state })
    },

    setLang(l) {
      this.lang = l
      this.persist()
    },

    toggleLanguage(lang) {
      const idx = this.languages.indexOf(lang)
      if (idx > -1) this.languages.splice(idx, 1)
      else this.languages.push(lang)
    },

    toggleInterest(interest) {
      const idx = this.interests.indexOf(interest)
      if (idx > -1) this.interests.splice(idx, 1)
      else this.interests.push(interest)
    },

    toggleTargetAge(range) {
      const idx = this.targetAgeRanges.indexOf(range)
      if (idx > -1) this.targetAgeRanges.splice(idx, 1)
      else this.targetAgeRanges.push(range)
    },

    complete() {
      this.isComplete = true
      this.persist()
    }
  }
})

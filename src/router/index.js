import { createRouter, createWebHashHistory } from 'vue-router'
import Splash from '../views/Splash.vue'
import StepPrenom from '../views/StepPrenom.vue'
import StepAge from '../views/StepAge.vue'
import StepGenre from '../views/StepGenre.vue'
import StepLangues from '../views/StepLangues.vue'
import StepInterets from '../views/StepInterets.vue'
import StepDistance from '../views/StepDistance.vue'
import StepLocalisation from '../views/StepLocalisation.vue'
import StepActivite from '../views/StepActivite.vue'
import StepSituation from '../views/StepSituation.vue'
import StepAgeRecherche from '../views/StepAgeRecherche.vue'
import Confirmation from '../views/Confirmation.vue'

const routes = [
  { path: '/', component: Splash },
  { path: '/prenom', component: StepPrenom },
  { path: '/age', component: StepAge },
  { path: '/genre', component: StepGenre },
  { path: '/langues', component: StepLangues },
  { path: '/interets', component: StepInterets },
  { path: '/distance', component: StepDistance },
  { path: '/localisation', component: StepLocalisation },
  { path: '/activite', component: StepActivite },
  { path: '/situation', component: StepSituation },
  { path: '/age-recherche', component: StepAgeRecherche },
  { path: '/confirmation', component: Confirmation },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

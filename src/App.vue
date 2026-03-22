<template>
  <div id="root">
    <canvas ref="canvas" class="particles-bg"></canvas>
    <div class="app-shell">
      <router-view v-slot="{ Component, route }">
        <transition name="slide" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useProfileStore } from './stores/profile.js'

const canvas = ref(null)
const store = useProfileStore()
let animId = null
let particles = []

onMounted(async () => {
  await store.init()
  initParticles()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
})

function initParticles() {
  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')

  function resize() {
    c.width = window.innerWidth
    c.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Create initial particles
  for (let i = 0; i < 60; i++) {
    particles.push(createParticle())
  }

  function createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#F5A623' : '#4A9EFF',
      life: Math.random(),
      maxLife: Math.random() * 0.8 + 0.2,
    }
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height)

    particles.forEach((p, i) => {
      p.x += p.vx
      p.y += p.vy
      p.life += 0.002

      const progress = p.life / p.maxLife
      const alpha = progress < 0.1 ? progress / 0.1 : progress > 0.8 ? (1 - progress) / 0.2 : 1
      ctx.globalAlpha = p.opacity * alpha * 0.6

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()

      if (p.life >= p.maxLife || p.y < -10) {
        particles[i] = createParticle()
        particles[i].y = window.innerHeight + 10
        particles[i].life = 0
      }
    })

    ctx.globalAlpha = 1
    animId = requestAnimationFrame(draw)
  }

  draw()
}
</script>

<style scoped>
#root {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>

// db.js — PocketBase wrapper for MeetOn POC
// For local dev: data is stored in PocketBase (http://127.0.0.1:8090)
// Fallback: localStorage (for Netlify demo without backend)

const USE_LOCAL_FALLBACK = false // Set to false when PocketBase server is running
const pb = new PocketBase(import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090');

async function getPb() {
  if (pb) return pb
  try {
    const PocketBase = (await import('pocketbase')).default
    pb = new PocketBase('http://127.0.0.1:8090')
    return pb
  } catch (e) {
    return null
  }
}

// LocalStorage fallback
const LS_KEY = 'meeton_profile'

function saveLocal(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

function loadLocal() {
  const raw = localStorage.getItem(LS_KEY)
  return raw ? JSON.parse(raw) : null
}

// --- Public API ---

export async function saveProfile(profileData) {
  // Always save locally for fast access
  saveLocal(profileData)

  if (!USE_LOCAL_FALLBACK) {
    try {
      const client = await getPb()
      if (!client) return { success: true, source: 'local' }

      const existing = profileData.id
      if (existing) {
        await client.collection('profiles').update(existing, profileData)
      } else {
        const record = await client.collection('profiles').create(profileData)
        profileData.id = record.id
        saveLocal(profileData)
      }
      return { success: true, source: 'pocketbase', id: profileData.id }
    } catch (e) {
      console.warn('PocketBase unavailable, using localStorage:', e.message)
    }
  }

  return { success: true, source: 'local' }
}

export async function loadProfile() {
  return loadLocal()
}

export async function clearProfile() {
  localStorage.removeItem(LS_KEY)
}

export default { saveProfile, loadProfile, clearProfile }

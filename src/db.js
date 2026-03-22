import PocketBase from 'pocketbase'

const pb = new PocketBase(import.meta.env.VITE_PB_URL || 'http://127.0.0.1:8090')

const USE_LOCAL_FALLBACK = false

const LS_KEY = 'meeton_profile'

function saveLocal(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data))
}

function loadLocal() {
  const raw = localStorage.getItem(LS_KEY)
  return raw ? JSON.parse(raw) : null
}

export async function saveProfile(profileData) {
  saveLocal(profileData)

  try {
    const existing = profileData.id
    if (existing) {
      await pb.collection('profiles').update(existing, profileData)
    } else {
      const record = await pb.collection('profiles').create(profileData)
      profileData.id = record.id
      saveLocal(profileData)
    }
    return { success: true, source: 'pocketbase', id: profileData.id }
  } catch (e) {
    console.warn('PocketBase error:', e.message)
    return { success: true, source: 'local' }
  }
}

export async function loadProfile() {
  return loadLocal()
}

export async function clearProfile() {
  localStorage.removeItem(LS_KEY)
}

export default { saveProfile, loadProfile, clearProfile }

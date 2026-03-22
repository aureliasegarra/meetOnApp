# MeetOn 🔶

> Application de rencontres en temps réel — POC Vue 3 + Vite + PocketBase

---

## 🚀 Lancer en local (5 minutes)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le frontend

```bash
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173)

---

## 🗄️ Base de données (PocketBase) — optionnel pour le POC

Par défaut, les données sont persistées dans **localStorage** (pas de serveur requis).

Pour activer PocketBase (persistance serveur) :

### a. Télécharger PocketBase

[https://pocketbase.io/docs/](https://pocketbase.io/docs/)

```bash
# macOS / Linux
./pocketbase serve

# Windows
pocketbase.exe serve
```

PocketBase tourne sur `http://127.0.0.1:8090`

### b. Créer la collection `profiles` dans l'admin

Ouvre [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/) et crée une collection `profiles` avec ces champs :

| Champ | Type |
|---|---|
| `firstName` | text |
| `ageRange` | text |
| `gender` | text |
| `languages` | json |
| `interests` | json |
| `maxDistance` | number |
| `activity` | text |
| `situation` | text |
| `targetAgeRanges` | json |
| `locationGranted` | bool |
| `lang` | text |

### c. Activer PocketBase dans le code

Dans `src/db.js`, mettre :

```js
const USE_LOCAL_FALLBACK = false
```

---

## 🌐 Déployer sur Netlify

```bash
# 1. Build
npm run build

# 2. Push sur GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON_USER/meeton.git
git push -u origin main

# 3. Sur Netlify
# - Nouveau site depuis GitHub
# - Build command : npm run build
# - Publish directory : dist
```

Le fichier `netlify.toml` est déjà configuré. ✅

---

## 📱 Écrans de l'onboarding

| # | Route | Écran |
|---|---|---|
| — | `/` | Splash / Landing |
| 1 | `/prenom` | Prénom |
| 2 | `/age` | Tranche d'âge |
| 3 | `/genre` | Genre |
| 4 | `/langues` | Langues parlées |
| 5 | `/interets` | Centres d'intérêt |
| 6 | `/distance` | Distance maximale |
| 7 | `/localisation` | Permission GPS |
| 8 | `/activite` | Activité souhaitée |
| 9 | `/situation` | Situation amoureuse |
| 10 | `/age-recherche` | Âge recherché |
| — | `/confirmation` | Profil enregistré |

---

## 🏗️ Stack

- **Vue 3** + Composition API
- **Vite 5** (dev server ultra-rapide)
- **Pinia** (state management)
- **Vue Router 4** (hash history, compatible Netlify)
- **PocketBase** (BDD embarquée, admin UI incluse)
- **localStorage** fallback (POC sans serveur)

---

## 🎨 Design

- Thème sombre premium noir/doré/bleu
- Particules animées en canvas
- Transitions de pages fluides
- Responsive mobile-first
- Police : Outfit + DM Sans (Google Fonts)

<template>
  <main data-namespace="admin-dashboard" class="w-full py-8" >
    <h1 class="titre mb-4">Admin Dashboard</h1>

    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Création Livre -->
      <section class="mb-10 border rounded-lg p-4 w-full lg:w-1/3">
        <h2 class="text-xl font-semibold mb-2">Créer un livre</h2>
        <form @submit.prevent="create" class="grid gap-2">
          <input 
            v-model="draft.titre" 
            placeholder="Titre"
            required
            class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
          <textarea 
            v-model="draft.description" 
            rows="3" placeholder="Description" 
            class="p-2 border rounded-lg bg-gray-300 text-gray-700"></textarea>
          <input 
            v-model="draft.image" 
            placeholder="URL image (optionnel)" 
            class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
          <select v-model="draft.auteurIri" class="p-2 border rounded-lg bg-gray-300 text-gray-700">
            <option :value="null">Auteur (optionnel)</option>
            <option v-for="a in auteurs" :key="a.id" :value="a.iri">{{ a.nom }}</option>
          </select>
          <button class="btn btn-big">Créer</button>
        </form>
        <p v-if="createError" class="text-red-600 text-sm mt-2">{{ createError }}</p>
      </section>

      <!-- Création Auteur -->
      <section class="mb-10 border rounded-lg p-4 w-full lg:w-1/3">
        <h2 class="text-xl font-semibold mb-2">Créer un auteur</h2>
        <form @submit.prevent="createAuteur" class="grid gap-2">
          <input 
            v-model="draftAuteur.nom" 
            placeholder="Nom de l'auteur"
            required
            class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
         
          <button class="btn btn-big">Créer</button>
        </form>
        <p v-if="createAuteurError" class="text-red-600 text-sm mt-2">{{ createAuteurError }}</p>
      </section>

      <!-- Création Categorie -->
      <section class="mb-10 border rounded-lg p-4 w-full lg:w-1/3">
        <h2 class="text-xl font-semibold mb-2">Créer une catégorie</h2>
        <form @submit.prevent="createCategorie" class="grid gap-2">
            <input
              v-model="draftCategorie.nom"
              placeholder="Nom de la catégorie"
              required
              class="p-2 border rounded-lg bg-gray-300 text-gray-700"
            />
            <button class="btn btn-big">Créer</button>
          </form>
          <p v-if="createCategorieError" class="text-red-600 text-sm mt-2">{{ createCategorieError }}</p>
      </section>
    </div>
    

    <!-- Liste/édition -->
    <div v-if="pending">Chargement…</div>

    <section v-else >
      <h2 class="titre mb-4">Liste des livres</h2>
      <div class="w-full overflow-hidden rounded-lg border border-stone-200 mb-10">
        <table class="w-full">
          <thead class="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600 dark:bg-surface-dark">
            <tr>
              <th class="p-2 text-start font-medium">Titre</th>
              <th class="p-2 text-start font-medium">Description</th>
              <th class="p-2 text-start font-medium">URL</th>
              <th class="p-2 text-start font-medium">Auteur</th>
              <th class="p-2 text-start font-medium">Catégories</th>
              <th class="p-2 text-start font-medium"></th>
            </tr>
          </thead>
          <tbody class="group text-sm text-stone-800 dark:text-white">
            <tr v-for="l in livres" :key="l.id"   class="border-b border-stone-200 last:border-0">
              <td class="p-2">
                <input v-model="l.titre" class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
              </td>
              <td class="p-2">
                <textarea 
                  v-model="l.description" 
                  rows="1"
                  class="p-2 border rounded-lg bg-gray-300 text-gray-700"></textarea>
              </td>
              <td class="p-2">
                <input v-model="l.image" class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
              </td>
              <td class="p-2">
                <select v-model="l.auteurIri" class="p-2 border rounded-lg bg-gray-300 text-gray-700">
                  <option :value="null">Aucun</option>
                  <option v-for="a in auteurs" :key="a.id" :value="a.iri">{{ a.nom }}</option>
                </select>
              </td>
              <td class="p-2">
                
                <div class="flex flex-col space-y-2">
                  <label
                    v-for="c in categories"
                    :key="c.id"
                    class="inline-flex items-center gap-2 cursor-pointer select-none"
                    :for="`cat-${l.id}-${c.id}`"
                  >
                    <input
                      :id="`cat-${l.id}-${c.id}`"
                      type="checkbox"
                      class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow-sm hover:shadow border border-stone-200 checked:bg-stone-800 checked:border-stone-800"
                      v-model="l.categoriesIris"
                      :value="c.iri"
                    />
                    
                    <span class="text-sm">{{ c.nom }}</span>
                  </label>
                </div>
              </td>
              <td class="p-2">
                <button @click="save(l)" class="btn mr-2" :disabled="l._busy">Enregistrer</button>
                <button @click="del(l)" class="btn" :disabled="l._busy">Supprimer</button>
                <p v-if="l._busy" class="text-xs text-gray-500 mt-1">En cours…</p>
                <p v-if="l._err" class="text-xs text-red-600 mt-1">{{ l._err }}</p>
                <p v-if="l._success" class="text-xs text-green-600 mt-1">{{ l._success }}</p>
              </td>
            </tr>
           
            
          </tbody>
        </table>
      </div>
  
    </section>

    <div class="flex flex-col lg:flex-row gap-4">
      <section class="mb-10 w-full lg:w-1/2">
        <h2 class="titre mb-4">Liste des auteurs</h2>
        <p v-if="pendingAuteurs">Chargement…</p>
        <p v-else-if="auteursError" class="text-red-600 text-sm">{{ auteursError }}</p>

        <div v-else class="w-full overflow-hidden rounded-lg border border-stone-200">
          <table class="w-full">
            <thead class="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600">
              <tr>
                <th class="p-2 text-start font-medium">Nom</th>
                <th class="p-2 text-start font-medium"></th>
              </tr>
            </thead>
            <tbody class="group text-sm text-stone-800">
              <tr v-for="a in auteursRows" :key="a.id" class="border-b border-stone-200 last:border-0">
                <td class="p-2">
                  <input v-model="a.nom" class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
                </td>
                <td class="p-2">
                  <button @click="saveAuteur(a)" class="btn mr-2" :disabled="a._busy">Enregistrer</button>
                  <button @click="delAuteur(a)" class="btn" :disabled="a._busy">Supprimer</button>
                  <p v-if="a._busy" class="text-xs text-gray-500 mt-1">En cours…</p>
                  <p v-if="a._err" class="text-xs text-red-600 mt-1">{{ a._err }}</p>
                  <p v-if="a._success" class="text-xs text-green-600 mt-1">{{ a._success }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


      <section class="mb-10 w-full lg:w-1/2">
        <h2 class="titre mb-4">Liste des catégories</h2>
          <p v-if="pendingCategories">Chargement…</p>
          <p v-else-if="categoriesError" class="text-red-600 text-sm">{{ categoriesError }}</p>

          <div v-else class="w-full overflow-hidden rounded-lg border border-stone-200">
            <table class="w-full">
              <thead class="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600">
                <tr>
                  <th class="p-2 text-start font-medium">Nom</th>
                  <th class="p-2 text-start font-medium"></th>
                </tr>
              </thead>
              <tbody class="group text-sm text-stone-800">
                <tr v-for="c in categoriesRows" :key="c.id" class="border-b border-stone-200 last:border-0">
                  <td class="p-2">
                    <input v-model="c.nom" class="p-2 border rounded-lg bg-gray-300 text-gray-700" />
                  </td>
                  <td class="p-2">
                    <button @click="saveCategorie(c)" class="btn mr-2" :disabled="c._busy">Enregistrer</button>
                    <button @click="delCategorie(c)" class="btn" :disabled="c._busy">Supprimer</button>
                    <p v-if="c._busy" class="text-xs text-gray-500 mt-1">En cours…</p>
                    <p v-if="c._err" class="text-xs text-red-600 mt-1">{{ c._err }}</p>
                    <p v-if="c._success" class="text-xs text-green-600 mt-1">{{ c._success }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </section>
    </div>

  </main>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

const config = useRuntimeConfig()
const token = useCookie('jwt_token')
import { useRouter } from 'vue-router'
const router = useRouter()

function handleAuthError(e) {
  const s = e?.response?.status
  if (s === 401 || s === 403) {
    useCookie('jwt_token').value = null
    router.push('/admin') // page de login
    return true
  }
  return false
}

useHead({ title: 'Admin – Dashboard', meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

// Charger la liste des livres
const { data, pending, refresh } = await useAsyncData('livres-admin', async () => {
  const raw = await $fetch(`${config.public.apiBase}/livres`, {
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
  })
  if (Array.isArray(raw)) return raw
  return raw && (raw['hydra:member'] || raw.member) ? (raw['hydra:member'] || raw.member) : []
}, { default: () => [] })

//const livres = computed(() => data.value || [])
const livres = ref([])
//hydratation
watchEffect(() => {
  livres.value = (data.value ?? []).map(o => {
    const auteurIri = (o.auteur && typeof o.auteur === 'object')
      ? o.auteur['@id']
      : (typeof o.auteur === 'string' ? o.auteur : null)

    const cats = Array.isArray(o.categories) ? o.categories : []
    const categoriesIris = cats.map(c =>
      typeof c === 'string' ? c : (c?.['@id'] ?? `/api/categories/${c.id}`)
    )

    return {
      ...o,
      auteurIri: auteurIri ?? null,
      categoriesIris, 
      _busy: false,
      _err: null,
      _success: null,
    }
  })
})

//Charger la liste des auteurs
const auteurs = ref([])
const auteursRows = ref([])
const pendingAuteurs = ref(true)
const auteursError = ref(null)

async function loadAuteurs() {
  pendingAuteurs.value = true
  auteursError.value = null
  try {
    const raw = await $fetch(`${config.public.apiBase}/auteurs`, {
      headers: {
        Accept: 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
    const list = Array.isArray(raw) ? raw : (raw['hydra:member'] ?? raw.member ?? [])
    auteurs.value = list.map(a => ({
      iri: a['@id'] ?? `/api/auteurs/${a.id}`,
      id: a.id,
      nom: a.nom
    }))
    auteursRows.value = list.map(a => ({
      ...a,
      _busy: false,
      _err: null,
      _success: null
    }))
  } catch (e) {
    if (handleAuthError(e)) return
    auteursError.value = 'Impossible de charger les auteurs'
  } finally {
    pendingAuteurs.value = false
  }
}

await loadAuteurs()

//Charger la liste des catégories
const categories = ref([])
const categoriesRows = ref([])
const pendingCategories = ref(true)
const categoriesError = ref(null)

async function loadCategories() {
  pendingCategories.value = true
  categoriesError.value = null
  try {
    const raw = await $fetch(`${config.public.apiBase}/categories`, {
      headers: {
        Accept: 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
    const list = Array.isArray(raw) ? raw : (raw['hydra:member'] ?? raw.member ?? [])
    categories.value = list.map(c => ({
      iri: c['@id'] ?? `/api/categories/${c.id}`,
      id: c.id,
      nom: c.nom
    }))
    categoriesRows.value = list.map(c => ({
      ...c,
      _busy: false,
      _err: null,
      _success: null
    }))
  } catch (e) {
    if (handleAuthError(e)) return
    categoriesError.value = 'Impossible de charger les catégories'
  } finally {
    pendingCategories.value = false
  }
}

await loadCategories()


// Création
const draft = reactive({ titre: '', description: '', image: '', auteurIri:null })
const createError = ref(null)

async function create() {
  createError.value = null
  try {
    const payload = {
      titre: draft.titre,
      description: draft.description,
      image: draft.image || null,
      auteur: draft.auteurIri || null
    }
    await $fetch(`${config.public.apiBase}/livres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: payload
    })
    Object.assign(draft, { titre: '', description: '', image: '', auteurIri: null })
    await refresh()
  } catch (e) {
    createError.value = e?.data?.detail || 'Erreur à la création.'
  }
}

// Sauvegarde
async function save(l) {
  l._busy = true; l._err = null; l._success = null;
  try {
    await $fetch(`${config.public.apiBase}/livres/${l.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: JSON.stringify({
        titre: l.titre,
        description: l.description,
        image: l.image ?? null,
        auteur: l.auteurIri || null,
        categories: l.categoriesIris || []
      })
    })
    l._success = 'Livre modifié avec succès !'
    setTimeout(() => { l._success = null }, 1000)
  } catch (e) {
    if (handleAuthError(e)) return
    l._err = e?.data?.detail || 'Erreur à la sauvegarde.'
  } finally {
    l._busy = false
  }
}

// Suppression
async function del(l) {
  l._busy = true; l._err = null
  try {
    await $fetch(`${config.public.apiBase}/livres/${l.id}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })
    await refresh()
  } catch (e) {
    l._err = e?.data?.detail || 'Erreur à la suppression.'
  } finally {
    l._busy = false
  }
}

// Création auteur
const draftAuteur = reactive({ nom: '' })
const createAuteurError = ref(null)

async function createAuteur() {
  createAuteurError.value = null
  try {
    await $fetch(`${config.public.apiBase}/auteurs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: { nom: draftAuteur.nom }
    })
    Object.assign(draftAuteur, { nom: '' })
    await loadAuteurs() // rafraichi la liste
  } catch (e) {
    createAuteurError.value = e?.data?.detail || 'Erreur à la création de l\'auteur.'
  }
}

//Sauvegarde Auteur
async function saveAuteur(a) {
  a._busy = true; a._err = null; a._success = null
  try {
    await $fetch(`${config.public.apiBase}/auteurs/${a.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: JSON.stringify({ nom: a.nom })
    })
    a._success = 'Auteur modifié !'
    setTimeout(() => (a._success = null), 1000)
    
    await loadAuteurs() // rafraîchit la liste
  } catch (e) {
    a._err = e?.data?.detail || 'Erreur à la sauvegarde.'
  } finally {
    a._busy = false
  }
}

//Suppression Auteur
async function delAuteur(a) {
  a._busy = true; a._err = null
  try {
    await $fetch(`${config.public.apiBase}/auteurs/${a.id}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })
    await loadAuteurs()
  } catch (e) {
    a._err = e?.data?.detail || 'Erreur à la suppression.'
  } finally {
    a._busy = false
  }
}

// Création Categorie
const draftCategorie = reactive({ nom: '' })
const createCategorieError = ref(null)

async function createCategorie() {
  createCategorieError.value = null
  try {
    await $fetch(`${config.public.apiBase}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: { nom: draftCategorie.nom }
    })
    Object.assign(draftCategorie, { nom: '' })
    await loadCategories()
  } catch (e) {
    createCategorieError.value = e?.data?.detail || 'Erreur à la création de la catégorie.'
  }
}

//Sauvegarde Categorie
async function saveCategorie(c) {
  c._busy = true; c._err = null; c._success = null
  try {
    await $fetch(`${config.public.apiBase}/categories/${c.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/ld+json',
        'Accept': 'application/ld+json',
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      },
      body: JSON.stringify({ nom: c.nom })
    })
    c._success = 'Catégorie modifiée !'
    setTimeout(() => (c._success = null), 1000)
    await loadCategories() // rafraîchit la liste
  } catch (e) {
    c._err = e?.data?.detail || 'Erreur à la sauvegarde.'
  } finally {
    c._busy = false
  }
}

// Suppression Categorie
async function delCategorie(c) {
  c._busy = true; c._err = null
  try {
    await $fetch(`${config.public.apiBase}/categories/${c.id}`, {
      method: 'DELETE',
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })
    await loadCategories()
  } catch (e) {
    c._err = e?.data?.detail || 'Erreur à la suppression.'
  } finally {
    c._busy = false
  }
}


</script>

<template>
  <main data-namespace="admin-dashboard" class="w-full py-8" >
    <h1 class="titre mb-4">Admin Dashboard</h1>

    <!-- Création -->
    <section class="mb-10 border rounded-lg p-4 max-w-sm">
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
        <button class="btn btn-big">Créer</button>
      </form>
      <p v-if="createError" class="text-red-600 text-sm mt-2">{{ createError }}</p>
    </section>

    <!-- Liste/édition -->
    <div v-if="pending">Chargement…</div>

    <section v-else >
      <h2 class="titre mb-4">Liste des livres</h2>
      <div class="w-full overflow-hidden rounded-lg border border-stone-200">
        <table class="w-full">
          <thead class="border-b border-stone-200 bg-stone-100 text-sm font-medium text-stone-600 dark:bg-surface-dark">
            <tr>
              <th class="p-2 text-start font-medium">Titre</th>
              <th class="p-2 text-start font-medium">Description</th>
              <th class="p-2 text-start font-medium">URL</th>
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
  </main>
</template>

<script setup>
definePageMeta({ middleware: ['auth'] })

const config = useRuntimeConfig()
const token = useCookie('jwt_token')

useHead({ title: 'Admin – Dashboard', meta: [{ name: 'robots', content: 'noindex,nofollow' }] })

// Charger la liste
const { data, pending, refresh } = await useAsyncData('livres-admin', async () => {
  const raw = await $fetch(`${config.public.apiBase}/livres`, {
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
  })
  if (Array.isArray(raw)) return raw
  return raw && (raw['hydra:member'] || raw.member) ? (raw['hydra:member'] || raw.member) : []
}, { default: () => [] })

//const livres = computed(() => data.value || [])
const livres = ref([])
watchEffect(() => {
  // copie réactive + flags init
  livres.value = (data.value ?? []).map(o => ({
    ...o,
    _busy: false,
    _err: null,
    _success: null,
  }))
})

// Création
const draft = reactive({ titre: '', description: '', image: '' })
const createError = ref(null)

async function create() {
  createError.value = null
  try {
    const payload = {
      titre: draft.titre,
      description: draft.description,
      image: draft.image || null,
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
    Object.assign(draft, { titre: '', description: '', image: '' })
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
      })
    })
    l._success = 'Livre modifié avec succès !'
    setTimeout(() => { l._success = null }, 1000)
  } catch (e) {
    console.error('PUT error', e?.response?.status, e?.data || e)
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
</script>

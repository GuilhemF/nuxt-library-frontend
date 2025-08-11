<template>
  <main data-namespace="single-cat" class="w-full py-8">
    <h1 class="titre mb-8">Livres pour la catégorie : <span v-if="categorie">{{ categorie.nom }}</span></h1>

    <p v-if="pending || pendingLivres">Chargement en cours...</p>
    <p v-else-if="categorie === null">Catégorie non trouvée.</p>

    <p v-else-if="error || livres.length === 0">Aucun livre n'a été trouvé pour cette catégorie.</p>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      <CardBook
        v-for="livre in livres"
        :key="livre.id"
        :livre="livre"
      />
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const categorieId = route.params.id;
const config = useRuntimeConfig();

// Fetch the category to get its name
const { data: categorie, pending: categoriePending } = await useAsyncData(
  `categorie-${categorieId}`,
  async () => {
    try {
      return await $fetch(`${config.public.apiBase}/categories/${categorieId}`);
    } catch (e) {
      return null; // Return null on 404
    }
  }
);

// Fetch the books for this category
const { data: livres, pending: livresPending, error } = await useAsyncData(
  `livres-categorie-${categorieId}`,
  async () => {
    if (!categorie.value) {
      return []; // Return an empty array if the category doesn't exist
    }
    const raw = await $fetch(`${config.public.apiBase}/livres?categories.id=${categorieId}`);
    return raw && (raw['hydra:member'] || raw.member) ? (raw['hydra:member'] || raw.member) : [];
  },
  { default: () => [] }
);

const pending = computed(() => categoriePending.value || livresPending.value);

useHead({
  title: categorie.value?.nom ? `${categorie.value.nom} - Bibliothèque` : 'Catégorie non trouvée',
  meta: [
    { name: 'description', content: categorie.value?.nom ? `Découvrez les livres de la catégorie ${categorie.value.nom}.` : 'Catégorie non trouvée.' }
  ]
});
</script>
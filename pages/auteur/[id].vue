<template>
  <main data-namespace="single-auteur" class="w-full py-8">
    <h1 class="titre mb-8">Livres de l'auteur : <span v-if="auteur">{{ auteur.nom }}</span></h1>

    <p v-if="pending">Chargement en cours...</p>
    <p v-else-if="auteur === null">Auteur non trouvée.</p>

    <p v-else-if="error || livres.length === 0">Aucun livre n'a été trouvé pour cet auteur.</p>
    
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
const auteurId = route.params.id;
const config = useRuntimeConfig();

// Fetch the auteur to get its name
const { data: auteur, pending: auteurPending } = await useAsyncData(
  `auteur-${auteurId}`,
  async () => {
    try {
      return await $fetch(`${config.public.apiBase}/auteurs/${auteurId}`);
    } catch (e) {
      return null; // Return null on 404
    }
  }
);

// Fetch the books for this author
const { data: livres, pending: livresPending, error } = await useAsyncData(
  `livres-auteur-${auteurId}`,
  async () => {
    if (!auteur.value) {
      return []; // Return an empty array if the author doesn't exist
    }
    const raw = await $fetch(`${config.public.apiBase}/livres?auteur.id=${auteurId}`);
    return raw && (raw['hydra:member'] || raw.member) ? (raw['hydra:member'] || raw.member) : [];
  },
  { default: () => [] }
);

const pending = computed(() => auteurPending.value || livresPending.value);

useHead({
  title: auteur.value?.nom ? `${auteur.value.nom} - Bibliothèque` : 'Auteur non trouvée',
  meta: [
    { name: 'description', content: auteur.value?.nom ? `Découvrez les livres de l'auteur ${auteur.value.nom}.` : 'Auteur non trouvée.' }
  ]
});
</script>
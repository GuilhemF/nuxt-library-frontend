<template>
  <main data-namespace="listing-cat" class="w-full py-8">
    <h1 class="titre mb-8">Liste des catégories</h1>

    <p v-if="pending">Chargement des catégories en cours...</p>
    <p v-else-if="error">Une erreur est survenue lors du chargement des catégories.</p>
    <ul v-else class="flex flex-col gap-4 max-w-sm">
      <li v-for="cat in categories" :key="cat.id" class="inline-flex">
        <NuxtLink :to="`/categorie/${cat.id}`" class="btn btn-big">
          {{ cat.nom }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { useAsyncData } from '#app';
const config = useRuntimeConfig();

// Fetch all categories
const { data: categories, pending, error } = await useAsyncData(
  'categories',
  async () => {
    const raw = await $fetch(`${config.public.apiBase}/categories`);
    return raw && (raw['hydra:member'] || raw.member) ? (raw['hydra:member'] || raw.member) : [];
  },
  { default: () => [] }
);

useHead({
  title: 'Catégories - Bibliothèque',
  meta: [
    { name: 'description', content: 'Découvrez toutes nos catégories de livres.' }
  ]
});
</script>
<template>
  <main data-namespace="listing-auteur" class="w-full py-8">
    <h1 class="titre mb-8">Liste des auteurs</h1>

    <p v-if="pending">Chargement des auteurs en cours...</p>
    <p v-else-if="error">Une erreur est survenue lors du chargement des auteurs.</p>
    <ul v-else class="flex flex-col gap-4 max-w-sm">
      <li v-for="aut in auteurs" :key="aut.id" class="inline-flex">
        <NuxtLink :to="`/auteur/${aut.id}`" class="btn btn-big">
          {{ aut.nom }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { useAsyncData } from '#app';
const config = useRuntimeConfig();

// Fetch all auteurs
const { data: auteurs, pending, error } = await useAsyncData(
  'auteurs',
  async () => {
    const raw = await $fetch(`${config.public.apiBase}/auteurs`);
    return raw && (raw['hydra:member'] || raw.member) ? (raw['hydra:member'] || raw.member) : [];
  },
  { default: () => [] }
);

useHead({
  title: 'Auteurs - Bibliothèque',
  meta: [
    { name: 'description', content: 'Découvrez toutes nos auteurs de livres.' }
  ]
});
</script>
<template>
  <main data-namespace="single-book" class="w-full grid grid-cols-1 md:grid-cols-2 items-start gap-8" >
    <NuxtImg v-if="livre?.image" :src="livre.image" :alt="`Image de la couverture du livre ${livre.titre}`" class="" />
    <NuxtImg v-else src="/placeholder.webp" alt="Image par défaut" class="" />

    <div class="content">
      <h1 v-if="livre" class="titre mb-4">{{ livre.titre }}</h1>
      <p v-if="livre">{{ livre.description }}</p>
      <p v-else>Livre non trouvé.</p>

      
     
    </div>
    
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const config = useRuntimeConfig();

const { data: livre, pending, error } = useFetch(`${config.public.apiBase}/livres/${id}`);

const pageTitle = computed(() => {
  if (livre.value) {
    return `${livre.value.titre} – Zecarrossery Bibliothèque`;
  }
  return 'Livre non trouvé – Zecarrossery Bibliothèque';
});

const pageDescription = computed(() => {
  if (livre.value) {
    return livre.value.description;
  }
  return 'Découvrez un livre de notre collection.';
});

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription }
  ]
});

</script>
<template>
  <main data-namespace="single-book" class="w-full grid grid-cols-1 md:grid-cols-2 items-start gap-8 py-4" >
    <NuxtImg 
      v-if="livre?.image" 
      :src="livre.image" 
      :alt="`Image de la couverture du livre ${livre.titre}`" class="" 
    />
    <NuxtImg v-else src="/placeholder.webp" alt="Image par défaut" class="" />

    <div class="content">
      <section v-if="livre">
        <h1 class="titre mb-4">{{ livre.titre }}</h1>
        <NuxtLink v-if="livre.auteur" :to="`/auteur/${livre.auteur.id}`" class="text-sm mb-4 block underline">Par {{ livre.auteur.nom }}</NuxtLink>
        
        <ul v-if="livre.categories && livre.categories.length > 0" class="flex gap-2 mb-4">
          <li v-for="cat in livre.categories" :key="cat.id" class="text-xs px-2 py-1 rounded-full pills">
            <NuxtLink :to="`/categorie/${cat.id}`">{{ cat.nom }}</NuxtLink>
          </li>
        </ul>
        <p>{{ livre.description }}</p>
      </section>

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
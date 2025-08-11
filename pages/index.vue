<template>
  <main class="w-full" data-namespace="home">
     <NuxtImg src="/bibliotheque.webp" alt="Image de bibliothèque" class="banner mb-8" loading="lazy"/>           
            
    <h1 class="titre mb-8">Liste des livres</h1>
    
    
    <p v-if="pending">Chargement des livres en cours...</p>
    <p v-else-if="error">Une erreur est survenue lors du chargement des livres.</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-screen">
        <CardBook
            v-for="livre in livres"
            :key="livre.id"
            :livre="livre"
            @click="navigateToBook(livre.id)"
        />  
    </div>

  </main>
</template>

<script setup>
const config = useRuntimeConfig()

const { data: livres, pending, error } = useFetch(`${config.public.apiBase}/livres?page=1`, {
  transform: (data) => data.member 
});

if (error.value) {
  console.error('Erreur API :', error.value)
}

useHead({
  title: 'Accueil – Zecarrossery Bibliothèque',
  meta: [
    { name: 'description', content: 'Bienvenue sur la bibliothèque Zecarrossery. Découverte de Nuxt.' }
  ]
})

const navigateToBook = (id) => {
  if (!document.startViewTransition) {
    navigateTo(`/livre/${id}`);
    return;
  }

  document.startViewTransition(() => {
    navigateTo(`/livre/${id}`);
  });
};
</script>
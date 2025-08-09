<template>
  <main class="w-full" data-namespace="home">
     <NuxtImg src="/bibliotheque.webp" alt="Image de bibliothèque" class="banner" />           
            
    <h1>Home</h1>
   <div v-if="pending">
      <p>Chargement des livres en cours...</p>
    </div>
    <div v-else-if="error">
      <p>Une erreur est survenue lors du chargement des livres.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        
        <CardBook
            v-for="livre in livres"
            :key="livre.id"
            :livre="livre"
        />
    </div>

    <h2 style="height:100vh;">lorem</h2>
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
</script>
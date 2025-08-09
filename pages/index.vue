<template>
  <main>
    <h1>Home</h1>
   <div v-if="pending">
      <p>Chargement des livres en cours...</p>
    </div>
    <div v-else-if="error">
      <p>Une erreur est survenue lors du chargement des livres.</p>
    </div>
    <div v-else>
     
    <CardBook
        v-for="livre in livres"
        :key="livre.id"
        :livre="livre"
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
</script>
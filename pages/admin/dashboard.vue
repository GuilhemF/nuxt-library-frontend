<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold">Tableau de bord administrateur</h1>
    <p>Bienvenue ! Vous êtes connecté.</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
});
</script>
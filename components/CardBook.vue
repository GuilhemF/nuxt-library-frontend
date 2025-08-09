<template>
    <article class="card-book p-2 rounded-lg border flex flex-col gap-2 items-start">
        <h2>{{ livre.titre }}</h2>
        <p>{{ livre.description }}</p>
        <NuxtLink :to="`/livre/${livre.id}`" class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-1 px-2 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 border-stone-900 text-stone-50 rounded-lg transition antialiased">Découvrir</NuxtLink>
    </article>
</template>


<script setup>
const props = defineProps({
  livre: {
    type: Object,
    required: true
  }
})
</script>



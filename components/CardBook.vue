<template>
    <article class="card-book p-2 rounded-lg flex flex-col gap-4 items-start">
        <NuxtImg 
          :src="livre.image" :alt="livre.titre" 
          loading="lazy" class="h-[200px]"
        />

        <ul v-if="livre.categories && livre.categories.length > 0" class="flex gap-2">
          <li v-for="cat in livre.categories" :key="cat.id" class="text-xs px-2 py-1 rounded-full pills">
            {{ cat.nom }}
          </li>
        </ul>

        <h2 class="titre">{{ livre.titre }}</h2>
        <span v-if="livre.auteur" class="text-sm">Par {{ livre.auteur.nom }}</span>
        
        <p>{{ livre.description }}</p>

        <NuxtLink :to="`/livre/${livre.id}`" class="btn btn-big mt-auto">Découvrir</NuxtLink>
        
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

<style>
.card-book{
  border:solid 1px var(--clr-text);
  position:relative;
  img{
    height:200px;
    object-fit:contain;
  }
  h2{
    font-size:2rem;
  }
  p{
    display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  }
  
  a::after{
    content:"";
    position:absolute;
    inset:0;
  }
}
.card-book:hover,
.card-book:focus{
  h2{
    text-decoration:underline;
  }
}
</style>

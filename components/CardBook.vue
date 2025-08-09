<template>
    <article class="card-book">
        <h2>{{ livre.titre }}</h2>
        <p>{{ livre.description }}</p>
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

<style scoped>
.card-book {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
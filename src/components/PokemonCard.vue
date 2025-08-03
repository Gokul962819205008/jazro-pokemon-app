<template>
  <div class="card h-100 text-center shadow-sm" @click="goToDetails">
    <img :src="pokemon.image" class="card-img-top" :alt="pokemon.name" />
    <div class="card-body">
      <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
      <p class="card-text">Height: {{ pokemon.height }} | Weight: {{ pokemon.weight }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const props = defineProps(['pokemon']);
const router = useRouter();

const goToDetails = () => {
  router.push(`/pokemon/${props.pokemon.name}`);
};
</script>

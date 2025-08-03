<template>
  <div class="container my-4">
    <h2 class="mb-4">Pokémon List</h2>
    <input type="text" v-model="search" class="form-control mb-3" placeholder="Search Pokémon..." />
    <div v-if="loading" class="text-center py-5"><div class="spinner-border"></div></div>
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
      <div v-for="poke in filteredPokemon" :key="poke.name" class="col">
        <PokemonCard :pokemon="poke" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';
import PokemonCard from '../components/PokemonCard.vue';

const store = usePokemonStore();
const search = ref('');
const loading = ref(true);

const filteredPokemon = computed(() =>
  store.pokemonList.filter(p => p.name.includes(search.value.toLowerCase()))
);

onMounted(async () => {
  if (store.pokemonList.length === 0) await store.fetchPokemon();
  loading.value = false;
});
</script>

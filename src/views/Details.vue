<template>
  <div class="container my-5" v-if="pokemon">
    <div class="row g-4">
      <div class="col-md-5 text-center">
        <img :src="pokemon.image" class="img-fluid" :alt="pokemon.name" />
      </div>
      <div class="col-md-7">
        <h2 class="text-capitalize">{{ pokemon.name }}</h2>
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
        <p><strong>Types:</strong> {{ pokemon.types.join(', ') }}</p>

        <div class="mt-4">
          <h5>Edit Info</h5>
          <input v-model="pokemon.height" class="form-control mb-2" placeholder="Height" />
          <input v-model="pokemon.weight" class="form-control mb-2" placeholder="Weight" />
          <button class="btn btn-primary" @click="store.updatePokemon(pokemon)">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { usePokemonStore } from '../stores/pokemonStore';
import { useRoute } from 'vue-router';

const store = usePokemonStore();
const route = useRoute();
const pokemon = ref(null);

onMounted(async () => {
  const name = route.params.name;
  pokemon.value = await store.getPokemonByName(name);
});
</script>

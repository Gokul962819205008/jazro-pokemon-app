import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonList: []
  }),
  actions: {
    async fetchPokemon() {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      const results = res.data.results;

      const promises = results.map(async (p) => {
        const detail = await axios.get(p.url);
        return {
          name: p.name,
          image: detail.data.sprites.front_default,
          height: detail.data.height,
          weight: detail.data.weight,
          base_experience: detail.data.base_experience,
          types: detail.data.types.map(t => t.type.name)
        };
      });

      this.pokemonList = await Promise.all(promises);
    },
    async getPokemonByName(name) {
      let poke = this.pokemonList.find(p => p.name === name);
      if (!poke) {
        const detail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        poke = {
          name: detail.data.name,
          image: detail.data.sprites.front_default,
          height: detail.data.height,
          weight: detail.data.weight,
          base_experience: detail.data.base_experience,
          types: detail.data.types.map(t => t.type.name)
        };
        this.pokemonList.push(poke);
      }
      return poke;
    },
    updatePokemon(updated) {
      const index = this.pokemonList.findIndex(p => p.name === updated.name);
      if (index !== -1) {
        this.pokemonList[index] = { ...updated };
      }
    }
  }
});

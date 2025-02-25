import { defineStore } from "pinia";
import api from "../api/api";

interface Hero {
  id: string;
  name: string;
  fullName: string;
  bio: string;
  actor: string;
  createdBy: string;
  abilities: string[];
  imageUrl: string;
}

export const useHeroesStore = defineStore("heroes", {
  state: () => ({
    heroes: [] as Hero[],
    filter: "",
  }),
  getters: {
    filteredHeroes(state) {
      if (!state.filter) return state.heroes;
      return state.heroes.filter((hero) =>
        hero.name.toLowerCase().includes(state.filter.toLowerCase())
      );
    },
  },
  actions: {
    setFilter(value: string) {
      this.filter = value;
    },
    async fetchHeroes() {
      const { data } = await api.get("/marvelHeroes");
      this.heroes = data.data.marvelHeroes;
    },
    async addHero(hero: Omit<Hero, "id">) {
      const { data } = await api.post("/marvelHeroes", hero);
      this.heroes.push(data.data.marvelhero);
    },
    async updateHero(id: string, hero: Partial<Hero>) {
      await api.patch(`/marvelHeroes/${id}`, hero);
      this.fetchHeroes();
    },
    async deleteHero(id: string) {
      await api.delete(`/marvelHeroes/${id}`);
      this.heroes = this.heroes.filter((h) => h.id !== id);
    },
    async getHeroById(id: string) {
      const { data } = await api.get(`/marvelHeroes/${id}`);
      return data.data.marvelHero;
    },
  },
});

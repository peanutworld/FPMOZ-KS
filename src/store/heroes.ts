import { defineStore } from "pinia";
import api from "../api/api";

interface Hero {
  id: string;
  name: string;
  power: string;
  description?: string;
}

export const useHeroesStore = defineStore("heroes", {
  state: () => ({
    heroes: [] as Hero[],
  }),
  actions: {
    async fetchHeroes() {
      const { data } = await api.get("/marvelHeroes");
      this.heroes = data.data.marvelHeroes;
    },
    async addHero(hero: Omit<Hero, "id">) {
      const { data } = await api.post("/marvelHeroes", hero);
      this.heroes.push(data);
    },
    async updateHero(id: string, hero: Partial<Hero>) {
      await api.patch(`/marvelHeroes/${id}`, hero);
      this.fetchHeroes();
    },
    async deleteHero(id: string) {
      await api.delete(`/marvelHeroes/${id}`);
      this.heroes = this.heroes.filter((h) => h.id !== id);
    },
  },
});

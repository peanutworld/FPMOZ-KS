import { defineStore } from "pinia";

interface Menu {
  id: number;
  active: boolean;
  name: string;
}

export const useMenuStore = defineStore("menu", {
  state: () => ({
    data: [
      { id: 1, active: true, name: "Dashboard" },
      { id: 2, active: false, name: "Profile" },
      { id: 3, active: false, name: "Settings" },
    ] as Menu[],
    active: 1,
  }),
  actions: {
    selectMenu(menuId: number) {
      this.data = this.data.map((m) => ({
        ...m,
        active: m.id === menuId,
      }));
      this.active = menuId;
    },
  },
});

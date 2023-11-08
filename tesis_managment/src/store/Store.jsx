import { create } from "zustand";
import dataTesis from "../mockups/tesis.json";

const useTesisStore = create((set) => ({
  tesis: dataTesis,

  addTesis: (newTesis) => {
    set((state) => ({
      tesis: [...state.tesis, newTesis],
    }));
  },
  setTesis: (newTesis) => {
    set(() => ({
      tesis: newTesis,
    }));
  },
}));
export default useTesisStore;


import {create} from 'zustand'


type BreadsStore = {
    breeds: string[];
    filterBreeds: string[];
    setBreeds: (breeds: string[]) => void;
    setFilterBreeds: (filterBreeds: string[]) => void;
}
 const useBreedsStore = create<BreadsStore>((set) => ({
  breeds: [],
  filterBreeds: [],
  setBreeds: (breeds) => set({breeds}),
  setFilterBreeds: (filterBreeds) => set({filterBreeds})
}))


export default useBreedsStore

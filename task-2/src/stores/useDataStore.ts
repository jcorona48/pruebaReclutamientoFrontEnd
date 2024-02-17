import {create} from "zustand";

type DataStore = {
    data: any[];
    setData: (data: any[]) => void;
}


const useDataStore = create<any>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export default useDataStore;
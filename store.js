import { create } from "zustand";



const homePageStore = (set) => ({
  resultsRaw: [],
  setResultsRaw: (resultsRaw) => set({ resultsRaw }),
  results: [],
//   setResults should sort the results by the current sortBy and sortOrder
  setResults: (results) => set({ results }),
  showBanner: true,
  setShowBanner: (showBanner) => set({ showBanner }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  foilOnly: false,
  setFoilOnly: (foilOnly) => set({ foilOnly }),
  conditions: {
    nm: true,
    lp: true,
    pl: true,
    mp: true,
    hp: true,
    dmg: true,
    scan: true,
  },
  // set conditions, then filter
  setConditions: (conditions) => {
    set({ conditions });
  },
  // sortBy can be one of price, name, condition, set, website
  sortBy: "price",
  setSortBy: (sortBy) => set({ sortBy }),
  sortOrder: "asc",
  setSortOrder: (sortOrder) => set({ sortOrder }),
  showFilters: false,
  setShowFilters: (showFilters) => set({ showFilters }),
});

const useHomePageStore = create(homePageStore);
export default function useStore() {
  return { useHomePageStore };
}

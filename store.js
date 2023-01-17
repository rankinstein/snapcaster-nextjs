import { create } from "zustand";

const websites = [
  {
      name: 'Aether Vault Games',
      code: 'aethervault',
  },
  {
      name: 'Atlas Collectables',
      code: 'atlas',
  },
  {
      name: 'Border City Games',
      code: 'bordercity',
  },
  {
      name: 'The Connection Games',
      code: 'connectiongames',
  },
  {
      name: 'Everything Games',
      code: 'everythinggames',
  },
  {
      name: 'Exor Games',
      code: 'exorgames',
  },
  {
      name: 'Face to Face Games',
      code: 'facetoface',
  },
  {
      name: 'Fantasy Forged Games',
      code: 'fantasyforged',
  },
  {
      name: 'FirstPlayer',
      code: 'firstplayer',
  },
  {
      name: '401 Games',
      code: 'four01',
  },
  {
      name: 'Fusion Gaming',
      code: 'fusiongaming',
  },
  {
      name: 'GameKnight',
      code: 'gameknight',
  },
  {
      name: 'Gamezilla',
      code: 'gamezilla',
  },
  {
      name: 'Gauntlet Games',
      code: 'gauntlet',
  },
  {
      name: 'Hairy Tarantula',
      code: 'hairyt',
  },
  {
      name: 'House of Cards',
      code: 'houseofcards',
  },
  {
      name: 'Jeux 3 Dragons',
      code: 'jeux3dragons',
  },
  {
      name: 'Manaforce',
      code: 'manaforce',
  },
  {
      name: 'Magic Stronghold',
      code: 'magicstronghold',
  },
  {
      name: 'Orchard City Games',
      code: 'orchardcity',
  },
  {
      name: 'Sequence Gaming Brockville',
      code: 'sequencegaming',
  },
  {
      name: 'Topdeck Hero',
      code: 'topdeckhero',
  },
  {
      name: 'Wizard\'s Tower (kanatacg)',
      code: 'wizardstower',
  },

]

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

const multiSearchStore = (set) => ({
  resultsRaw: [],
  setResultsRaw: (resultsRaw) => set({ resultsRaw }),
  results: [],
  setResults: (results) => set({ results }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  cardNames: [],
  setCardNames: (cardNames) => set({ cardNames }),
  websites: {
    aethervault: true,
    atlas: true,
    bordercity: true,
    connectiongames: true,
    everythinggames: true,
    exorgames: true,
    facetoface: true,
    fantasyforged: true,
    firstplayer: true,
    four01: true,
    fusiongaming: true,
    gameknight: true,
    gamezilla: true,
    gauntlet: true,
    hairyt: true,
    houseofcards: true,
    jeux3dragons: true,
    manaforce: true,
    magicstronghold: true,
    orchardcity: true,
    sequencegaming: true,
    topdeckhero: true,
    wizardstower: true, 
  },
  setWebsites: (websites) => set({ websites }),
});

const useHomePageStore = create(homePageStore);
const useMultiSearchStore = create(multiSearchStore);
export default function useStore() {
  return { useHomePageStore, useMultiSearchStore };
}

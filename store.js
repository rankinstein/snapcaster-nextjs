import { create } from "zustand";
import axios from "axios";

const websites = [
  {
    name: "Aether Vault Games",
    code: "aethervault",
  },
  {
    name: "Atlas Collectables",
    code: "atlas",
  },
  {
    name: "Border City Games",
    code: "bordercity",
  },
  {
    name: "The Connection Games",
    code: "connectiongames",
  },
  {
    name: "Everything Games",
    code: "everythinggames",
  },
  {
    name: "Exor Games",
    code: "exorgames",
  },
  {
    name: "Face to Face Games",
    code: "facetoface",
  },
  {
    name: "Fantasy Forged Games",
    code: "fantasyforged",
  },
  {
    name: "FirstPlayer",
    code: "firstplayer",
  },
  {
    name: "401 Games",
    code: "four01",
  },
  {
    name: "Fusion Gaming",
    code: "fusiongaming",
  },
  {
    name: "GameKnight",
    code: "gameknight",
  },
  {
    name: "Gamezilla",
    code: "gamezilla",
  },
  {
    name: "Gauntlet Games",
    code: "gauntlet",
  },
  {
    name: "Hairy Tarantula",
    code: "hairyt",
  },
  {
    name: "House of Cards",
    code: "houseofcards",
  },
  {
    name: "Jeux 3 Dragons",
    code: "jeux3dragons",
  },
  {
    name: "Manaforce",
    code: "manaforce",
  },
  {
    name: "Magic Stronghold",
    code: "magicstronghold",
  },
  {
    name: "Orchard City Games",
    code: "orchardcity",
  },
  {
    name: "Sequence Gaming Brockville",
    code: "sequencegaming",
  },
  {
    name: "Topdeck Hero",
    code: "topdeckhero",
  },
  {
    name: "Wizard's Tower (kanatacg)",
    code: "wizardstower",
  },
];

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

const multiSearchStore = (set, get) => ({
  // a state that can either be for the search page or the results page
  mode: "search",
  // if mode is search, set mode to results
  // if mode is results, set mode to search
  toggleMode: () => {
    console.log("toggleMode");
    set((state) => {
      if (state.mode === "search") {
        return { mode: "results" };
      } else {
        return { mode: "search" };
      }
    });
  },
  updateSelectedVariant: (card, variant) => {
    // 1. find "card" in results
    // 2. in card.variants, find variant
    // 3. set card.selectedVariant to variant in the results array
    set((state) => {
      const results = state.results.map((result) => {
        if (result.cardName.toLowerCase() === card.cardName.toLowerCase()) {
          result.selectedVariant = variant;
        }
        return result;
      });
      return { results };
    });
    get().calculateTotalCost();
  },

  // total cost of all cards in results that have selected: true
  totalCost: 0,
  setTotalCost: (totalCost) => set({ totalCost }),
  calculateTotalCost: () => {
    set((state) => {
      let totalCost = 0;
      state.results.forEach((result) => {
        if (result.selected) {
          totalCost += parseFloat(result.selectedVariant.price);
        }
      });
      return { totalCost };
    });
  },

  sortVariants: (card, sortBy) => {
    const conditionRanking = {
      nm: 0,
      lp: 1,
      pl: 2,
      mp: 3,
      hp: 4,
      dmg: 5,
      scan: 6,
    };

    set((state) => {
      const results = state.results.map((result) => {
        if (result.name === card.name) {
          // order selectedVariant by sortBy
          result.variants.sort((a, b) => {
            if (sortBy === "price") {
              if (a.price < b.price) {
                return -1;
              } else if (a.price > b.price) {
                return 1;
              } else {
                return 0;
              }
            } else if (sortBy === "condition") {
              if (
                conditionRanking[a.condition.toLowerCase()] <
                conditionRanking[b.condition.toLowerCase()]
              ) {
                return -1;
              } else if (
                conditionRanking[a.condition.toLowerCase()] >
                conditionRanking[b.condition.toLowerCase()]
              ) {
                return 1;
              }
            } else if (sortBy === "website") {
              if (a.website < b.website) {
                return -1;
              } else if (a.website > b.website) {
                return 1;
              }
            }
          });
          return result;
        } else {
          return result;
        }
      });
      return { results };
    });
  },

  handleSubmit: (e) => {
    set({ loading: true });
    console.log("handleSubmit");
    axios
      .post("api/multisearch/", {
        cardNames: ["Lightning Bolt"],
        websites: ["aethervault", "atlas"],
        worstCondition: "NM",
      })
      .then((res) => {
        set({ resultsRaw: res.data });
        set((state) => {
          if (state.mode === "search") {
            return { mode: "results" };
          } else {
            return { mode: "search" };
          }
        });
        set({ loading: false });
        set((state) => {
          const results = state.resultsRaw.map((result) => {
            // order selectedVariant by price
            result.variants.sort((a, b) => {
              if (a.price < b.price) {
                return -1;
              } else if (a.price > b.price) {
                return 1;
              } else {
                return 0;
              }
            });
            // selectedVariant is the cheapest variant
            const selectedVariant = result.variants[0];
            return { ...result, selectedVariant, selected: true };
          });
          return { results };
        });
        get().calculateTotalCost();
      });
  },
  toggleSelectCard: (card) => {
    set((state) => {
      const results = state.results.map((result) => {
        if (result.cardName === card.cardName) {
          return { ...result, selected: !result.selected };
        } else {
          return result;
        }
      });
      return { results };
    });
    get().calculateTotalCost();
  },
  websiteCodeMap: websites,
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resultsRaw: [],
  setResultsRaw: (resultsRaw) => {
    set({ resultsRaw });
    // results is the same as resultsRaw except for each results, we add the "selectedVariant" field, set this to the first variant
    set((state) => {
      const results = state.resultsRaw.map((result) => {
        const selectedVariant = result.variants[0];
        return { ...result, selectedVariant };
      });
      return { results };
    });
  },
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

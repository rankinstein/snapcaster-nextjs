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
    name: "Enter the Battlefield",
    code: "enterthebattlefield",
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
    code: "fusion",
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
    code: "kanatacg",
  },
];

const appStore = (set) => ({
  // app wide state
  mobileMenuOpen: false,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  test: () => console.log("test"),
});

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
  handleSelectAll: () => {
    set((state) => {
      // if all true already, set all to false
      // if any false, set all to true
      let allSelected = true;
      state.results.forEach((result) => {
        if (!result.selected) {
          allSelected = false;
        }
      }
      );
      const results = state.results.map((result) => {
        result.selected = !allSelected;
        return result;
      }
      );
      return { results };

    });
    get().calculateTotalCost();
  },
  handleSubmit: (e) => {
    set({ loading: true });
    // separate all the cards by newlines in the searchQuery
    const cardNames = get().searchQuery
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .filter((line, index, self) => self.indexOf(line) === index)
    // replace quanitty numbers infront
    .map(line => line.replace(/^\d+\s*/, ''))
    .map(line => line.replace(/^\d+x\s*/, ''))
    .map(line => line.replace(/’/g, "'"))
    // if there are any single slashes like " / ", we'll replace them with " // "
    .map(line => line.replace(/ \/ /g, ' // '))
    // strip "*F*" off any lines that have it
    .map(line => line.replace(/\*F\*/g, ''))
    // strip each line
    .map(line => line.trim())
    .filter(line => line !== 'Sideboard')
    .filter(line => line !== 'Deck');
    // remove empty strings and strip whitespace
    cardNames.forEach((cardName, index) => {
      cardNames[index] = cardName.trim();
    });

    cardNames.filter((cardName) => cardName !== "");

    // we have an object, get().websites, that has the websites as keys and true/false as values
    // we want an array of websites that are true
    // array = ["houseofcards", "cardkingdom" ...]

    let websiteArray = []
    for (const [key, value] of Object.entries(get().websites)) {
      if (value) {
        websiteArray.push(key)
      }
    }


    axios
      .post("http://localhost:8000/search/bulk/", {
        cardNames: cardNames,
        websites: websiteArray,
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

        // if there is a cardName in cardNames that is not in results, add it to missingCards
        // we need to compare them without symbols or punctuation
        set((state) => {
          let missingCards = cardNames.filter(
            (cardName) =>
              !state.resultsRaw.some(
                (result) =>
                  result.cardName.toLowerCase().replace(/[^a-z0-9]/gi, "") === cardName.toLowerCase().replace(/[^a-z0-9]/gi, "") 
              )
          );
              // remove any empty strings
              missingCards = missingCards.filter((missingCard) => missingCard !== "");
          return { missingCards };
        });
      });
  },
  numResults: 0,
  setNumSelectedCards: (numSelectedCards) => set({ numSelectedCards }),
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
  getWebsiteName: (websiteCode) => {
    console.log("fetching website name for code: " + websiteCode);
    let websiteCodeMap = get().websiteCodeMap;
    console.log("iterating through websiteCodeMap");
    for (let website in websiteCodeMap) {
      console.log("website is " + website.name);
    }
    let result = get().websiteCodeMap[websiteCode];
    console.log("results is " + result);
    return result;
  },
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
    enterthebattlefield: true,
    everythinggames: true,
    exorgames: true,
    facetoface: true,
    fantasyforged: true,
    firstplayer: true,
    four01: true,
    fusion: true,
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
    kanatacg: true,
  },
  setWebsites: (websites) => set({ websites }),
  missingCards: [],
  setMissingCards: (missingCards) => set({ missingCards }),
  resetStore: () => {
    set({ resultsRaw: [] });
    set({ results: [] });
    set({ loading: false });
    set({ cardNames: [] });
    set({ missingCards: [] });
    set({ mode: "search" });
    set({ numSelectedCards: 0 });
    set({ totalCost: 0 });
  }
});

const useHomePageStore = create(homePageStore);
const useMultiSearchStore = create(multiSearchStore);
const useAppStore = create(appStore);
export default function useStore() {
  return { useHomePageStore, useMultiSearchStore, useAppStore };
}

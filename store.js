import { create } from "zustand";
import axios from "axios";
const API_URI = process.env.NEXT_PUBLIC_API_URI;

const websiteLogos = {
  gauntlet:
    "http://cc-client-assets.s3.amazonaws.com/store/gauntletgamesvictoria/7c8176e703db451bad3277bb6d4b8631/medium/Transparent_logo.png",
  houseOfCards: "https://i.ibb.co/qnytc5Q/house-of-cards-logo.png",
  kanatacg: "https://i.ibb.co/hm3qKWc/wizardstower-removebg-preview.png",
  fusion: "https://i.ibb.co/GkKmry9/fusiongaminglogo.png",
  four01: "https://i.ibb.co/h9x3Ksb/401games.png",
  everythinggames:
    "https://cdn.shopify.com/s/files/1/0618/8905/2856/files/Header_76747500-dd40-4d94-8016-a1d21282e094_large.png?v=1650298823",
  magicstronghold:
    "https://magicstronghold-images.s3.amazonaws.com/customizations/logo.png",
  facetoface: "https://i.ibb.co/W2bPWdK/logo-colored-1.png",
  connectiongames: "https://i.ibb.co/Qp1kqrB/connectiongames-inverted.png",
  topdeckhero:
    "https://d1rw89lz12ur5s.cloudfront.net/store/topdeckhero/1fdf9e60cbd911e7aefa7116e0c551f9/large/topdeckhero.png",
  jeux3dragons:
    "https://d1rw89lz12ur5s.cloudfront.net/store/jeux3dragons/ef00baaca6ad43cfb51939c1af74c2c7/large/logo.png",
  sequencegaming: "https://i.ibb.co/C2jXrmD/sequence-no-bg-inverted.png",
  atlas:
    "https://d1rw89lz12ur5s.cloudfront.net/store/atlascollectables/a9e1fed8d2d549cba92c6406b18f8969/large/logo-v2-small-v2.png",
  hairyt:
    "https://cdn.shopify.com/s/files/1/0266/9513/9533/files/hariyt-horizontal-logo.png?v=1615403256",
  gamezilla:
    "https://cdn.shopify.com/s/files/1/0570/6308/0145/files/Screen_Shot_2018-09-07_at_1.02.57_PM_copy_141x.png?v=1626814255",
  exorgames:
    "https://cdn.shopify.com/s/files/1/0467/3083/8169/files/Untitled-2-01.png?v=1613706669",
  gameknight:
    "https://cdn.shopify.com/s/files/1/0367/8204/7276/files/GK-Logo-Full-Text-Below-1-768x603.png?v=1618430878",
  enterthebattlefield: "https://i.ibb.co/hdnH9fY/enterthebattlefield.png",
  manaforce:
    "https://d1rw89lz12ur5s.cloudfront.net/store/manaforce/e58b802e2e334d17aacfbf9954a5400e/large/manaforce%20logo%20attempt%204.png",
  firstplayer:
    "https://d1rw89lz12ur5s.cloudfront.net/store/firstplayer/ab9075a71d2949aa8dd1e032f54cf7d8/large/g901%20medium.png",
  orchardcity:
    "https://d1rw89lz12ur5s.cloudfront.net/store/orchardcitygames/eb6cb32f84b34b5cbb1c025fc41c9821/large/logo_v1.png",
  bordercity:
    "https://i.ibb.co/cvNCbXx/Border-City-Games-Large-85873391-3559-47f7-939a-420461a0033f-201x-removebg-preview.png",
  aethervault:
    "https://d1rw89lz12ur5s.cloudfront.net/store/aethervaultgames/baa99644755e44c2a11d7bc20494e7b0/large/AetherVaultGames.png",
  thecomichunter:
    "https://d1rw89lz12ur5s.cloudfront.net/store/comichunter/77344716f796416590aa7e3ec91af534/large/ComicHunter.png",
  fantasyforged:
    "https://i.ibb.co/2YNj4BG/fantasyforged.png"
};

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
    name: "The Comic Hunter",
    code: "thecomichunter"
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
  autoCompleteResults: [],
  showAutoComplete: false,
  setShowAutoComplete: (showAutoComplete) => set({ showAutoComplete }),
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
  searchedQuery: "",
  setSearchedQuery: (searchedQuery) => set({ searchedQuery }),
  setOnlySearchQuery: (searchQuery) => set({ searchQuery }),
  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    // if the searchQuery is longer than 3 and an odd number of characters, send a request to scryfall
    if (
      searchQuery.length < 17 &&
      searchQuery.length > 2 &&
      searchQuery.length % 2 === 1
    ) {
      // if the axios request was sent in the last 500ms, cancel it
      // if (cancelToken) {
      //   cancelToken.cancel();
      // }
      axios
        .get(`https://api.scryfall.com/cards/autocomplete?q=${searchQuery}`)
        .then((res) => {
          // set autoCompleteResults to the first 5 items in res.data.data
          set({ autoCompleteResults: res.data.data.slice(0, 5) });
          set({ showAutoComplete: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (searchQuery.length < 3) {
      set({ showAutoComplete: false });
    }
  },
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

  //
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
      });
      const results = state.results.map((result) => {
        result.selected = !allSelected;
        return result;
      });
      return { results };
    });
    get().calculateTotalCost();
  },
  handleSubmit: (e) => {
    set({ loading: true });
    // separate all the cards by newlines in the searchQuery
    const cardNames = get()
      .searchQuery.split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .filter((line, index, self) => self.indexOf(line) === index)
      // remove anything inside parentheses
      .map((line) => line.split("(")[0].trim())
      .map((line) => line.replace(/\(.*?\)/g, ""))
      // replace quanitty numbers infront
      .map((line) => line.replace(/^\d+\s*/, ""))
      .map((line) => line.replace(/^\d+x\s*/, ""))
      .map((line) => line.replace(/’/g, "'"))
      // if there are any single slashes like " / ", we'll replace them with " // "
      .map((line) => line.replace(/ \/ /g, " // "))
      // strip "*F*" off any lines that have it
      .map((line) => line.replace(/\*F\*/g, ""))
      // strip each line
      .map((line) => line.trim())
      .filter((line) => line !== "Sideboard")
      .filter((line) => line !== "Deck");
    // remove empty strings and strip whitespace
    cardNames.forEach((cardName, index) => {
      cardNames[index] = cardName.trim();
    });

    cardNames.filter((cardName) => cardName !== "");

    // we have an object, get().websites, that has the websites as keys and true/false as values
    // we want an array of websites that are true
    // array = ["houseofcards", "cardkingdom" ...]

    let websiteArray = [];
    for (const [key, value] of Object.entries(get().websites)) {
      if (value) {
        websiteArray.push(key);
      }
    }

    axios
      .post(`${API_URI}/search/bulk/`, {
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
        // # Remove any text in brackets, and the brackets themselves
        // cardNames = [re.sub(r"^\d+\s*", "", cardName).strip() for cardName in cardNames]
        // cardNames = [re.sub(r"\s*\([^)]*\)", "", cardName).strip() for cardName in cardNames]
        // # remove any numbers from the end of the card name
        // cardNames = [re.sub(r"\s*\d+$", "", cardName).strip() for cardName in cardNames]
        // If there is a bracket ')' in the card name, remove everything after it
        let cleanCardNames = cardNames.map((cardName) =>
          cardName.split(")")[0].trim()
        );
        cleanCardNames = cardNames.map((cardName) =>
          cardName
            .replace(/\s*\([^)]*\)/, "")
            .replace(/\s*\d+$/, "")
            .trim()
            .toLowerCase()
        );

        set((state) => {
          let missingCards = cleanCardNames.filter(
            (cardName) =>
              !state.resultsRaw.some(
                (result) =>
                  // remove any numbers at the end of the card name
                  // remove any brackets and
                  result.cardName.toLowerCase().replace(/[^a-z0-9]/gi, "") ===
                  cardName.toLowerCase().replace(/[^a-z0-9]/gi, "")
              )
          );
          // remove any empty strings
          missingCards = missingCards.filter(
            (missingCard) => missingCard !== ""
          );
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
    thecomichunter: true,
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
  },
});

const sealedSearchStore = (set, get) => ({
  searchQuery: "",
  searchedQuery: "",
  resultsRaw: [],
  results: [],
  loading: false,
  websites: ["all"],
  showAutoComplete: true,
  autoCompleteResults: [],
  showBanner: true,
  websiteLogos: websiteLogos,
  sortOrder: "asc",
  sortBy: "price",
  filterTags: [
    {
      name: "pack",
      displayName: "Pack",
      selected: true,
    },
    {
      name: "draft",
      displayName: "Draft",
      selected: true,
    },
    {
      name: "jumpstart",
      displayName: "Jumpstart",
      selected: true,
    },
    {
      name: "set",
      displayName: "Set",
      selected: true,
    },
    {
      name: "collector",
      displayName: "Collector",
      selected: true,
    },
    {
      name: "bundle",
      displayName: "Bundle",
      selected: true,
    },
    {
      name: "box",
      displayName: "Box",
      selected: true,
    },
  ],

  filterResults: () => {
    set((state) => {
      let filteredResults = state.resultsRaw;
      let selectedTags = state.filterTags.filter((tag) => tag.selected);
      if (selectedTags.length > 0) {
        filteredResults = state.resultsRaw.filter((result) =>
          selectedTags.some((tag) => result.tags.includes(tag.name))
        );
      }
      return { results: filteredResults };
    });
  },
  
  toggleFilterTag: (tag) => {
    // toggle the selected field of the tag
    // update the selectedTags array
    set((state) => {
      const filterTags = state.filterTags.map((filterTag) => {
        if (filterTag.name === tag.name) {
          return { ...filterTag, selected: !filterTag.selected };
        } else {
          return filterTag;
        }
      });
      return { filterTags };
    }
    );
    get().filterResults();
  },
  sortResults: () => {
    set((state) => {
      let sortBy = get().sortBy;
      let sortOrder = get().sortOrder;
      if (sortBy === "price") {
        get().setResults(
          get().results.sort((a, b) => {
            if (sortOrder === "asc") {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          })
        );
      } else if (sortBy === "website") {
        get().setResults(
          get().results.sort((a, b) => {
            if (sortOrder === "asc") {
              return a.website.localeCompare(b.website);
            } else {
              return b.website.localeCompare(a.website);
            }
          })
        );
      }
    });
  },



  setSortBy: (sortBy) => {
    set({ sortBy });
    // either price or website. Sort results by price or website
    let sortOrder = get().sortOrder;
    if (sortBy === "price") {
      get().setResults(
        get().results.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
      );
    } else if (sortBy === "website") {
      get().setResults(
        get().results.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.website.localeCompare(b.website);
          } else {
            return b.website.localeCompare(a.website);
          }
        })
      );
    }
  },

  setSortOrder: (sortOrder) => {
    set({ sortOrder });
    // either asc or desc
    let sortBy = get().sortBy;
    if (sortBy === "price") {
      get().setResults(
        get().results.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
      );
    } else if (sortBy === "website") {
      get().setResults(
        get().results.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.website.localeCompare(b.website);
          } else {
            return b.website.localeCompare(a.website);
          }
        })
      );
    }
  },

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
    if (searchQuery.length > 1) {
      get().fetchAutoCompleteResults(searchQuery);
      set({ showAutoComplete: true });
    } else {
      set({ showAutoComplete: false });
    }
  },
  setOnlySearchQuery: (searchQuery) => {
    set({ searchQuery });
  },
  fetchAutoCompleteResults: (searchQuery) => {
    axios
      // https://snapcasterv2-api-production.up.railway.app/search/bulk/
      .get(
        `${API_URI}/utils/autocomplete/${searchQuery}/`
      )
      .then((res) => {
        set({ autoCompleteResults: res.data.slice(0, 5) });
      });
  },
  setResultsRaw: (resultsRaw) => {
    set({ resultsRaw });
  },
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
  setWebsites: (websites) => set({ websites }),
  setShowAutoComplete: (showAutoComplete) => set({ showAutoComplete }),
  setShowBanner: (showBanner) => set({ showBanner }),

  handleSubmit: (e) => {
    e.preventDefault();
    set({ loading: true });
    set({ showAutoComplete: false });
    axios
      .post(`${API_URI}/search/sealed/`, {
        setName: get().searchQuery,
        websites: get().websites,
      })
      .then((res) => {
        set({
          resultsRaw: res.data.sort((a, b) => (a.price > b.price ? 1 : -1)),
        });
        set({ results: get().resultsRaw });
        set({ loading: false });
        set({ searchedQuery: get().searchQuery });
        set({ showAutoComplete: false });
        set({ showBanner: false });
      });
  },
});

const useHomePageStore = create(homePageStore);
const useMultiSearchStore = create(multiSearchStore);
const useAppStore = create(appStore);
const useSealedSearchStore = create(sealedSearchStore);
export default function useStore() {
  return {
    useHomePageStore,
    useMultiSearchStore,
    useAppStore,
    useSealedSearchStore,
  };
}

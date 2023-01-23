import React from "react";
import useStore from "@/store";
export default function SearchFilters() {
  const { useHomePageStore } = useStore();
  const store = useHomePageStore();
  const conditionCheckboxes = [
    // checkbox should have a label, and a reference to the store value
    { label: "NM", value: store.conditions.nm },
    { label: "LP", value: store.conditions.lp },
    { label: "PL", value: store.conditions.pl },
    { label: "MP", value: store.conditions.mp },
    { label: "HP", value: store.conditions.hp },
    { label: "DMG", value: store.conditions.dmg },
    { label: "SCAN", value: store.conditions.scan },
  ];

  const applyFilters = (store) => {
    // get raw results
    // filter out by condition
    let filteredResults = store.resultsRaw.filter((card) => {
      // if the card condition is in the store conditions object, return true
      return store.conditions[card.condition.toLowerCase()];
    });
    // filter out by foil
    if (store.foilOnly) {
      filteredResults = filteredResults.filter((card) => {
        return card.foil;
      });
    }

    // sort by
    let sortedResults = filteredResults.sort((a, b) => {
      if (store.sortBy === "price") {
        return a.price - b.price;
      } else if (store.sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (store.sortBy === "set") {
        return a.set.localeCompare(b.set);
      } else if (store.sortBy === "website") {
        return a.website.localeCompare(b.website);
      }
    });

    // reverse if descending
    if (store.sortOrder === "desc") {
      sortedResults = sortedResults.reverse();
    }

    store.setResults(sortedResults);
    console.log("sorted results: ", sortedResults);
  };

  const resetFilters = (store) => {
    store.setConditions({
      nm: true,
      lp: true,
      pl: true,
      mp: true,
      hp: true,
      dmg: true,
      scan: true,
    });
    store.setFoilOnly(false);
    store.setSortBy("price");
    store.setSortOrder("asc");
    store.setResults(store.resultsRaw);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-2">
      {/* div for filters should always render but not be visible unless showFilters is true */}
      <div
        className={`transition-all flex flex-col justify-center items-center w-full ${
          store.showFilters ? "opacity-100 h-80" : "opacity-0 h-0"
        } bg-gray-300 dark:bg-gray-800 shadow-md rounded-sm`}
      >
        {store.showFilters && (
          <>
            {/* selector for sort by */}
            <div className="flex flex-row justify-between items-center p-2">
              <div className="flex flex-row justify-between items-center p-2">
                <label className="text-sm mr-2">Sort By</label>
                <select
                  className="p-1 rounded-md text-sm"
                  onChange={(e) => {
                    store.setSortBy(e.target.value);
                  }}
                >
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="set">Set</option>
                  <option value="website">Website</option>
                </select>
              </div>
              <div>
                <select
                  className="p-1 rounded-md text-sm"
                  onChange={(e) => {
                    store.setSortOrder(e.target.value);
                  }}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            {/* foil only toggle */}
            <div className="flex flex-row justify-between items-center p-2">
              <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Foil only
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={store.foilOnly}
                  onChange={() => {
                    store.setFoilOnly(!store.foilOnly);
                  }}
                />
                <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="text-sm font-bold mt-2">Condition</div>
            {/* two columns for condition checkboxes */}
            <div className="grid grid-cols-2 py-4 max-w-md gap-x-10">
              {/* map checkboxes */}
              {conditionCheckboxes.map((checkbox, index) => (
                <div
                  key={index}
                  className="col-span-1 flex flex-row justify-between text-left items-center w-full"
                >
                  <label className="text-sm mr-1">
                    {checkbox.label}
                  </label>
                  <input
                    type="checkbox"
                    className="text-sm accent-purple-300"
                    checked={checkbox.value}
                    onChange={() => {
                      store.setConditions({
                        ...store.conditions,
                        [checkbox.label.toLowerCase()]: !checkbox.value,
                      });
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-row space-x-2">
              <button
                className="transition-all outline outline-2 -outline-offset-2 outline-purple-500 hover:bg-purple-500 hover:bg-opacity-50 font-bold py-2 px-4 rounded focus:outline-purple-900 focus:shadow-outline mt-4 mx-auto"
                onClick={() => {
                  resetFilters(store);
                }}
              >
                Clear
              </button>

              <button
                className="transition-all bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-purple-900 focus:shadow-outline mt-4 mx-auto"
                onClick={() => {
                  console.log("Apply Filter");
                  console.log("store.conditions", store.conditions);
                  applyFilters(store);
                }}
              >
                Apply
              </button>
            </div>
          </>
        )}
      </div>

      <button
        className="text-sm"
        onClick={() => {
          store.setShowFilters(!store.showFilters);
          console.log("clicked");
        }}
      >
        {store.showFilters ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  );
}

import React from "react";
import useStore from "@/store";

export default function searchfilters() {
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

  return (
    <div className="flex flex-col justify-center items-center w-full p-2">
      {/* div for filters should always render but not be visible unless showFilters is true */}
      <div
        className={`transition-all flex flex-col justify-center items-center w-full ${
          store.showFilters ? "opacity-100 h-72" : "opacity-0 h-0"
        } bg-gradient-to-b from-gray-900 to-slate-800 shadow-md rounded-sm`}
      >
        {store.showFilters && (
          <>
            {/* selector for sort by */}
            <div className="flex flex-row justify-between items-center p-2">
              <div className="flex flex-row justify-between items-center p-2">
                <label className="text-gray-400 text-sm mr-2">Sort By</label>
                <select
                  className="p-1 rounded-md text-white text-sm"
                  onChange={(e) => {
                    store.setSortBy(e.target.value);
                  }}
                >
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="condition">Condition</option>
                  <option value="set">Set</option>
                  <option value="website">Website</option>
                </select>
              </div>
              <div>
                <select
                  className="p-1 rounded-md text-white text-sm"
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
                  <label className="text-gray-400 text-sm mr-1">
                    {checkbox.label}
                  </label>
                  <input
                    type="checkbox"
                    className="text-gray-400 text-sm accent-purple-300"
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

            <button
              className="bg-gray-900 p-1 px-3 m-2 rounded-md text-white text-sm"
              onClick={() => {
                console.log("Apply Filter");
              }}
            >
              Apply
            </button>
          </>
        )}
      </div>

      <button
        className="text-gray-400 text-sm"
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

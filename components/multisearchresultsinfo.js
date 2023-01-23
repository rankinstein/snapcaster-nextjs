import React from "react";
import useStore from "@/store";

export default function MultiSearchResultsInfo() {
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 rounded-sm">
      <div className="flex flex-col justify-center items-center h-full">
        {/* Buttons */}
        <div className="flex flex-row justify-center space-x-2 mb-2">
          {/* reset button */}
          <div className="flex justify-center">
            <button
              className="transition-all outline outline-2 -outline-offset-2 outline-purple-500 hover:bg-purple-500 hover:bg-opacity-50 font-bold px-2 py-1 rounded focus:outline-purple-900 focus:shadow-outline mt-4 mx-auto text-sm"
              type="button"
              onClick={() => store.resetStore()}
            >
              Reset
            </button>
          </div>

        </div>

        {/* Missing Cards */}
        {store.missingCards.length > 0 && (
          <div className="justify-center w-full">
            <div className="bg-gray-300 dark:bg-gray-800 rounded-md p-3 flex flex-col space-y-1 max-w-sm mx-auto mb-2">
              <div className="text-center">
                No results found for
              </div>

              {store.missingCards.map((card, index) => (
                <div key={index} className="">
                  <div>{card}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-row space-x-2 justify-center items-center">
          {/* Total cost of selected cards */}
          <div className=" font-bold text-xl">
            ${store.totalCost.toFixed(2)}{" - "}
          </div>
          {/* Num Selected Cards */}
          <div className="">
            {store.results.filter((card) => card.selected === true).length} of{" "}
            {store.results.length} cards selected
          </div>
        </div>
        <div className="flex justify-center mb-2">
            <button
              className="transition-all bg-purple-600 hover:bg-purple-700 text-white font-bold px-2 py-1 rounded focus:outline-purple-900 focus:shadow-outline mt-4 mx-auto text-sm"
              type="button"
              onClick={() => store.handleSelectAll()}
            >
              Select All
            </button>
          </div>
      </div>
    </div>
  );
}

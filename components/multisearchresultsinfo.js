import React from "react";
import useStore from "@/store";

export default function MultiSearchResultsInfo() {
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();
  return (
    <div className="w-full bg-gray-800 rounded-sm p-4">
      <div className="flex flex-col justify-center items-center h-full">
        {/* Found 2/4 Cards
        0/2 Selected
        Total cost of selected */}
        {store.missingCards.length > 0 && (
          <div className="justify-center w-full">
            <div className="bg-gray-900 rounded-md text-gray-400 p-3 flex flex-col space-y-1 max-w-sm mx-auto mb-2">
            <div className="text-white text-center">No results found for</div>

              {store.missingCards.map((card, index) => (
                <div key={index} className="">
                  <div>{card}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="text-white">
          {store.results.filter((card) => card.selected === true).length}/
          {store.results.length} cards selected
        </div>
        <button className="transition-all bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 mx-auto" type="button" onClick={() => store.handleSelectAll()}>
          Select All
        </button>

        <div className="text-white font-bold mt-2 text-xl">Total: ${store.totalCost.toFixed(2)}</div>
      </div>
    </div>
  );
}

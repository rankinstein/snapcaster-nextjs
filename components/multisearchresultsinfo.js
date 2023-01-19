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
            <div className="text-white text-center">No results found for</div>
            <div className="bg-gray-900 rounded-md text-gray-400 p-3 flex flex-col space-y-1">
              {store.missingCards.map((card) => (
                <div className="flex flex-row justify-between">
                  <div>{card}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="text-white">
          {store.results.filter((card) => card.selected === true).length}/
          {store.results.length} Cards selected
        </div>
        <div className="text-white">Cost of selected: {store.totalCost}</div>
      </div>
    </div>
  );
}

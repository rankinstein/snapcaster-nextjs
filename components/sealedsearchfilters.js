import React from "react";
import useStore from "@/store";

export default function SealedSearchFilters() {
  const { useSealedSearchStore } = useStore();
  const store = useSealedSearchStore();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center items-center p-2">
        <div className="flex flex-row items-center p-2">
          <label className="text-gray-400 text-sm mr-2">Sort By</label>
          <select
            className="p-1 rounded-md text-white text-sm"
            onChange={(e) => {
              store.setSortBy(e.target.value);
            }}
          >
            <option value="price">Price</option>
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
      {/* Tag selectors */}
      <div className="flex flex-row justify-center items-center p-2 space-x-2">
        {store.filterTags.map((tag, index) => {
          return (
            // if tag.selected, baground is purple, otherwise it's gray
            <div key={index}
                className={`transition-all flex flex-row justify-center items-center p-2 rounded-md text-white text-sm cursor-pointer hover:bg-purple-500 ${
                    tag.selected ? "bg-purple-700" : "bg-gray-700"
                }`}

                onClick={() => {
                  console.log("filtering for tag " + tag.displayName)
                    store.toggleFilterTag(tag);
                }}
            >
              {tag.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
}

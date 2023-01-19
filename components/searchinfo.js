import React from "react";
import useStore from "@/store";

export default function Searchinfo() {
  const { useHomePageStore } = useStore();
  const store = useHomePageStore();
  const { resultsRaw, results, searchQuery } = store;

  return (
    <div className="flex flex-col justify-center items-center w-full p-2">
      { resultsRaw.length != results.length ? (
        <p className="text-sm text-white">
          Displaying {results.length} of {resultsRaw.length} results for &quot;{searchQuery}&quot;
        </p>
      ) : (
        <p className="text-sm text-white">
          {results.length} results for &quot;{searchQuery}&quot;
        </p>
      )}
    </div>
  );
}

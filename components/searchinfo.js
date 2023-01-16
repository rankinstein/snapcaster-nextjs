import React from "react";
import useStore from "@/store";

export default function Searchinfo() {
  const { useHomePageStore } = useStore();
  const store = useHomePageStore();
  const { resultsRaw, searchQuery } = store;

  return (
    <div className="flex justify-center items-center w-full p-2">
      <p className="text-sm text-white">
        {resultsRaw.length} results for "{searchQuery}"
      </p>
    </div>
  );
}

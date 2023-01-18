import React from "react";
import useStore from "@/store";
import MultiSearchResultsInfo from "@/components/multisearchresultsinfo";
import MultiSearchCard from "@/components/multisearchcard";

export default function MultiSearchResults() {
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();
  return (
    <div>
      <MultiSearchResultsInfo />
      {store.resultsRaw.map((result, index) => {
        return (
          <div key={index}>
            <MultiSearchCard card={result}/>
          </div>
        );
      })}
    </div>
  );
}

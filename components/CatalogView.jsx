import React from "react";
import SearchRow from "./SearchRow";

export default function CatalogView({ cardData }) {
  return (
    <div>
      {cardData.map((cardData, index) => (
        <SearchRow cardData={cardData} key={index} />
      ))}
    </div>
  );
}

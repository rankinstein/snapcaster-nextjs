import React from "react";
import SearchRow from "./SearchRow";

export default function CatalogView({ cardData }) {
  return (
    <div>
      {cardData.map((cardData, index) => (
        <SearchRow cardData={cardData} key={index} />
      ))}
      {/* if cardData is longer than 10, have a back to top button */}
      {cardData.length > 10 && (
        <button
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="btn-small mt-4"
        >
          Back to Top
        </button>
      )}
    </div>
  );
}

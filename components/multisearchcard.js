import React from "react";
import CardVariantSelector from "./cardvariantselector";

export default function MultiSearchCard({ card }) {
  const selectedVariant = card.selectedVariant
  return (
    <div className="p-4 bg-gray-800 hover:bg-gray-700 rounded-md my-2">
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <img
            src={selectedVariant.image}
            alt={selectedVariant.name}
            className="w-24"
          />
          <div>{selectedVariant.name}</div>
        </div>
        <div className="flex flex-col items-center">
          <div>{selectedVariant.price}</div>
          <div>{selectedVariant.condition}</div>
          {selectedVariant.foil && <div>Foil</div>}
          <div>{selectedVariant.website}</div>
          <CardVariantSelector card={card}/>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import CardVariantSelector from "./cardvariantselector";
import useStore from "@/store";


export default function MultiSearchCard({ card }) {
  const { useMultiSearchStore } = useStore()
  const store = useMultiSearchStore()
  const selectedVariant = store.results.find((result) => JSON.stringify(result) === JSON.stringify(card)).selectedVariant
  // const selectedVariant = card.selectedVariant
  return (
    // if card.selected == true change bg color to red
    <div className={card.selected ? "mt-6 p-3 hover:bg-gray-700 rounded-md my-2 outline outline-offset-2 outline-2 outline-purple-900" :"mt-6 p-3 bg-gray-800 hover:bg-gray-700 rounded-md my-2"}
      onClick={() => {
        store.toggleSelectCard(card);
      }}
    >
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

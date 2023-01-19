import React from "react";
import CardVariantSelector from "./cardvariantselector";
import useStore from "@/store";

export default function MultiSearchCard({ card }) {
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();
  const selectedVariant = store.results.find(
    (result) => JSON.stringify(result) === JSON.stringify(card)
  ).selectedVariant;
  // const selectedVariant = card.selectedVariant
  return (
    // if card.selected == true change bg color to red
    <div
      className={
        card.selected
          ? "mt-6 p-3 bg-gray-900 hover:bg-gray-700 rounded-md my-2 outline outline-offset-2 outline-2 outline-purple-900 "
          : "mt-6 p-3 bg-gray-800 hover:bg-gray-700 rounded-md my-2"
      }
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
          <div
            className="text-md font-bold mt-2"
          >{selectedVariant.name}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">${selectedVariant.price}</div>
          <div
            // className={
            //   selectedVariant.condition === "NM"
            //     ? "text-green-500 font-bold text-lg"
            //     : selectedVariant.condition === "LP" ||
            //       selectedVariant.condition === "PL"
            //     ? "text-yellow-500 font-bold text-lg"
            //     : selectedVariant.condition === "MP"
            //     ? "text-orange-500 font-bold text-lg"
            //     : selectedVariant.condition === "HP" ||
            //       selectedVariant.condition === "DMG"
            //     ? "text-red-500 font-bold text-lg"
            //     : "text-white font-bold text-lg"
            // }
            className="text-white font-bold text-lg"
          >
            {selectedVariant.condition}
          </div>
          {selectedVariant.foil && <div 
          // gold foil text
          className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400"
          >Foil</div>}
          <div>
            {
              store.websiteCodeMap.find(
                (website) => website.code === selectedVariant.website
              ).name
            }
          </div>
          <div className="my-auto"/>
          <CardVariantSelector card={card} />
        </div>
      </div>
    </div>
  );
}

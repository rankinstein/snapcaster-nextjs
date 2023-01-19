import React from "react";
import CardVariantSelector from "./cardvariantselector";
import useStore from "@/store";

export default function MultiSearchCard({ card }) {
  const openWesbiteNewTab = (website) => {
    window.open(website, "_blank");
  };
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();
  const selectedVariant = store.results.find(
    (result) => JSON.stringify(result) === JSON.stringify(card)
  ).selectedVariant;

  const fetchWebsiteName = (websiteCode) => {
    let website = store.websiteCodeMap.find(
      (website) => website.code === websiteCode.toLowerCase()
    );
    if (website) {
      return website.name;
    } else {
      return websiteCode;
    }
  };
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
      <div className="grid grid-cols-12 space-x-8">
        <div className="col-span-4 flex flex-col sm:items-center sm:justify-center">
          <img
            src={selectedVariant.image}
            alt={selectedVariant.name}
            className="h-fit rounded-lg"
          />
        </div>
        <div className="col-span-7 flex flex-col text-left">
          <div className="text-md font-bold mt-2">{selectedVariant.name}</div>
          <div className="text-gray-400">
            {
              fetchWebsiteName(
                selectedVariant.website)
            }
          </div>
          <div className="text-xl font-bold">${selectedVariant.price}</div>
          <div className="text-white font-bold text-lg">
            {selectedVariant.condition}
          </div>
          {selectedVariant.foil && (
            <div
              // gold foil text
              className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-400"
            >
              Foil
            </div>
          )}

          <div className="my-auto" />
          {/* <div className="flex flex-col space-y-1">
            <CardVariantSelector card={card} />
            <button
              className="m-2 p-2 rounded-md bg-purple-500 text-sm w-full"
              onClick={() => {
                openWesbiteNewTab(selectedVariant.link);
              }}
            >
              Buy
            </button>
          </div> */}
          <div className="flex-col">
            <CardVariantSelector card={card} />
            <button
              className="m-2 p-2 rounded-md bg-purple-500 w-full text-sm"
              onClick={() => {
                openWesbiteNewTab(selectedVariant.link);
              }}
            >
              Buy
            </button>
          </div>
        </div>
        <div className="col-span-1 flex flex-row items-top justify-end accent-purple-400">
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6 text-purple-600"
            checked={card.selected}
          />
        </div>
        {/* <div className="col-span-4 sm:hidden"></div>
        <div className="col-span-7 sm:hidden">
          <div className="flex flex-col space-y-1">
            <CardVariantSelector card={card} />
            <button
              className="m-2 p-2 rounded-md bg-purple-500 text-sm w-full"
              onClick={() => {
                openWesbiteNewTab(selectedVariant.link);
              }}
            >
              Buy
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

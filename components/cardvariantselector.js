import React, { useState } from "react";
import useStore from "@/store";

export default function CardVariantSelector({ card }) {
  // Basic modal that displays all of card.variants and allows us to update the selectedVariant in the zustand store
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
        className="m-2 p-2 rounded-md bg-purple-500"
      >
        Other results
      </button>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-900 bg-opacity-90 rounded-md p-4">
          <div className="flex flex-row justify-between
          ">
            {/* selector to choose what to sort by */}
            <div className="
              flex flex-row items-center
              mx-4
            ">
              <div className="font-bold font-md text-white">Sort by:</div>
              <select
                className="m-2 p-2 rounded-md bg-slate-700"
                onChange={(e) => {
                  store.sortVariants(card, e.target.value);
                }}
              >
                <option value="price">Price</option>
                <option value="condition">Condition</option>
                <option value="website">Website</option>
                </select>
            </div>
            <div>
            <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="p-2 rounded-md bg-red-500"
              >
                Close
              </button>
              </div>
              </div>

            
            {/* Scrollable overflow, never exceed 70% device height */}
            <div className="max-h-96 overflow-y-scroll m-4">
              <div className="grid grid-cols-1">
                {card.variants.map((variant, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row space-x-2 m-2 p-2 text-center items-center justify-between bg-slate-700 hover:bg-slate-900 rounded"
                      onClick={() => {
                        store.updateSelectedVariant(card, variant);
                        setModalOpen(false);
                      }}
                    >
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-16"
                      />
                      <div>{variant.name}</div>
                      <div>{variant.price}</div>
                      <div>{variant.condition}</div>
                      {variant.foil && <div>Foil</div>}
                      <div>{variant.website}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

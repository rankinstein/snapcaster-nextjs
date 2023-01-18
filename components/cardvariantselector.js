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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-slate-900 rounded-md p-4">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setModalOpen(false);
                }}
                className="p-2 rounded-md bg-red-500"
              >
                Close
              </button>
            </div>
            {/* Scrollable overflow, never exceed 70% device height */}
            <div className="max-h-96 overflow-y-scroll m-4">
              <div className="grid grid-cols-1">
                {card.variants.map((variant, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row space-x-2 m-2 p-2 text-center items-center justify-between bg-slate-700 rounded-sm"
                    >
                      <div>{variant.name}</div>
                      <div>{variant.price}</div>
                      <div>{variant.condition}</div>
                      {variant.foil && <div>Foil</div>}
                      <div>{variant.website}</div>
                      <button
                        onClick={() => {
                          store.updateSelectedVariant(card, variant);
                          setModalOpen(false);
                        }}
                        className="m-2 p-2 rounded-md bg-purple-500"
                      >
                        Select
                      </button>
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

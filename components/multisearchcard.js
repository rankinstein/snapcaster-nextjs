import React from "react";

export default function MultiSearchCard({ card }) {
  const [selectedVariant, setSelectedVariant] = React.useState(
    card.variants[0]
  );
  return (
    <div className="p-4 bg-gray-500 rounded-md my-2">
      <div className="grid grid-cols-3">
        <div className="flex flex-col items-center">
          <img
            src={selectedVariant.image}
            alt={selectedVariant.name}
            className="w-24"
          />
          <div>{selectedVariant.name}</div>
        </div>
        <div className="flex flex-col items-center">
            <button
                onClick={() => {
                    console.log("show modal");
                }}
                className="m-2 p-2 rounded-md bg-purple-500"
            >
                Other results
            </button>
            </div>
            <div className="flex flex-col items-center">
                <div>{selectedVariant.price}</div>
                <div>{selectedVariant.website}</div>
            </div>
      </div>
    </div>
  );
}

import React from "react";


export default function Multisearchbox() {
  
  return (
    <div className="flex w-full justify-center">
      <div className="my-3 w-full">
        <label
          for="multisearchFormControlTextarea1"
          className="font-bold form-label inline-block mb-2 text-white"
        >
          Card to search
        </label>
        <textarea
          className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-200
          bg-slate-700 bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-white focus:bg-slate-800 focus:border-purple-600 focus:outline-none
        "
          id="multisearchFormControlTextarea1"
          rows="10"
          placeholder={`Enter card names, one per line (max 100 lines)
1 Ajani's Chosen
1 Arcane Signet
Dockside Extortionist
Counterspell`}
        ></textarea>
      </div>
    </div>
  );
}

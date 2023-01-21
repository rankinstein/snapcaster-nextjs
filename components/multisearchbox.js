import useStore from "@/store";
export default function Multisearchbox() {
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="mt-3 w-full">
        <label
          htmlFor="multisearchFormControlTextarea1"
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
          value={store.searchQuery}
          onChange={(e) => store.setSearchQuery(e.target.value)}
        ></textarea>
      </div>
      <button
        className="
            bg-purple-600
            hover:bg-purple-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none
            focus:shadow-outline
            mt-4
            mx-auto
          "
        type="button"
        onClick={() => store.handleSubmit()}
      >
        Search
      </button>
    </div>
  );
}

import axios from "axios";
import useStore from "@/store";
export default function Searchbox() {
  const { useHomePageStore } = useStore();
  const store = useHomePageStore();
  const { searchQuery, setSearchQuery } = store;
  const handleSubmit = (e) => {
    store.setLoading(true);
    e.preventDefault();
    console.log("searching for: " + searchQuery);
    axios
      // fetch from vite env variable
      .post(`http://localhost:8000/search/single/`, {
        cardName: searchQuery,
        websites: ["all"],
      })
      .then((res) => {
        console.log(res.data);
        store.setResultsRaw(res.data);
        store.setResults(res.data);
        store.setLoading(false);
        store.setShowBanner(false);
      });
  };

  return (
    <div className="mt-6 w-full">
      <div className="relative">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            className="block w-full px-4 py-2 text-white placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            spellCheck="false"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </form>
      </div>
    </div>
  );
}

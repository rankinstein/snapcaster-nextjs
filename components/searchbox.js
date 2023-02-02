import axios from "axios";
import useStore from "@/store";
import { useCallback, useEffect, useRef, useState } from "react";

const API_URI = process.env.NEXT_PUBLIC_API_URI;

export default function Searchbox() {
  const { useHomePageStore } = useStore();
  const {
    searchQuery,
    setSearchQuery,
    setOnlySearchQuery,
    setSearchedQuery,
    loading,
    setLoading,
    setResultsRaw,
    setResults,
    setShowBanner,
    showAutoComplete,
    setShowAutoComplete,
    autoCompleteResults,
  } = useHomePageStore();

  useEffect(() => {
    if (!loading) {
      return;
    }

    axios
      .post(`${API_URI}/search/single/`, {
        cardName: searchQuery,
        websites: ["all"],
      })
      .then((res) => {
        setResultsRaw(res.data);
        setResults(
          res.data.sort((a, b) => {
            return a.price - b.price;
          })
        );
        setLoading(false);
        setShowBanner(false);
        setSearchedQuery(searchQuery);
      });
  }, [
    loading,
    searchQuery,
    setLoading,
    setResults,
    setResultsRaw,
    setSearchedQuery,
    setShowBanner,
  ]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setShowAutoComplete(false);
      setLoading(true);
    },
    [setShowAutoComplete, setLoading]
  );

  const searchRef = useRef();
  const [selected, setSelected] = useState(-1);
  const onKeyDown = useCallback(
    (e) => {
      if (!showAutoComplete) return;
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          setSearchQuery(autoCompleteResults[selected]);
          setSelected(-1);
          searchRef.current?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelected((s) => {
            const nextSelection = s - 1;
            if (nextSelection < 0) {
              searchRef.current?.focus();
              return -1;
            }
            return nextSelection;
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelected((s) => {
            const nextSelection = s + 1;
            if (nextSelection > autoCompleteResults.length - 1) {
              return autoCompleteResults.length - 1;
            }
            return nextSelection;
          });
          break;
        case "Enter":
          setSearchQuery(autoCompleteResults[selected]);
          handleSubmit(e);
          break;
      }
    },
    [
      showAutoComplete,
      autoCompleteResults,
      setSearchQuery,
      selected,
      handleSubmit,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="mt-6 w-full">
      <div className="relative">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            ref={searchRef}
            type="text"
            className={`block w-full px-4 py-2  placeholder-gray-500 border border-gray-300 rounded-md shadow-sm  sm:text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
              showAutoComplete ? "ring-purple-500 border-purple-500" : ""
            }`}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" && showAutoComplete) {
                e.target.blur();
              }
            }}
            spellCheck="false"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
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
        {/* Autocomplete results from store.autoCompleteResults */}
        {/* when clicking anywhere outside the autocomplete, set showAutoComplete to false */}
        {showAutoComplete && (
          <div
            className="absolute top-12 w-full overflow-hidden rounded-md shadow-lg"
            onMouseOut={() => setSelected(-1)}
            onClick={() => {
              setShowAutoComplete(false);
            }}
          >
            <ul className="divide-y divide-gray-700">
              {autoCompleteResults.map((cardName, index) => (
                <li
                  key={cardName}
                  className={`px-3 py-3 cursor-pointer ${
                    selected === index ? "bg-gray-700" : "bg-gray-800"
                  }`}
                  onClick={(e) => {
                    setOnlySearchQuery(cardName);
                    handleSubmit(e);
                  }}
                  onMouseOver={() => setSelected(index)}
                >
                  <p className="text-sm text-gray-300">{cardName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";

export default function Searchbox() {
  return (
    <div className="mt-6">
      <div className="relative">
        <input
          type="text"
          className="block w-full px-4 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          placeholder="Search"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 10a3.7 3.7 0 117.4 0 3.7 3.7 0 01-7.4 0zm1.414 0a2.286 2.286 0 104.572 0 2.286 2.286 0 00-4.572 0zM12 10a1 1 0 11-2 0 1 1 0 012 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M8 10a1 1 0 11-2 0 1 1 0 012 0zm-1 1a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

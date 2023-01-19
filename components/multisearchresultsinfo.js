import React from 'react'
import useStore from '@/store'


export default function MultiSearchResultsInfo() {
  const { useMultiSearchStore } = useStore()
  const store = useMultiSearchStore()
  return (
    <div className="w-full bg-gray-800 rounded-sm p-4">
      <div
        className="flex flex-col justify-center items-center h-full"
      >
        {/* Found 2/4 Cards
        0/2 Selected
        Total cost of selected */}
        <div className="text-white">No results found for</div>
        <div className="bg-gray-900 rounded-md w-60 h-14 text-white"></div>
        <div className="text-white">0/2 Cards selected</div>
        <div className="text-white">Cost of selected: {store.totalCost}</div>
      </div>
    </div>
  )
}

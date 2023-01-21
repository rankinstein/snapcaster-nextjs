import React from 'react'
import useStore from '@/store'

export default function SealedResultsInfo() {
    const { useSealedSearchStore } = useStore()
    const { resultsRaw, results, searchedQuery } = useSealedSearchStore()
  return (
    <div className="flex flex-col justify-center items-center w-full p-2">
    { resultsRaw.length != results.length ? (
      <p className="text-sm text-white">
        Displaying {results.length} of {resultsRaw.length} results for &quot;{searchedQuery}&quot;
      </p>
    ) : (
      <p className="text-sm text-white">
        {results.length} results for &quot;{searchedQuery}&quot;
      </p>
    )}
  </div>
  )
}

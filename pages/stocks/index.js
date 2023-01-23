import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Stocks({ test }) {
  const [searchQuery , setSearchQuery] = React.useState('')
  const handleClick = () => {
    // open a new tab with /stocks/[cardname]
    window.open(`/stocks/${searchQuery}/`, '_blank')
    
  }
  return (
    <>
    <Head>
      <title>Snapcaster</title>
      <meta
        name="description"
        content="Search Magic the Gathering singles in Canada"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="flex flex-col justify-between items-center p-8 min-h-screen">
      <div className="flex-col items-center justify-center flex-1 text-left max-w-xl">
        <div className="mx-auto space-y-7">
          <div>
            <h1 className="text-3xl font-bold text-purple-400 text-center">Stocks</h1>
            {/* search box to search for a card name */}
            <div className="flex justify-center">
              <input
                type="text"
                className="px-4 py-2 border border-gray-300"
                placeholder="Search for a card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-purple-400 text-white"
                onClick={handleClick}
              >
                Search
              </button>

              
              </div>
          </div>
         
        </div>
      </div>
    </main>
  </>
  )
}

// fetch server side props

export async function getServerSideProps(context) {
  const { req, res, query } = context
  // fetch any "daily new" or additional data visualizations here i guess
  return {
    props: {
    }, // will be passed to the page component as props
  }
}

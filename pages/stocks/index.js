import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Stocksearchbox from '@/components/stocksearchbox'
import useStore from '@/store'
import Loadingspinner from '@/components/loadingspinner'

export default function Stocks({ test }) {
  const [searchQuery , setSearchQuery] = React.useState('')
  const { useHomePageStore } = useStore();
  const { loading } = useHomePageStore();
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
      <div className="flex-col items-center justify-center flex-1 text-left max-w-xl w-full">
        <div className="mx-auto space-y-7">
          <div>
            <h1 className="text-3xl text-center">Search for a card</h1>
            {/* search box to search for a card name */}
            <div className="flex flex-col justify-center">
            <Stocksearchbox />
            {loading && (
              <div className="flex justify-center items-center pt-5">
                <Loadingspinner />
              </div>
            )}
            

              
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

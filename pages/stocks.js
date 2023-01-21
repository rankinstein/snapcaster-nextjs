import React from 'react'
import Head from 'next/head'

export default function Stocks() {
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
            <p className="mt-4">
              Coming soon
            </p>
          </div>
         
        </div>
      </div>
    </main>
  </>
  )
}

import Head from "next/head";
import StoreSelector from "@/components/storeselector";
import Multisearchbox from "@/components/multisearchbox";
export default function Multisearch() {
  
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
      <main className="flex flex-col justify-between items-center px-24 pb-24 pt-12 min-h-screen">
        <div className="flex-col items-center justify-center flex-1 text-center max-w-2xl">
          {/* checkboxes for selecting the stores */}
          <div className="font-bold">Select stores to search</div>
          <StoreSelector />

          {/* multi-line text field to enter card names */}
          <Multisearchbox />
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
          "
          >
            Search
          </button>






        </div>
      </main>
    </>
  );
}

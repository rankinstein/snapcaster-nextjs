import Head from "next/head";
import StoreSelector from "@/components/storeselector";
import Multisearchbox from "@/components/multisearchbox";
import useStore from "@/store";
import MultiSearchResults from "@/components/multisearchresults";
import Loadingspinner from "@/components/loadingspinner";
export default function Multisearch() {
  const { useMultiSearchStore } = useStore();
  const store = useMultiSearchStore();

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
      <main className="flex flex-col justify-between items-center px-4 md:px-24 pb-24 pt-12 min-h-screen">
        {store.mode === "search" && !store.loading && (
          <div className="flex-col items-center justify-center flex-1 text-center max-w-2xl">
            {/* checkboxes for selecting the stores */}
            <div className="font-bold">Select stores to search</div>
            <StoreSelector />
            {/* multi-line text field to enter card names */}
            <Multisearchbox />
          </div>
        )}
        {store.loading && (
          <div className="flex flex-col space-y-2 justify-center items-center pt-5">
          <Loadingspinner />
          <div className="text-sm p-3">This might take a minute, depending on the number of cards and selected stores.</div>
          </div>
        )
        }
        {store.mode === "results" && (
          <div className="flex-col w-full max-w-xl">
            <MultiSearchResults />
          </div>
        )}
      </main>
    </>
  );
}

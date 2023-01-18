import Head from "next/head";
import StoreSelector from "@/components/storeselector";
import Multisearchbox from "@/components/multisearchbox";
import useStore from "@/store";
import MultiSearchResults from "@/components/multisearchresults";
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
      <main className="flex flex-col justify-between items-center px-24 pb-24 pt-12 min-h-screen">
        {store.mode === "search" && (
          <div className="flex-col items-center justify-center flex-1 text-center max-w-2xl">
            {/* checkboxes for selecting the stores */}
            <div className="font-bold">Select stores to search</div>
            <StoreSelector />
            {/* multi-line text field to enter card names */}
            <Multisearchbox />
          </div>
        )}
        {store.mode === "results" && (
          <div className="flex-col items-center justify-center flex-1 text-center max-w-2xl">
            <MultiSearchResults />
          </div>
        )}
      </main>
    </>
  );
}

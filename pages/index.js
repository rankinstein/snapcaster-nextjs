import Head from "next/head";
import Searchbox from "@/components/searchbox";
import Homebanner from "@/components/homebanner";
import useStore from "@/store";
import CatalogView from "@/components/CatalogView";
import { useState } from "react";
import Loadingspinner from "@/components/loadingspinner";
import Searchinfo from "@/components/searchinfo";
import SearchFilters from "@/components/searchfilters";
export default function Home() {
  // import the useSinglestore and useHomePageStore from the store
  const { useHomePageStore } = useStore();
  const store = useHomePageStore();

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
      <main className="flex flex-col justify-between items-center px-4 sm:px-24 min-h-screen">
        {/* We want Homebanner and Searchbox components to fade out to 0 opacity and then fade in CatalogView component */}
        {/* This happens when loading is set to false */}
        <div className="flex-col items-center justify-center flex-1 text-center max-w-2xl">
          {store.showBanner && (
            <>
              <Homebanner />
              <Searchbox />
            </>
          )}
          {store.loading && (
            <div className="flex justify-center items-center pt-5">
              <Loadingspinner />
            </div>
          )}
          {!store.showBanner && store.results.length > 0 && (
            <>
              <Searchbox />
              <Searchinfo />
              <SearchFilters />
              <CatalogView cardData={store.results} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

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
        <title>snapcaster</title>
        <meta
          name="description"
          content="Search for Magic the Gathering singles in Canada"
        />
        <meta property="og:title" content={`snapcaster - Search for Magic: the Gathering cards across Canada`} />
        <meta property="og:description" content={`Find your Magic the Gathering singles and sealed product using snapcaster. Search over 20 Canadian stores.`} />
        <meta
          property="og:url"
          content={`https://snapcaster.ca`}
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-between items-center p-8 min-h-screen">
        {/* We want Homebanner and Searchbox components to fade out to 0 opacity and then fade in CatalogView component */}
        {/* This happens when loading is set to false */}
        <div
          className="flex-col justify-center flex-1 text-center max-w-xl w-full"
          // close autocomplete when clicking outside of the searchbox
          onClick={() => {
            store.setShowAutoComplete(false);
          }}
        >
          {store.showBanner && (
            <div>
              <Homebanner />
              <Searchbox />
            </div>
          )}
          {store.loading && (
            <div className="flex justify-center items-center pt-5">
              <Loadingspinner />
            </div>
          )}
          {!store.showBanner && (
            <>
              <Searchbox />
              <Searchinfo />
              <SearchFilters />
            </>
          )}
          {!store.showBanner && store.results.length > 0 && (
            <>
              <CatalogView cardData={store.results} />
            </>
          )}
        </div>
      </main>
    </>
  );
}

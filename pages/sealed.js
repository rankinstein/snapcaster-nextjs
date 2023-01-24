import Head from "next/head";
import useStore from "@/store";
import SealedSearchBox from "@/components/sealedsearchbox";
import axios from "axios";
import Loadingspinner from "@/components/loadingspinner";
import SealedProductRow from "@/components/sealedproductrow";
import SealedResultsInfo from "@/components/sealedresultsinfo";
import SealedSearchFilters from "@/components/sealedsearchfilters";
export default function Sealed() {
  const { useSealedSearchStore } = useStore();
  const store = useSealedSearchStore();
  return (
    <>
      <Head>
        <title>Sealed Search - snapcaster</title>
        <meta
          name="description"
          content="Search Magic the Gathering sealed products in Canada"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-between items-center p-8 min-h-screen">
        <div className="flex-col justify-center flex-1 text-center max-w-xl w-full">
          {store.showBanner && (
            <div className="text-2xl">Search for a set</div>
          )}
          <SealedSearchBox />
          {store.loading && (
            <div className="flex justify-center items-center pt-5">
              <Loadingspinner />
            </div>
          )}
          <div className="mt-2">
            {store.resultsRaw.length > 0 && (
              <div>
                <SealedResultsInfo />
                <SealedSearchFilters />
                {store.results.map((result, index) => (
                  <div key={index}>
                    <SealedProductRow product={result} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

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
      <main className="flex flex-col justify-between items-center p-24 min-h-screen">
        <div className="flex-col items-center justify-center flex-1 text-center max-w-2xl">
          {/* checkboxes for selecting the stores */}
          <StoreSelector />

          {/* multi-line text field to enter card names */}
          <Multisearchbox />





        </div>
      </main>
    </>
  );
}

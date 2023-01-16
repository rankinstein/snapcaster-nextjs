import Head from "next/head";
export default function Sealed() {
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
        <div className="flex-col items-center justify-center flex-1 px-20 text-center">
         <div className="text-red-500">Sealed</div> 
        </div>
      </main>
    </>
  );
}

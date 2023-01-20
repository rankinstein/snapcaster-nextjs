import Head from "next/head";
import useStore from "@/store";
import SealedSearchBox from "@/components/sealedsearchbox";
import axios from "axios";
export default function Sealed() {
  const { useSealedSearchStore } = useStore();
  const store = useSealedSearchStore();
  axios.get("https://api.scryfall.com/sets").then((res) => {
    let sets = res.data.data;
    // create a new array of objects with only the set code and name
    let setsArray = sets.map((set) => {
      return { code: set.code, name: set.name };
    });
    // sort the array by name
    setsArray.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    // setSets(setsArray);
    console.log("Number of sets: " + setsArray.length);
    console.log(setsArray);
  });


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
        <div className="flex-col justify-center flex-1 text-center max-w-xl w-full">
          <div className="text-2xl text-white">Search for a set</div>
          <SealedSearchBox />
        </div>
      </main>
    </>
  );
}

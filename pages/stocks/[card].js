import RechartsLineChart from "../../components/rechartsline";
import Head from "next/head";
import TabbedContent from "../../components/tabbedcontent";
import DataTable from "@/components/datatable";
const API_URI = process.env.NEXT_PUBLIC_API_URI;
export default function Card({ card, data }) {
  // hit pricedata api for the card
  // if data.price_data is empty, show a message saying that the card is not in the database

  return (
    <>
      <Head>
        <title>{data.card_name}</title>
        <meta
          name="description"
          content={`Canadian price data for ${data.card_name}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-between items-center p-8 pt-20 min-h-screen">
        <div className="flex flex-col flex-1 max-w-5xl w-full">
          {data.price_data.length === 0 && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold">
                {data.card_name} has no prices in the database.
              </h1>
              <p className="my-2 italic">But you just added the first price entry!</p>
              <h1 className="text-sm font-bold">
                Please try another card name, or refresh the page to view the new data points.
              </h1>
            </div>
          )}
          {/* Card image and price chart */}
          {data.price_data.length > 0 && <div className="grid grid-cols-12 w-full">
            <div className="col-span-12 lg:col-span-4 h-full ">
              <div className="flex flex-col justify-center items-center w-full">
                {/* image of magic card placeholder */}
                <img
                  src={data.image_uri}
                  alt={data.card_name}
                  className="w-48 h-auto rounded-lg"
                />
                <h1 className="text-lg mt-2">{data.card_name}</h1>
                <div className="transition-all bg-gray-600  text-white text-sm rounded-lg p-2 m-2 opacity-50">
                  From ${data.price_data[data.price_data.length - 1].min_price}{" "}
                  CAD
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
                <TabbedContent className="h-full">
                  {/* <h1 className="text-xl font-bold">Price Chart</h1> */}
                  <RechartsLineChart price_data={data.price_data} />
                  <DataTable data={data} />
                </TabbedContent>
            </div>
          </div>}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const { card } = query;

  let data = null;
  await fetch(
    `${API_URI}/pricedata/card/${card}/`
  )
    // await fetch(`https://snapcasterv2-api-production.up.railway.app/pricedata/card/${card}/`)
    .then((res) => res.json())
    .then((json) => {
      console.log("json", json)
      if (json.price_data.length !== 0) {

      // before setting data=json, we want to round the prices to 2 decimal places
      json.price_data.forEach((element) => {
        element.avg_price = element.avg_price.toFixed(2);
        element.max_price = element.max_price.toFixed(2);
        element.min_price = element.min_price.toFixed(2);
      });
    }

      data = json;
    });

  return {
    props: {
      card,
      data,
    },
  };
}

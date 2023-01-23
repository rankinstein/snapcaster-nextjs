import RechartsLineChart from "../../components/rechartsline";
export default function Card({ card, data }) {
  // hit pricedata api for the card
  console.log(data.price_data[data.price_data.length - 1].min_price)
  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          {/* image of magic card placeholder */}
          <img
            src={data.image_uri}
            alt={data.card_name}
            className="w-48 h-auto m-4 rounded-lg"
          />
          <h1 className="text-xl font-bold">{data.card_name}</h1>
          <div
            className="transition-all bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg p-2 m-2"
          >Purchase from ${data.price_data[data.price_data.length - 1].min_price} CAD</div>
        </div>

        <RechartsLineChart price_data={data.price_data} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const { card } = query;

  let data = null;
  await fetch(`http://localhost:8000/pricedata/card/${card}/`)
  // await fetch(`https://snapcasterv2-api-production.up.railway.app/pricedata/card/${card}/`)
    .then((res) => res.json())
    .then((json) => {
      // before setting data=json, we want to round the prices to 2 decimal places
      json.price_data.forEach((element) => {
        element.avg_price = element.avg_price.toFixed(2);
        element.max_price = element.max_price.toFixed(2);
        element.min_price = element.min_price.toFixed(2);
      });

      data = json;
    });


  return {
    props: {
      card,
      data,
    },
  };
}

import LineChart from "../../components/linechart";

export default function Card({ card, data }) {
  console.log("data", data);

  // hit pricedata api for the card
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
          <h1 className="text-2xl font-bold">{data.card_name}</h1>
        </div>

        <LineChart data={data} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const { card } = query;

  let data = null;
  await fetch(`http://localhost:8000/pricedata/card/${card}/`)
    .then((res) => res.json())
    .then((json) => {
      data = json;
    });

  return {
    props: {
      card,
      data,
    },
  };
}

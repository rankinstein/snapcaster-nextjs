import LineChart from "../../components/linechart";

export default function Card({ card, data }) {
  const dummyData = [
    { date: new Date("2022-01-01"), price: 100 },
    { date: new Date("2022-02-01"), price: 170 },
    { date: new Date("2022-03-01"), price: 120 },
    { date: new Date("2022-04-01"), price: 130 },
    { date: new Date("2022-05-01"), price: 110 },
    { date: new Date("2022-06-01"), price: 150 },
    { date: new Date("2022-07-01"), price: 160 },
    { date: new Date("2022-08-01"), price: 140 },
    // ...
  ];
  const graphData = data.price_data.map(d => {
    return { date: new Date(d.date), price: d.avg_price }
});
console.log(graphData)
  // hit pricedata api for the card
  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        {/* image of magic card placeholder */}
        <div className="ml-8 mr-8 p-2 w-36 h-48 bg-gray-400"></div>
        
        <LineChart data={graphData} />
      </div>
      <h1>
        {data.price_data.map((item, index) => (
          <div key={index}>
            <p>{item.date}</p>
          </div>
        ))}
      </h1>
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

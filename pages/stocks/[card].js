import LineChart from "../../components/linechart";

export default function Card({ card, data }) {

  // hit pricedata api for the card
  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        {/* image of magic card placeholder */}
       <img src={data.image_uri} alt={data.card_name} 
        className="w-48 h-auto p-4"
       /> 
        
        <LineChart data={data}/>
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

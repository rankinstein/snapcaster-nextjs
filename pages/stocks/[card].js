export default function Card({ card, data }) {
  // hit pricedata api for the card
  return (
    <div>
      <h1>{card}</h1>
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

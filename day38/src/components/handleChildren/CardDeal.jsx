export default function CardDeal({ cards }) {
  return (
    <>
      {cards?.map((card) => (
        <div className="relative" key={card.id}>
          <div className="absolute top-0 right-5 bg-[#03081F] p-4 rounded-bl-lg rounded-br-lg">
            <span className="text-white text-lg font-bold">
              -{card.discount}%
            </span>
          </div>
          <a href="#!">
            <img src={card.thumbnails} />
          </a>
          <div className="absolute bottom-5 left-10">
            <h3 className="text-[#FC8A06] text-lg  font-medium">
              {card.restaurantName}
            </h3>
            <h4 className="text-white text-2xl font-bold">{card.chefName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

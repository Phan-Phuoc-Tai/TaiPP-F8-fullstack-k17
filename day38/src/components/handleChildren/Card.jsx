export default function Card({ item }) {
  return (
    <>
      <div className={`bg-[${item.background}] rounded-xl`} key={item.id}>
        <a href="#!">
          <img src={item.thumbnails} />
        </a>
        <div className="px-5 py-3">
          {item.title && (
            <h3 className="text-[#03081F] font-bold text-lg">{item.title}</h3>
          )}
          {item.name && (
            <h3 className="text-white font-bold text-lg text-center">
              {item.name}
            </h3>
          )}
          {item.quantity && (
            <p className="text-[13px] font-normal text-[#FC8A06]">
              {item.quantity} Restaurants
            </p>
          )}
        </div>
      </div>
    </>
  );
}

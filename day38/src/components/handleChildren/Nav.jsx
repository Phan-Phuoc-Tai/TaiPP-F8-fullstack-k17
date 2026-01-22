export default function Nav() {
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <li className="bg-[#FC8A06] text-white py-[6px] px-6 rounded-full text-lg font-medium">
          <a href="#">Home</a>
        </li>
        <li className="text-black py-[6px] px-6 rounded-full text-lg font-medium">
          <a href="#!">Browse Menu</a>
        </li>
        <li className="text-black py-[6px] px-6 rounded-full text-lg font-medium">
          <a href="#!">Special Offers</a>
        </li>
        <li className="text-black py-[6px] px-6 rounded-full text-lg font-medium">
          <a href="#!">Restaurants</a>
        </li>
        <li className="text-black py-[6px] px-6 rounded-full text-lg font-medium">
          <a href="#!">Track Order</a>
        </li>
      </ul>
    </nav>
  );
}

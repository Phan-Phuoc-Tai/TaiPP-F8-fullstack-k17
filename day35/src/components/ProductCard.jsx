import { use } from "react";
import { ProductsContext } from "../contexts/productsContext";

export default function ProductCard() {
  const { id, thumbnail, price, title } = use(ProductsContext);

  return (
    <div className="flex flex-col justify-between w-70 rounded-md bg-white border border-gray-200 cursor-pointer hover:shadow-lg">
      <div className="pt-4 ">
        <img
          className="border-b border-gray-200 w-full h-75 object-cover"
          src={thumbnail}
        />
      </div>
      <div className="p-4 flex flex-col justify-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-md font-bold">{price}</p>
        <a href={`/products/${id}`} className="text-md underline text-blue-500">
          Chi tiết
        </a>
      </div>
    </div>
  );
}

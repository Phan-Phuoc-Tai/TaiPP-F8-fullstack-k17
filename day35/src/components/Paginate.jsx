import { use } from "react";
import { ProductsContext } from "../contexts/productsContext";

export default function Paginate() {
  const { page, setPage, totalPage } = use(ProductsContext);
  const pageNumbers = [];
  for (let pageNumber = 1; pageNumber <= totalPage; pageNumber++) {
    if (!pageNumbers.includes(pageNumber)) {
      pageNumbers.push(pageNumber);
    }
  }
  return (
    <>
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={
            pageNumber === +page
              ? "outline-none bg-gray-900 px-3 py-2 rounded-md cursor-pointer text-white"
              : "outline-none bg-gray-200 px-3 py-2 rounded-md cursor-pointer text-black hover:bg-gray-500 hover:text-white"
          }
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </>
  );
}

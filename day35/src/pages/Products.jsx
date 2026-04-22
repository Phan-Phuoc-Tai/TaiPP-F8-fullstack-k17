import { httpRequest } from "../tools/httpRequest";
import { ProductsContext } from "../contexts/productsContext";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Debounce from "../components/Debounce";
import Paginate from "../components/Paginate";

export default function Products() {
  // let searchId = null;
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("keyword") ?? "");
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [totalPage, setTotalPage] = useState(0);
  const [message, setMessage] = useState("");
  const handleSearchProduct = (e) => {
    const value = e.target.value;
    setValue(value);
    setMessage("");
  };
  const debounceSearchProduct = Debounce(value);

  useEffect(() => {
    let keyword;
    if (debounceSearchProduct) {
      keyword = debounceSearchProduct
        ? debounceSearchProduct
        : searchParams.get("keyword");
      setSearchParams({
        keyword: debounceSearchProduct,
      });
    }
    if (page > 1) {
      setSearchParams({
        keyword: searchParams.get("keyword") ?? "",
        page: page,
      });
    }
    const getData = async () => {
      const limit = 20;
      const skip = (page - 1) * limit;
      const response = await httpRequest(
        `${
          keyword
            ? `/products/search?q=${keyword}&limit=${limit}&skip=${skip}`
            : `/products?limit=${limit}&skip=${skip}`
        }`
      );
      const data = response.data;
      const products = data.products;
      if (!products.length) {
        setMessage(`Không tìm thấy sản phẩm: ${value}`);
      }
      setTotalPage(Math.ceil(data.total / limit));
      setProducts(products);
    };
    getData();
  }, [debounceSearchProduct, page]);
  return (
    <main className="p-4">
      <header>
        <h1 className="text-3xl font-bold">Sản phẩm</h1>
        <input
          type="search"
          placeholder="Tìm kiếm..."
          className="outline-none px-3 py-2 border border-gray-400 rounded-md mt-2 text-lg"
          value={value}
          onChange={handleSearchProduct}
        />
      </header>
      <section className={message ? "py-4" : "py-4 grid grid-cols-4 gap-4"}>
        {products.map((product) => (
          <ProductsContext.Provider value={product} key={product.id}>
            <ProductCard />
          </ProductsContext.Provider>
        ))}
        {message && (
          <p className=" text-xl text-red-500 italic">
            Không tìm thấy sản phẩm: <span className="font-bold">{value}</span>
          </p>
        )}
      </section>
      <div className="flex items-center gap-2">
        <ProductsContext.Provider
          value={{
            page,
            setPage,
            totalPage,
          }}
        >
          {+page > 1 ? (
            <button
              className="outline-none bg-gray-200 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white"
              onClick={() => setPage(+page - 1)}
            >
              Prev
            </button>
          ) : (
            ""
          )}
          <Paginate />
          {+page < totalPage ? (
            <button
              className="outline-none bg-gray-200 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white"
              onClick={() => setPage(+page + 1)}
            >
              Next
            </button>
          ) : (
            ""
          )}
        </ProductsContext.Provider>
      </div>
      <footer className="mt-4">Footer</footer>
    </main>
  );
}

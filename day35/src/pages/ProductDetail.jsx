import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpRequest } from "../tools/httpRequest";

export default function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState("");
  const { images, title, price, description } = productDetail;
  const [imageActive, setImageActive] = useState(0);
  const handleNextImage = () => {
    if (imageActive > images.length - 2) {
      setImageActive(0);
      return;
    }
    setImageActive(imageActive + 1);
  };
  const handlePrevImage = () => {
    if (imageActive === 0) {
      setImageActive(images.length - 1);
      return;
    }
    setImageActive(imageActive - 1);
  };
  useEffect(() => {
    const getProductDetail = async () => {
      const response = await httpRequest(`/products/${id}`);
      const data = response.data;
      setProductDetail(data);
    };
    getProductDetail();
  }, []);
  return (
    <main className="p-4">
      {productDetail && (
        <article>
          <div className="w-100">
            <img className="w-full object-cover" src={images[imageActive]} />
          </div>
          <div className="flex items-center gap-2">
            {images.length > 1 ? (
              <button
                className="outline-none bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white"
                onClick={handlePrevImage}
              >
                Prev
              </button>
            ) : (
              ""
            )}
            <div className="flex items-center gap-2">
              {images.map((image, index) => (
                <img
                  className={
                    index === imageActive
                      ? "w-25 border border-gray-500 rounded-md object-cover transition duration-300 cursor-pointer"
                      : "w-25 border border-gray-200 rounded-md object-cover transition duration-300 cursor-pointer"
                  }
                  src={image}
                  key={index}
                  onClick={() => setImageActive(index)}
                ></img>
              ))}
            </div>
            {images.length > 1 ? (
              <button
                className="outline-none bg-gray-200 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-900 hover:text-white"
                onClick={handleNextImage}
              >
                Next
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="py-2 flex flex-col justify-center">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-xl font-bold">{price}</p>
            <p>{description}</p>
          </div>
        </article>
      )}
      <footer className="mt-4">Footer</footer>
    </main>
  );
}

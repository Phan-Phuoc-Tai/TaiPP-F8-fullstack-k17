import { useParams } from "react-router-dom";

export default function CreateOrder() {
  const { productId } = useParams();
  return (
    <div className="max-w-300 mx-auto">
      <h1 className="text-3xl font-bold">Đặt hàng cho sản phẩm: {productId}</h1>
    </div>
  );
}

import { useNavigate, useParams } from "react-router-dom";
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-300 mx-auto">
      <h1 className="text-3xl font-bold">ProductDetail: {id}</h1>
      <button
        className="px-3 py-2 rounded-lg border border-gray-400 cursor-pointer hover:border-red-600 hover:text-red-600"
        onClick={() => navigate(`/users/order/${id}`)}
      >
        Đặt hàng
      </button>
    </div>
  );
}

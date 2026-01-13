import { useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeStatus = (e) => {
    const value = e.target.value;
    setSearchParams({
      status: value,
      q: searchParams.get("q") ?? "",
    });
  };
  const handleSearchValue = (e) => {
    const value = e.target.value;
    setSearchParams({
      status: searchParams.get("status") ?? "",
      q: value,
    });
  };

  return (
    <div className="max-w-300 mx-auto">
      <h1 className="text-3xl font-bold">Products</h1>
      <select onChange={handleChangeStatus}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input
        type="text"
        placeholder="Từ khoá...."
        onChange={handleSearchValue}
      />
      <p>Keyword: {searchParams.get("q")}</p>
      <p>Status: {searchParams.get("status")}</p>
    </div>
  );
}
//searchParams: sử dụng khi cần lọc từ khoá, phân trang

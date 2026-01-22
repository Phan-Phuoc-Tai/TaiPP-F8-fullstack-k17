import { CategoriesContext } from "@/contexts/CategoriesContext";
import { httpRequest } from "@/utils/httpRequest";
import { useQuery } from "@tanstack/react-query";
import Card from "../handleChildren/Card";
import { categoryCacheKey } from "@/caches/categoryCacheKey";

export default function Categories() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const getCategories = async () => {
    const response = await httpRequest.get(`${baseUrl}/categories`);
    return response.data;
  };
  const { data } = useQuery({
    queryKey: categoryCacheKey.list,
    queryFn: getCategories,
  });
  return (
    <section>
      <CategoriesContext.Provider value={{ data }}>
        <div className="max-w-380 mx-auto mt-15">
          <h2 className="ml-5 text-[32px] font-bold text-black">
            Order.uk Popular Categories 🤩
          </h2>
          <div className="flex items-center justify-between gap-5 mt-13">
            {data?.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </div>
      </CategoriesContext.Provider>
    </section>
  );
}

import { RestaurantsContext } from "@/contexts/RestaurantsContext";
import Card from "../handleChildren/Card";
import { httpRequest } from "@/utils/httpRequest";
import { useQuery } from "@tanstack/react-query";
import { restaurantCacheKey } from "@/caches/restaurantCacheKey";

export default function Restaurants() {
  const getCategories = async () => {
    const response = await httpRequest.get(
      `http://localhost:3000/counters/restaurants`,
    );
    return response.data;
  };
  const { data } = useQuery({
    queryKey: restaurantCacheKey.list,
    queryFn: getCategories,
  });
  return (
    <section>
      <RestaurantsContext.Provider value={{ data }}>
        <div className="max-w-380 mx-auto mt-15">
          <h2 className="ml-5 text-[32px] font-bold text-black">
            Popular Restaurants
          </h2>
          <div className="flex items-center justify-between gap-5 mt-13">
            {data?.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </div>
      </RestaurantsContext.Provider>
    </section>
  );
}

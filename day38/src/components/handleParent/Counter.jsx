import { counterCacheKey } from "@/caches/counterCacheKey";
import { httpRequest } from "@/utils/httpRequest";
import { useQuery } from "@tanstack/react-query";

export default function Counter() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const getCounter = async () => {
    const response = await httpRequest(`${baseUrl}/counters`);
    return response.data;
  };
  const { data: counters } = useQuery({
    queryKey: counterCacheKey.list,
    queryFn: getCounter,
  });

  return (
    <section>
      <div className="max-w-380 mx-auto mt-11 bg-[#FC8A06] rounded-2xl px-20 py-5 flex items-center justify-between gap-15">
        {counters?.map((counter) => (
          <div
            className={`w-max text-white ${counter.borderRight ? `border-r border-[${counter.borderRight}] pr-18` : ""}`}
            key={counter.id}
          >
            <p className="font-light text-[64px] text-center">
              {counter.quantity}+
            </p>
            <p className="font-bold text-2xl text-center">{counter.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExclusiveDealsContext } from "@/contexts/ExclusiveDealsContext";
import { httpRequest } from "@/utils/httpRequest";
import { useQuery } from "@tanstack/react-query";
import CardDeal from "../handleChildren/CardDeal";
import { dealCacheKey } from "@/caches/dealCacheKey";
import TabsDeal from "../handleChildren/TabsDeal";
export default function ExclusiveDeals() {
  const getDeals = async () => {
    const response = await httpRequest.get(`http://localhost:3000/deals`);
    return response.data;
  };
  const { data } = useQuery({
    queryKey: dealCacheKey.list,
    queryFn: getDeals,
    initialData: [],
  });

  return (
    <section>
      <ExclusiveDealsContext.Provider
        value={{
          data,
        }}
      >
        <Tabs defaultValue="pizza" className={"max-w-380 mx-auto mt-[54px]"}>
          <TabsList className={"bg-white h-auto gap-2 w-full"}>
            <h2 className="ml-5 text-[32px] font-bold text-black">
              Up to -40% 🎊 Order.uk exclusive deals
            </h2>
            <div className="ml-auto">
              <TabsDeal />
            </div>
          </TabsList>
          <div className="mt-7">
            {data?.map((cards) => (
              <TabsContent value={cards.type} key={cards.id}>
                <div className="flex items-center justify-between gap-5">
                  <CardDeal cards={cards.items} />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </ExclusiveDealsContext.Provider>
    </section>
  );
}

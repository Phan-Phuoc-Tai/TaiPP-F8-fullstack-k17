import { httpRequest } from "@/utils/httpRequest";
import TabsSection from "../handleChildren/TabsDeal";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { aboutUsCacheKey } from "@/caches/aboutUsCacheKey";
import { useQuery } from "@tanstack/react-query";
import { AboutUsContext } from "@/contexts/AboutUsContext";
import TabsAboutUs from "../handleChildren/TabsAboutUs";

export default function AboutUs() {
  const getInfoAboutUs = async () => {
    const response = await httpRequest.get(`http://localhost:3000/aboutUs`);
    return response.data;
  };
  const { data } = useQuery({
    queryKey: aboutUsCacheKey.list,
    queryFn: getInfoAboutUs,
    initialData: [],
  });

  return (
    <section>
      <AboutUsContext.Provider
        value={{
          data,
        }}
      >
        <Tabs
          defaultValue="frequentQuestions"
          className={"max-w-380 mx-auto mt-[54px]"}
        >
          <TabsList className={"bg-white h-auto gap-2 w-full"}>
            <h2 className="ml-5 text-[32px] font-bold text-black">
              Know more about us!
            </h2>
            <div className="ml-auto">
              <TabsAboutUs />
            </div>
          </TabsList>
          <div className="mt-7">
            {/* {data?.map((cards) => (
              <TabsContent value={cards.type} key={cards.id}>
                <div className="flex items-center justify-between gap-5">
                  <CardDeal cards={cards.items} />
                </div>
              </TabsContent>
            ))} */}
          </div>
        </Tabs>
      </AboutUsContext.Provider>
    </section>
  );
}

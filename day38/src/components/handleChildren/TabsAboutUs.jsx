import { AboutUsContext } from "@/contexts/AboutUsContext";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { use } from "react";

export default function TabsAboutUs() {
  const { data: tabs } = use(AboutUsContext);
  return (
    <>
      {tabs?.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.type}
          className={
            "data-[state=active]:border data-[state=active]:border-[#FC8A06] data-[state=active]:rounded-[120px] data-[state=active]:text-[#FC8A06] px-6 py-3 cursor-pointer hover:border hover:border-[#FC8A06] hover:rounded-[120px] hover:text-[#FC8A06] text-black font-medium"
          }
        >
          <span>{tab.tabName}</span>
        </TabsTrigger>
      ))}
    </>
  );
}

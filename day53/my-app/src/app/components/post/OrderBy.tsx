"use client";
import { Button } from "@/components/ui/button";
import { POST } from "../../constants/post.constant";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function OrderBy() {
  const [isLatestActive, setIsLatestActive] = useState<boolean>(false);
  const [isOldestActive, setIsOldestActive] = useState<boolean>(true);
  return (
    <div className="flex gap-2 mb-4">
      <Button
        className={cn(
          "bg-white text-[#333]border border-[#ccc] cursor-pointer hover:bg-[#eee]",
          isLatestActive && "bg-black text-white hover:bg-black",
        )}
        onClick={() => {
          setIsLatestActive(true);
          setIsOldestActive(false);
        }}
      >
        {POST.orderBy.latest}
      </Button>
      <Button
        className={cn(
          "bg-white text-[#333]border border-[#ccc] cursor-pointer hover:bg-[#eee]",
          isOldestActive && "bg-black text-white hover:bg-black",
        )}
        onClick={() => {
          setIsLatestActive(false);
          setIsOldestActive(true);
        }}
      >
        {POST.orderBy.oldest}
      </Button>
    </div>
  );
}

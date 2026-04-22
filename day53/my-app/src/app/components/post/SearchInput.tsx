import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { POST } from "../../constants/post.constant";

export default function SearchInput() {
  return (
    <div className="flex items-center gap-3 my-3">
      <Input
        className="focus-visible:ring-0 px-4 py-2 h-auto"
        placeholder={POST.searchInput.placeholder}
      />
      <Button className="py-2 h-auto bg-[#ddd] text-black hover:bg-[#333] hover:text-white cursor-pointer">
        {POST.searchInput.submit}
      </Button>
    </div>
  );
}

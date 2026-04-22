import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";
type Props = {
  id: number;
};

export default function PostOptions({ id }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex w-6 p-1 gap-0.5 text-[#757575] cursor-pointer hover:text-[#333] select-none">
          <span>&bull;</span>
          <span>&bull;</span>
          <span>&bull;</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild>
        <div>
          <UpdatePost id={id} />
          <DeletePost id={id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

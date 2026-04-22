import Link from "next/link";
import PostOptions from "./PostOptions";
import { POST } from "@/app/constants/post.constant";

type Props = {
  title: string;
  body: string;
  id: number;
};
export default function Post({ title, body, id }: Props) {
  return (
    <div className="border border-[#ddd] px-3 py-2 mb-4 rounded-md hover:border-[#333]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-medium">{title}</h2>
        <PostOptions id={id} />
      </div>
      <p>{body}</p>
      <Link
        href={`/${id}`}
        className="my-2 block border  border-green-700 text-green-600 max-w-fit px-3 py-1 rounded-lg cursor-pointer hover:bg-green-700 hover:text-white"
      >
        {POST.detail.button}
      </Link>
    </div>
  );
}

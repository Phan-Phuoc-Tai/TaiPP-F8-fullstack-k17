import { postService } from "../services/post.service";
import PostOptions from "../components/post/PostOptions";
import { POST } from "../constants/post.constant";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await postService.getSingle(+id);
  return (
    <div className=" px-3 py-2">
      <h1 className="text-3xl text-center mb-3">{`${POST.detail.title}`}</h1>
      <Link
        href={"/"}
        className="flex items-center mb-2 text-[#757575] text-sm underline hover:text-[#333]"
      >
        <ChevronLeft size={"16px"} />
        <span>{POST.goHome}</span>
      </Link>
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-medium">{post.title}</h2>
        <PostOptions id={+id} />
      </div>
      <p>{post.body}</p>
    </div>
  );
}

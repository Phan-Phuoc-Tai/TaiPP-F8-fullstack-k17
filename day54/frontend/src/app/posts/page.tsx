import Link from "next/link";
import { POST } from "../constants/post.constant";
import { postService } from "../services/post.service";
import DeleteButton from "./components/DeleteButton";

export default async function PostsPage() {
  const posts = await postService.getAll();
  const addAction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    await postService.create(title!);
  };
  return (
    <div>
      <h1 className="text-3xl font-medium mb-2">{POST.TITLE}</h1>
      <form action={addAction} className="mb-2">
        <h2 className="text-xl">{POST.FORM_ADD.TITLE}</h2>
        <input
          type="text"
          name="title"
          className="px-3 py-1 w-full outline-0 border border-[#ddd]"
        />
        <button className="px-3 py-1 bg-green-500 mt-2">
          {POST.FORM_ADD.SUBMIT}
        </button>
      </form>
      {posts.map((post) => (
        <div key={post.id} className="mb-3 border-b border-[#ddd] pb-2">
          <h2 className="text-xl">{post.title}</h2>
          <div className="flex items-center gap-2">
            <Link
              href={`/posts/${post.id}`}
              className="px-3 py-1 bg-amber-500 text-white"
            >
              Edit
            </Link>
            <DeleteButton id={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

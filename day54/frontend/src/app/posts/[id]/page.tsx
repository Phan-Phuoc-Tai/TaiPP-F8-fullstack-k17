import { POST } from "@/app/constants/post.constant";
import { postService } from "@/app/services/post.service";

export default async function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await postService.getSingle(id);
  const updateAction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    await postService.update(title!, id);
  };
  return (
    <div>
      <h1 className="text-3xl font-medium mb-2">{POST.DETAIL.TITLE}</h1>
      <form action={updateAction} className="mb-2">
        <h2 className="text-xl">{POST.FORM_UPDATE.TITLE}</h2>
        <input
          type="text"
          name="title"
          className="px-3 py-1 w-full outline-0 border border-[#ddd]"
          defaultValue={post.title}
        />
        <button className="px-3 py-1 bg-green-500 mt-2">
          {POST.FORM_UPDATE.SUBMIT}
        </button>
      </form>
    </div>
  );
}

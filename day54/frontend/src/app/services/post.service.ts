import { revalidateTag } from "next/cache";
import { CACHE } from "../constants/cache.constant";
import { Post } from "../types/post.type";
import { redirect } from "next/navigation";

export const postService = {
  async getAll(): Promise<Post[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/posts`,
      {
        cache: "force-cache",
        next: {
          tags: [CACHE.POSTS.LIST],
        },
      },
    );
    const { data } = await response.json();
    return data;
  },
  async getSingle(id: string): Promise<Post> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/posts/${id}`,
      {
        cache: "force-cache",
        next: {
          tags: [CACHE.POSTS.DETAIL(id)],
        },
      },
    );
    const { data } = await response.json();
    return data;
  },
  async create(title: FormDataEntryValue): Promise<Post> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      },
    );
    if (response.ok) {
      revalidateTag(CACHE.POSTS.LIST, {
        expire: 0,
      });
    }
    const { data } = await response.json();
    return data;
  },
  async update(title: FormDataEntryValue, id: string): Promise<Post> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      },
    );
    if (response.ok) {
      revalidateTag(CACHE.POSTS.LIST, {
        expire: 0,
      });
      revalidateTag(CACHE.POSTS.DETAIL(id), {
        expire: 0,
      });
      redirect("/posts");
    }
    const { data } = await response.json();
    return data;
  },
  async delete(id: number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/posts/${id}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      revalidateTag(CACHE.POSTS.LIST, {
        expire: 0,
      });
      revalidateTag(CACHE.POSTS.DETAIL(id.toString()), {
        expire: 0,
      });
      redirect("/posts");
    }
    const { data } = await response.json();
    return data;
  },
};

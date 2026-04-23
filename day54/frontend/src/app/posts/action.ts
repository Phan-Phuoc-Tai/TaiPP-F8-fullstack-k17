"use server";

import { redirect } from "next/navigation";
import { postService } from "../services/post.service";

export const deleteAction = async (id: number) => {
  await postService.delete(id);
  redirect("/posts");
};

import z from "zod";
import { POST } from "../constants/post.constant";

export const postSchema = z.object({
  title: z.string().trim().min(1, {
    message: POST.zodError.titleRequired,
  }),
  body: z.string().trim().min(1, {
    message: POST.zodError.bodyRequired,
  }),
});

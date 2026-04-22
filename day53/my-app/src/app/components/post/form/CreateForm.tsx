"use client";
import { POST } from "@/app/constants/post.constant";
import { postSchema } from "@/app/schema/post.schema";
import { FormPostData } from "@/app/types/post.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";

import { useForm } from "react-hook-form";
import { AppContext } from "../../AppProvider";
import { postService } from "@/app/services/post.service";
import { Textarea } from "@/components/ui/textarea";
import { AxiosError } from "axios";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
};
export default function CreateForm({ onClose }: Props) {
  const { addPost } = use(AppContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormPostData>({
    resolver: zodResolver(postSchema),
  });
  const onSubmit = async (data: FormPostData) => {
    try {
      const post = await postService.createPost(data);
      addPost(post);
      onClose();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(POST.fetchPostError.create);
      }
    }
  };
  return (
    <form
      className="my-2 flex flex-col gap-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="title" className="cursor-pointer">
        {POST.createForm.title}
      </label>
      <div className="mb-2">
        <Input
          id="title"
          className="focus-visible:ring-0 mb-1"
          placeholder={POST.createForm.placeHolderTitle}
          {...register("title")}
        />
        {errors.title?.message && (
          <p className="text-red-600">{errors.title.message}</p>
        )}
      </div>
      <label htmlFor="body" className="cursor-pointer">
        {POST.createForm.body}
      </label>

      <div className="mb-2">
        <Textarea
          id="body"
          className="focus-visible:ring-0 mb-1 h-auto"
          placeholder={POST.createForm.placeHolderBody}
          {...register("body")}
        />
        {errors.body?.message && (
          <p className="text-red-600">{errors.body.message}</p>
        )}
      </div>
      <Button
        disabled={!isValid || isSubmitting}
        className="mt-2 cursor-pointer"
      >
        {isSubmitting ? POST.createForm.submitting : POST.createForm.submit}
      </Button>
    </form>
  );
}

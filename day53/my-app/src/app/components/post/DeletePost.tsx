"use client";
import { POST } from "@/app/constants/post.constant";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import AlertModal from "../modal/AlertModal";
import { AppContext } from "../AppProvider";
import { postService } from "@/app/services/post.service";
import { AxiosError } from "axios";
import { toast } from "sonner";

type Props = {
  id: number;
};

export default function DeletePost({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { deletePost } = use(AppContext);
  const onContinue = async () => {
    try {
      const post = await postService.delete(id);
      deletePost(post);
      setOpen(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(POST.fetchPostError.delete);
      }
    }
  };
  return (
    <div className="mb-2">
      <Button
        className="bg-white text-red-600 hover:bg-red-100 w-full cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        {POST.options.delete}
      </Button>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        title={POST.confirmDelete.title}
        description={POST.confirmDelete.description}
        onContinue={onContinue}
      />
    </div>
  );
}

"use client";
import { POST } from "@/app/constants/post.constant";
import Modal from "../modal/Modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateForm from "./form/UpdateForm";
type Props = {
  id: number;
};

export default function UpdatePost({ id }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mb-2">
      <Button
        className="bg-white text-[#333] hover:bg-black/10 w-full cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        {POST.options.edit}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={POST.options.edit}
      >
        <UpdateForm onClose={() => setOpen(false)} id={id} />
      </Modal>
    </div>
  );
}

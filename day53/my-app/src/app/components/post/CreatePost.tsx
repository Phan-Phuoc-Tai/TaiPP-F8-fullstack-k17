"use client";
import { POST } from "@/app/constants/post.constant";
import { Button } from "@/components/ui/button";
import Modal from "../modal/Modal";
import { useState } from "react";
import CreateForm from "./form/CreateForm";

export default function CreatePost() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mb-2">
      <Button
        className="bg-amber-100 text-[#333] border border-amber-400 cursor-pointer hover:bg-amber-400 hover:text-white "
        onClick={() => {
          setOpen(true);
        }}
      >
        {POST.options.create}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={POST.options.create}
      >
        <CreateForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

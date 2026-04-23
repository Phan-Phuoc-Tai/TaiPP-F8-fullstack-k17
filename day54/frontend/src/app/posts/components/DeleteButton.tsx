"use client";
import { useState } from "react";
import { deleteAction } from "../action";

type Props = {
  id: number;
};
export default function DeleteButton({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setIsLoading(true);
        await deleteAction(id);
        setIsLoading(false);
      }}
      className="px-3 py-1 bg-red-500 text-white disabled:bg-red-300"
      disabled={isLoading}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}

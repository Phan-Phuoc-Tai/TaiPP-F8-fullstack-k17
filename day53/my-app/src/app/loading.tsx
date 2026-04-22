import { LoaderCircle } from "lucide-react";

export default function loading() {
  return (
    <div className="flex justify-center items-center text-xl">
      <LoaderCircle className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
}

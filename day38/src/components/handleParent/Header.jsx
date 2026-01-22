import { useAuth } from "@/stores/authStore";
import { DialogLogin } from "../handleChildren/DialogLogin";
import Logo from "../handleChildren/Logo";
import Nav from "../handleChildren/Nav";
import UserLogin from "../handleChildren/UserLogin";
import { Spinner } from "../ui/spinner";

export default function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <header>
      <div className="max-w-380 mx-auto flex items-center justify-between fixed top-0 left-0 right-0 z-40 bg-white py-2">
        <Logo />
        <Nav />

        {isLoading ? (
          <div className="flex items-center justify-center w-[145px]">
            <Spinner className={"w-6 h-6 border-black"} />
          </div>
        ) : isAuthenticated & !isLoading ? (
          <UserLogin />
        ) : (
          <DialogLogin />
        )}
      </div>
    </header>
  );
}

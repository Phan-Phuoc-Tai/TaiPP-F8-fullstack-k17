import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchema";
import { httpRequest } from "@/utils/httpRequest";
import { useAuth } from "@/stores/authStore";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
export function DialogLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setLoading] = useState(false);
  const API_AUTH = `https://api.escuelajs.co/api/v1/auth`;
  const { login } = useAuth();
  const onLogin = (data) => {
    const { email, password } = data;
    const handleLogin = async () => {
      try {
        setLoading(true);
        const response = await httpRequest.post(`${API_AUTH}/login`, {
          email,
          password,
        });
        if (response.status === 401) {
          throw new Error("Email or password isn't correct");
        }
        const data = response.data;
        login(data.access_token, data.refresh_token);
      } catch (error) {
        toast.error(error.message, { position: "top-right", richColors: true });
      } finally {
        setLoading(false);
      }
    };
    handleLogin();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={null}
          className="px-6 py-[9px] gap-3 rounded-full w-auto cursor-pointer"
        >
          <UserRound
            className="rounded-full bg-orange-400 text-black"
            style={{ width: 28, height: 24 }}
          />
          <span className="text-lg font-medium">Login/Signup</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <form onSubmit={handleSubmit(onLogin)}>
          <DialogHeader>
            <DialogTitle className={"text-center text-3xl"}>Login</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-2">
            <div className="grid gap-3">
              <Label htmlFor="email" className={"text-lg"}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email..."
                {...register("email")}
              />
              {errors?.email?.message && (
                <p className="text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password" className={"text-lg"}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password..."
                {...register("password")}
              />
              {errors?.password?.message && (
                <p className="text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className={"mt-3"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!isValid}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner></Spinner>
                  <span>Loading...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

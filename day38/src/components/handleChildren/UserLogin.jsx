import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { userCacheKey } from "@/caches/userCacheKey";

export default function UserLogin() {
  const { user, logout, getProfile } = useAuth();
  const { data } = useQuery({
    queryKey: userCacheKey.profile,
    queryFn: getProfile,
  });
  return (
    <div>
      <span className="text-lg font-medium">Hi, {user.name} </span>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}

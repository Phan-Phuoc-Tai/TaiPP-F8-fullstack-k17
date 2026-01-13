import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect } from "react";
import { useAuth } from "../stores/authStore";

export default function MainLayout() {
  const { getProfile} = useAuth();
  useEffect(()=>{
    getProfile()
  }, [])
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

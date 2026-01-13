import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";

export default function UserLayout() {
  const {user, getProfile, logout} = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(pathname);
  }
  useEffect(()=>{
    getProfile()
  }, [])
  return (
    <div >
      <div className="max-w-300 mx-auto flex items-center gap-2 py-3 border-b border-b-gray-800">
      <Link className="w-max px-2 py-1 border border-gray-600 rounded-lg" to={"/users"}>Dashboard</Link>
      <Link className="w-max px-2 py-1 border border-gray-600 rounded-lg" to={"#"}>Password</Link>
      <Link className="w-max px-2 py-1 border border-gray-600 rounded-lg" to={"#"}>Account</Link>
      <Link className="w-max px-2 py-1 border border-gray-600 rounded-lg" to={"#"}>My order</Link>
      {user.name ? (<div className="flex items-center gap-2">
        <h2 className="font-semibold">Hi, {user.name}</h2>
        <button className="outline-none px-2 py-1 rounded-md border border-gray-600 bg-gray-600 text-white hover:bg-gray-500 cursor-pointer" onClick={handleLogout}>Logout</button>
      </div>) : "Loading..."}
      </div>
      
      <Outlet />
    </div>
  );
}

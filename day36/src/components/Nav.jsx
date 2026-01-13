import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../stores/authStore";

export default function Nav() {
  const activeClass = ({ isActive }) => {
    return isActive
      ? "w-max px-2 py-1 border border-red-600 rounded-lg text-red-600 "
      : "w-max px-2 py-1 border border-gray-600 rounded-lg";
  };
  const {user, logout} = useAuth();
  const accessToken = localStorage.getItem('access_token');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(pathname);
  }
  return (
    <div className="max-w-300 mx-auto flex items-center gap-2 py-3 border-b border-b-gray-800">
      <NavLink className={activeClass} to="/">
        Home
      </NavLink>
      <NavLink className={activeClass} to="/about">
        About
      </NavLink>
      <NavLink className={activeClass} to="/products">
        Products
      </NavLink>
      <NavLink className={activeClass} to="/contact">
        Contact
      </NavLink>
      <NavLink className={accessToken ? "" : activeClass} to="/login">
        {accessToken ? "" : "Login"}
      </NavLink>
      {user.name ? (<div className="flex items-center gap-2">
        <h2 className="font-semibold">Hi, {user.name}</h2>
        <button className="outline-none px-2 py-1 rounded-md border border-gray-600 bg-gray-600 text-white hover:bg-gray-500 cursor-pointer" onClick={handleLogout}>Logout</button>
      </div>): <p>{accessToken ? "Loading..." : ""}</p>}
    </div>
  );
}

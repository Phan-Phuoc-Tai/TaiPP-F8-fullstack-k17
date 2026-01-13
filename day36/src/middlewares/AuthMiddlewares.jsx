import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthMiddlewares() {
  const isAuth = localStorage.getItem("access_token") ? true : false;
  const { pathname } = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login?continue=" + pathname} replace />
  );
}

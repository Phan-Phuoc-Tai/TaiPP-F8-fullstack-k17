import { Outlet } from "react-router-dom";

export default function RoleMiddlewares() {
  const isPermission = false;
  if (!isPermission) {
    return <h1>Access Deny</h1>;
  }
  return <Outlet />;
}

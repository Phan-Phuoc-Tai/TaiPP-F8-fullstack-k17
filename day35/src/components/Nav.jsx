import { NavLink } from "react-router-dom";

export default function Nav() {
  const handleStyles = ({ isActive }) => {
    const className = "px-2 py-4 text-xl font-medium";
    const classNameActive = "px-2 py-4 text-xl font-semibold text-red-500";
    return isActive ? classNameActive : className;
  };
  return (
    <nav className="px-2 py-4 border-b border-gray-500">
      <NavLink className={handleStyles} to="/">
        Home
      </NavLink>
      <NavLink className={handleStyles} to="/about">
        About
      </NavLink>
      <NavLink className={handleStyles} to="/products">
        Products
      </NavLink>
      <NavLink className={handleStyles} to="/contact">
        Contact
      </NavLink>
    </nav>
  );
}

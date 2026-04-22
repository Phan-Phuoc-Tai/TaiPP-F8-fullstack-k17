import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Users/Dashboard";
import MainLayout from "./layouts/MainLayout";
import UserLayout from "./layouts/UserLayout";
import AuthMiddlewares from "./middlewares/AuthMiddlewares";
import Login from "./pages/Login";
import Sales from "./pages/Users/Sales";
import RoleMiddlewares from "./middlewares/RoleMiddlewares";
import CreateOrder from "./pages/Users/CreateOrder";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route element={<AuthMiddlewares />}>
          <Route path="/users" element={<UserLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="order/:productId" element={<CreateOrder />} />
            <Route element={<RoleMiddlewares />}>
              <Route path="sales" element={<Sales />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

//Code-Based Route : reacts
//File-Based Route : nextjs

//Buổi sau:
// - Multi Layout
// - Protected Route

import { useEffect } from "react";
import AboutUs from "./components/handleParent/AboutUs";
import Categories from "./components/handleParent/Categories";
import Counter from "./components/handleParent/Counter";
import ExclusiveDeals from "./components/handleParent/ExclusiveDeals";
import Footer from "./components/handleParent/Footer";
import Header from "./components/handleParent/Header";
import HeroSection from "./components/handleParent/HeroSection";
import MobileAppBanner from "./components/handleParent/MobileAppBanner";
import Partner from "./components/handleParent/Partner";
import Restaurants from "./components/handleParent/Restaurants";
import { Toaster } from "./components/ui/sonner";
import { useAuth } from "./stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { userCacheKey } from "./caches/userCacheKey";

export default function App() {
  const { getProfile } = useAuth();
  const { data } = useQuery({
    queryKey: userCacheKey.profile,
    queryFn: getProfile,
  });

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ExclusiveDeals />
        <Categories />
        <Restaurants />
        <MobileAppBanner />
        <Partner />
        {/* <AboutUs /> */}
        <Counter />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

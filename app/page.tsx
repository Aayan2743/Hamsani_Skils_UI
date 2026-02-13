import HeroCarousel from "./components/HomePage/HeroCarousel";
import ShopByCategory from "./components/HomePage/ShopByCategory";
import BestSellers from "./components/HomePage/BestSellers";
import PromoBanner from "./components/HomePage/PromoBanner";
import NewArrivals from "./components/HomePage/NewArrivals";
import InstagramCarousel from "./components/HomePage/InstagramCarousel";
import Features from "./components/HomePage/Features";

export default function Home() {
  return (
    <div className="bg-[#F5F5DC] min-h-screen">
      <HeroCarousel />
      <ShopByCategory />
      <BestSellers />
      <PromoBanner />
      <NewArrivals />
      <InstagramCarousel />
      <Features />
    </div>
  );
}

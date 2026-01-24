import Image from "next/image";
import HeroSection from "./components/HeroSection";
import KanjivaramBanners from "./components/KanjivaramBanners";
import SoftSilkBanner from "./components/SoftSilkBanner";
import Maps from "./components/Maps";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black font-sans min-h-screen">
      <HeroSection/>
   <KanjivaramBanners/>
   <SoftSilkBanner/>
   <Maps/>
    </div>
  );
}

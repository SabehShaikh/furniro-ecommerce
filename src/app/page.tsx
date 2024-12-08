import Hero from "@/components/HeroOne";
import Hero2 from "@/components/Herosectiontwo";
import CustomComponent from "@/components/BeautifulRooms";
// import GalleryComponent from "@/components/Setup";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div>
      <Hero />
      <Hero2 />
      <Products />
      <CustomComponent />
      {/* <GalleryComponent /> */}
    </div>
  );
}

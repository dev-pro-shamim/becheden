import { fetchExtraData } from "@/services/promo";
import HeroCarousel from "./HeroCarousel";

const Hero = async () => {
  const res = await fetchExtraData();
  const extraData = res?.success ? res.data : null;

  const carouselImages = [
    { id: 1, imageSrc: extraData?.adImage1 || "/images/hero_image3.jpeg" },
    { id: 2, imageSrc: extraData?.adImage2 || "/images/hero_image2.jpeg" },
    { id: 3, imageSrc: extraData?.adImage3 || "/images/hero_image1.jpeg" },
    { id: 4, imageSrc: extraData?.adImage4 || "/images/hero_image4.jpeg" },
    // { id: 5, imageSrc: extraData?.adImage5 || "/images/hero5.png" },
  ];

  const sideAds = {
    top: {
      image: extraData?.adImage6 || "/images/hero4.png",
      link: extraData?.link1 || "#"
    },
    bottom: {
      image: extraData?.adImage7 || "/images/hero5.png",
      link: extraData?.link2 || "#"
    },
  };

  return (
    <section className="relative pt-4 lg:pt-8">
      <div className="custom-width mx-auto px-4">
        <HeroCarousel carouselImages={carouselImages} sideAds={sideAds} />
      </div>
    </section>
  );
};

export default Hero;

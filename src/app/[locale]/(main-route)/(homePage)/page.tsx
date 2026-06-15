import Category from "@/components/home/Category";
import HeroSection from "@/components/home/HeroSection";
import TrustBadges from "@/components/home/TrustBadges";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import LatestAds from "@/components/home/LatestAds";
import CTASection from "@/components/home/CTASection";
import Newsletter from "@/components/home/Newsletter";
import { fetchFeaturedAds, fetchLatestAds } from "@/services/ads";

export default async function Home() {
  const [featured, latest] = await Promise.all([
    fetchFeaturedAds({ limit: 12 }),
    fetchLatestAds({ limit: 12 }),
  ]);

  return (
    <>
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Stats Counter */}
      <TrustBadges />

      {/* Categories */}
      <Category />

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Products */}
      <FeaturedProducts ads={featured.data || []} />

      {/* Testimonials */}
      <Testimonials />

      {/* Latest Ads */}
      <LatestAds ads={latest.data || []} />

      {/* CTA */}
      <CTASection />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

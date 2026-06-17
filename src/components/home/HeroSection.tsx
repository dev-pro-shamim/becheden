import { fetchAllCategories } from "@/services/category";
import { fetchExtraData } from "@/services/promo";
import { getTranslations } from "next-intl/server";
import HeroSearch from "./HeroSearch";
import HeroImageCarousel from "./HeroImageCarousel";

const HeroSection = async () => {
  const [categoriesRes, extraDataRes] = await Promise.allSettled([
    fetchAllCategories(),
    fetchExtraData(),
  ]);

  const categories =
    categoriesRes.status === "fulfilled" && categoriesRes.value.success
      ? categoriesRes.value.data
      : [];
  const extraData =
    extraDataRes.status === "fulfilled" && extraDataRes.value.success
      ? extraDataRes.value.data
      : null;

  const heroImages = [
    { id: 1, src: extraData?.adImage1 || "/images/hero_image1.jpeg" },
    { id: 2, src: extraData?.adImage2 || "/images/hero_image2.jpeg" },
    { id: 3, src: extraData?.adImage3 || "/images/hero_image1.jpeg" },
    { id: 4, src: extraData?.adImage4 || "/images/hero_image4.jpeg" },
  ];
  const t = await getTranslations("HeroSection");

  return (
    <section className="relative overflow-hidden pt-6 lg:pt-10">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-125 w-125 rounded-full bg-primary/10 blur-3xl" />

      <div className="custom-width mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="relative z-10 space-y-6 lg:space-y-8 py-8 lg:py-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary dark:bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              {t("badge")}
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground">
                <span className="text-primary">{t("heading")}</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground">
                {t("subheading")}
              </p>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t("description")}
            </p>

            {/* Search */}
            <HeroSearch categories={categories} />

            {/* Quick Stats */}
            <div className="hidden md:flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary dark:bg-primary/20 text-primary text-xs font-bold">
                  10K+
                </span>
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary dark:bg-primary/20 text-primary text-xs font-bold">
                  5K+
                </span>
                <span className="text-sm text-muted-foreground">Listings</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary dark:bg-primary/20 text-primary text-xs font-bold">
                  100%
                </span>
                <span className="text-sm text-muted-foreground">Trusted</span>
              </div>
            </div>
          </div>

          {/* Right: Image Carousel */}
          <div className="relative lg:py-8">
            <div className="relative aspect-4/3 lg:aspect-auto lg:h-145 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <HeroImageCarousel images={heroImages} />
              <div className="absolute inset-0 bg-linear-to-t from-primary/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

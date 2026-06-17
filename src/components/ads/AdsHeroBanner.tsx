"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { useTranslations } from "next-intl";

const AdsHeroBanner = () => {
  const t = useTranslations("Ads");
  const { getFilter, updateFilter } = useSmartFilter();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-background to-secondary/50 dark:from-primary/10 dark:via-background dark:to-primary/5 border border-border/40 shadow-sm">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 px-6 py-10 md:px-10 md:py-14">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              {t("bannerTitle")}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("bannerSubtitle")}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("bannerSearchPlaceholder")}
              defaultValue={getFilter("searchTerm")}
              onChange={(e) => updateFilter("searchTerm", e.target.value, 500)}
              className="h-14 w-full bg-card dark:bg-card border-border/60 pl-12 pr-4 text-base rounded-lg shadow-lg shadow-primary/5 focus-visible:ring-primary/30"
            />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("bannerActiveListings")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("bannerCategories")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("bannerCities")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsHeroBanner;

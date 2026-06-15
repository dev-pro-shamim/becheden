import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Ad } from "@/types/ad.type";
import { useTranslations } from "next-intl";

interface LatestAdsProps {
  ads: Ad[];
}

export default function LatestAds({ ads }: LatestAdsProps) {
  const t = useTranslations("Home");

  return (
    <section className="py-16 lg:py-20 bg-linear-to-b from-secondary/50 to-transparent dark:from-primary/5">
      <div className="custom-width mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary dark:bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary mb-3">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              New Arrivals
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("latestTitle")}</h2>
          </div>
          <Link href="/ads" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
            {t("seeAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        {(!ads || ads.length === 0) ? (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-2xl border border-dashed border-border dark:border-primary/20">
            <p>{t("noLatestAds")}</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ads.map((ad) => (
              <Link
                key={ad._id || ad.id}
                href={`/ads/${ad._id || ad.id}`}
                className="group rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40"
              >
                <div className="aspect-6/5 relative">
                  <Image
                    src={ad.coverImage || "/placeholder.png"}
                    alt={ad.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-3">
                  <div className="line-clamp-1 font-medium group-hover:text-primary transition-colors">
                    {ad.title}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-primary">৳ {ad.price.toLocaleString()}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary/60" />
                    {ad.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

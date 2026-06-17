import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Ad } from "@/types/ad.type";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/common/SectionHeader";

interface LatestAdsProps {
  ads: Ad[];
}

export default function LatestAds({ ads }: LatestAdsProps) {
  const t = useTranslations("Home");

  return (
    <section className="py-10 bg-linear-to-b from-secondary/50 to-transparent dark:from-primary/5">
      <div className="custom-width mx-auto px-4">
        <SectionHeader 
          title={t("latestTitle")}
          actionLink={{ text: t("seeAll"), href: "/ads" }}
        />
        
        {(!ads || ads.length === 0) ? (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-lg border border-dashed border-border dark:border-primary/20">
            <p>{t("noLatestAds")}</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ads.map((ad) => (
              <Link
                key={ad._id || ad.id}
                href={`/ads/${ad._id || ad.id}`}
                className="group rounded-lg border border-border/50 bg-card shadow-sm overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40"
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

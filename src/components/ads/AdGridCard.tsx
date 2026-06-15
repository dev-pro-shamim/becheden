"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Ad } from '@/types/ad.type';
import { cn, timeAgo } from '@/lib/utils';
import { useState } from 'react';
import { addFavorite, removeFavorite } from '@/services/favorite';
import { SuccessToast, ErrorToast, WarningToast } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useTranslations } from 'next-intl';

interface AdGridCardProps {
  ad: Ad;
  isFavoriteInitial?: boolean;
}

export const AdGridCard = ({ ad, isFavoriteInitial = false }: AdGridCardProps) => {
  const t = useTranslations('Ads');
  const { user } = useUser();
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      WarningToast(t('favLogin'));
      return;
    }
    
    if (loading) return;
    setLoading(true);

    try {
      const apiCall = isFavorite ? removeFavorite : addFavorite;
      const res = await apiCall(ad._id || ad.id);

      if (res.success) {
        setIsFavorite(!isFavorite);
        SuccessToast(isFavorite ? t('favRemove') : t('favAdd'));
      } else {
        ErrorToast(res.message);
      }
    } catch {
      ErrorToast(t('somethingWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-border/40 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
      <Link href={`/ads/${ad.id}`} className="flex h-full flex-col">
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={ad.coverImage || "/placeholder-image.png"}
            alt={ad.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 45vw, 90vw"
          />
          {/* Image Hover Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex gap-2">
            {ad.isFeatured ? (
              <Badge className="rounded-full bg-amber-500 text-white border-none shadow-sm">
                {t('featured')}
              </Badge>
            ) : null}
            {ad.isUrgent ? (
              <Badge className="rounded-full bg-red-500 text-white border-none shadow-sm">
                {t('urgent')}
              </Badge>
            ) : null}
          </div>

          {/* Favorite Button */}
          <button
            type="button"
            disabled={loading}
            className={cn(
              "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all duration-200 z-10 scale-100 hover:scale-110 active:scale-90",
              isFavorite
                ? "border-red-200 bg-red-50 text-red-500 dark:bg-red-900/30 dark:border-red-800"
                : "border-border/40 bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40"
            )}
            onClick={handleFavorite}
          >
            <Heart className={cn("h-4 w-4 transition-all", isFavorite && "fill-current")} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <h3 className="line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {ad.title}
          </h3>
          <p className="text-lg font-bold text-primary tracking-tight">
            ৳&nbsp;{ad.price.toLocaleString()}
          </p>

          {/* Meta Footer */}
          <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/20">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary/60" />
              {ad.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground/60" />
              {timeAgo(ad.postedAt)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

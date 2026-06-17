"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Ad } from '@/types/ad.type';
import { cn, timeAgo } from '@/lib/utils';
import { useState } from 'react';
import { addFavorite, removeFavorite } from '@/services/favorite';
import { SuccessToast, ErrorToast, WarningToast } from '@/lib/utils';
import { useUser } from '@/context/UserContext';
import { useTranslations } from 'next-intl';

interface AdListCardProps {
  ad: Ad;
  isFavoriteInitial?: boolean;
}

export const AdListCard = ({ ad, isFavoriteInitial = false }: AdListCardProps) => { 
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
    <article className="group relative overflow-hidden rounded-lg border border-border/40 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
      <Link href={`/ads/${ad.id}`} className="flex h-full">
        {/* Image */}
        <div className="relative w-36 sm:w-44 shrink-0 overflow-hidden">
          <Image
            src={ad.coverImage || "/placeholder-image.png"}
            alt={ad.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
            sizes="176px"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex gap-1.5">
            {ad.isFeatured ? (
              <Badge className="rounded-full bg-amber-500 text-white text-xs px-2 py-0.5 border-none">
                {t('featured')}
              </Badge>
            ) : null}
            {ad.isUrgent ? (
              <Badge className="rounded-full bg-red-500 text-white text-xs px-2 py-0.5 border-none">
                {t('urgent')}
              </Badge>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 min-w-0">
          <div className="space-y-1.5">
            <h3 className="line-clamp-1 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
              {ad.title}
            </h3>
            <p className="text-lg font-bold text-primary">
              ৳&nbsp;{ad.price.toLocaleString()}
            </p>
          </div>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary/60" />
              {ad.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground/60" />
              {timeAgo(ad.postedAt)}
            </span>
            {ad.views !== undefined && (
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-muted-foreground/60" />
                {ad.views} views
              </span>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          disabled={loading}
          className={cn(
            "absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-all duration-200 z-10 scale-100 hover:scale-110 active:scale-90",
            isFavorite
              ? "border-red-200 bg-red-50 text-red-500 dark:bg-red-900/30 dark:border-red-800"
              : "border-border/40 bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40"
          )}
          onClick={handleFavorite}
        >
          <Heart className={cn("h-4 w-4 transition-all", isFavorite && "fill-current")} />
        </button>
      </Link>
    </article>
  );
};

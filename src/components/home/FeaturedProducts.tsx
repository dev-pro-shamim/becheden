import Link from 'next/link';
import ListingCard from '@/components/ads/ListingCard';
import { Ad } from '@/types/ad.type';
import { timeAgo } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  ads: Ad[];
}

export default function FeaturedProducts({ ads }: FeaturedProductsProps) {
  const t = useTranslations('Home');

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="custom-width mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary dark:bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary mb-3">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              Premium
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t('featuredTitle')}</h2>
          </div>
          <Link href="/ads" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
            {t('seeAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        {(!ads || ads.length === 0) ? (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-2xl border border-dashed border-border dark:border-primary/20">
            <p>{t('noFeaturedAds')}</p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {ads.map(ad => (
              <ListingCard 
                key={ad._id || ad.id} 
                id={ad._id || ad.id}
                title={ad.title}
                price={`৳ ${ad.price.toLocaleString()}`}
                location={ad.location}
                postedAt={ad.postedAt ? timeAgo(ad.postedAt) : ""}
                imageUrl={ad.coverImage || "/placeholder.png"}
                isFeatured={ad.isFeatured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

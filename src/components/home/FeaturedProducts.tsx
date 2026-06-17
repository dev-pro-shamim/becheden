import ListingCard from '@/components/ads/ListingCard';
import { Ad } from '@/types/ad.type';
import { timeAgo } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import SectionHeader from '@/components/common/SectionHeader';

interface FeaturedProductsProps {
  ads: Ad[];
}

export default function FeaturedProducts({ ads }: FeaturedProductsProps) {
  const t = useTranslations('Home');

  return (
    <section className="py-10 relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="custom-width mx-auto px-4">
        <SectionHeader 
          title={t('featuredTitle')}
          actionLink={{ text: t('seeAll'), href: '/ads' }}
        />
        
        {(!ads || ads.length === 0) ? (
          <div className="text-center py-16 text-muted-foreground bg-card rounded-lg border border-dashed border-border dark:border-primary/20">
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

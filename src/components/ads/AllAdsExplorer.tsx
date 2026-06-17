'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListTree, Grid3X3, List, Search, Globe, LayoutGrid } from 'lucide-react';
import { AdListCard } from '@/components/ads/AdListCard';
import { AdGridCard } from '@/components/ads/AdGridCard';
import Filters from '@/components/ads/filters';
import { LocationSelector } from '@/components/ads/LocationSelector';

import { Category } from '@/types/category.type';
import { Ad, AdMeta } from '@/types/ad.type';
import { useSmartFilter } from '@/hooks/useSmartFilter';
import CustomPagination from '@/tools/CustomPagination';
import NoAdsComponent from './NoAdsComponent';
import { useTranslations } from 'next-intl';

type Props = {
  listings: Ad[];
  categories: Category[];
  meta?: AdMeta;
  favoriteIds?: string[];
};

export default function AllAdsExplorer({
  listings,
  categories,
  meta,
  favoriteIds = [],
}: Props) {
  const t = useTranslations('Ads');
  const { getFilter, updateFilter } = useSmartFilter();
  const currentView = getFilter('view') || 'list';

  return (
    <section className="space-y-6">

      {/* ===== Tabs wrap both controls bar + listings ===== */}
      <Tabs
        value={currentView}
        onValueChange={(val) => updateFilter('view', val)}
        className="w-full space-y-6"
      >
        {/* Stats + Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-lg border border-border/40 bg-card/50 dark:bg-card/30 px-5 py-4 shadow-xs">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t('showingAds', { count: listings.length })}
              </p>
              {meta && (
                <p className="text-xs text-muted-foreground">
                  {t('outOfTotal', { total: meta.total })}
                </p>
              )}
            </div>
          </div>

          {/* Right Group: Search + Location + View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Location */}
            <LocationSelector className="h-10 w-40 shadow-none border-border/60 hidden sm:flex" />

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t('searchPlaceholder')}
                defaultValue={getFilter('searchTerm')}
                onChange={(e) => updateFilter('searchTerm', e.target.value, 500)}
                className="h-10 pl-9 pr-4 rounded-lg bg-background border-border/60 w-full shadow-none text-sm"
              />
            </div>

            <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
              {/* Mobile Filter Trigger */}
              <div className="sm:hidden">
                <Filters showAsSheet={true} categories={categories} />
              </div>

              {/* View Toggle */}
              <TabsList className="grid grid-cols-2 w-28 h-10 p-1 rounded-lg bg-muted shrink-0">
                <TabsTrigger value="list" className="rounded-lg text-xs gap-1.5 data-[state=active]:shadow-xs">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('listView')}</span>
                </TabsTrigger>
                <TabsTrigger value="grid" className="rounded-lg text-xs gap-1.5 data-[state=active]:shadow-xs">
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t('gridView')}</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Sidebar Filters — Desktop */}
          <div className="hidden lg:block">
            <Filters categories={categories} />
          </div>

          {/* Listings */}
          <div className="min-h-125">
            <TabsContent value="list" className="mt-0">
              {listings.length === 0 ? (
                <NoAdsComponent />
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    {listings.map((listing, idx) => (
                      <div
                        key={listing.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
                      >
                        <AdListCard
                          ad={listing}
                          isFavoriteInitial={favoriteIds.includes(listing._id || listing.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {meta && meta.totalPage > 1 && (
                    <div className="mt-10 flex justify-center pt-6 border-t border-border/30">
                      <CustomPagination
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="grid" className="mt-0">
              {listings.length === 0 ? (
                <NoAdsComponent />
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {listings.map((listing, idx) => (
                      <div
                        key={listing.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
                      >
                        <AdGridCard
                          ad={listing}
                          isFavoriteInitial={favoriteIds.includes(listing._id || listing.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {meta && meta.totalPage > 1 && (
                    <div className="mt-10 flex justify-center pt-6 border-t border-border/30">
                      <CustomPagination
                        currentPage={meta.page}
                        totalPages={meta.totalPage}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* ===== Trust Badges ===== */}
      <section className="grid gap-6 rounded-lg border border-border/30 bg-card/50 dark:bg-card/30 p-8 md:grid-cols-3 shadow-xs mt-8">
        <div className="flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm rounded-lg p-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">{t('whySellTitle')}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('whySellDesc')}</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm rounded-lg p-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <ListTree className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">{t('secureTransTitle')}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{t('secureTransDesc')}</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm rounded-lg p-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">{t('needHelpTitle')}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.rich('needHelpDesc', {
              phone: (chunks) => <span className="text-primary font-bold">{chunks}</span>,
              phoneNumber: '01302-000000'
            })}
          </p>
        </div>
      </section>
    </section>
  );
}
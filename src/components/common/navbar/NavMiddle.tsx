'use client';

import { useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Menu,
  MessageCircle,
  User,
  ListTree,
  Globe,
  PlusCircle,
  Heart,
  Loader2,
  LogOut,
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CategoryModal from './CategoryModal';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUser } from '@/context/UserContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Category } from '@/types/category.type';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { logOut } from '@/services/Auth';
import { protectedRoutes } from '@/constants';

const NavMiddle = ({ categories, logo }: { categories: Category[]; logo?: string | null }) => {
  const { user, setIsLoading, setUser } = useUser();
  const { isBuyer } = useUserRole();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  const handleLogout = async () => {
    await logOut();
    setIsLoading(true);
    setUser(null);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push(`/auth/login?redirectPath=${pathname}`);
    }
  };

  return (
    <div>
      <div className="custom-width mx-auto flex items-center justify-between py-2.5 px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo || "/logo.png"}
            alt="becheben"
            width={100}
            height={20}
            unoptimized
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Primary Actions - Centered */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-2">
          {/* Categories Modal */}
          <CategoryModal categories={categories} />

          <Link
            href="/ads"
            className="group h-9 flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            <ListTree className="h-4 w-4 text-primary-foreground/80" />
            <span>{t('browseListings')}</span>
          </Link>

          <Button
            onClick={handleLanguageChange}
            disabled={isPending}
            className="h-9 flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary-foreground/80" />
            ) : (
              <Globe className="h-4 w-4 text-primary-foreground/80" />
            )}
            <span>{locale === 'en' ? 'বাংলা' : 'English'}</span>
          </Button>
        </div>

        {/* Desktop Utility Links */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <Link href={user ? "/chat" : "/auth/login?redirectPath=/chat"}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-md bg-primary-foreground/5 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/15 w-9 h-9"
              title={t('inbox')}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>

          {!isBuyer && (
            <Link href={user ? "/ads/create" : "/auth/login?redirectPath=/ads/create"}>
              <Button
                size="sm"
                className="h-9 flex items-center gap-2 rounded-md bg-linear-to-r from-blue-600 to-violet-600 px-5 text-sm font-bold text-white hover:from-blue-500 hover:to-violet-500 shadow-md transition-all"
              >
                <PlusCircle className="h-4 w-4" />
                {t('postFreeAd')}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile & Tablet View */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Favorites Button */}
          <Link href={user ? "/profile/favourites" : "/auth/login?redirectPath=/profile/favourites"}>
            <Button
              size="icon"
              className="flex items-center justify-center rounded-md bg-primary-foreground/5 border border-primary-foreground/20 px-3 py-2 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary-foreground/15 w-9 h-9"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </Link>

          {/* Main Menu (Mobile) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="flex items-center justify-center rounded-md bg-primary-foreground/5 px-3 py-2 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary-foreground/15 w-9 h-9 border border-primary-foreground/20"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-75 border-l border-border bg-background/95 p-0 text-foreground backdrop-blur-xl shadow-2xl z-10000"
            >
              <SheetHeader className="px-5 h-16 border-b border-border bg-primary flex flex-col justify-center">
                <SheetTitle className="flex items-center justify-between w-full">
                  <Link href="/" className="inline-flex">
                    <Image
                      src={logo || "/logo.png"}
                      alt="logo"
                      width={200}
                      height={50}
                      className="h-auto w-36 sm:w-44"
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <ScrollArea className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-5 px-4 pb-5 pt-4">
                  {/* Explore Section */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground px-1">
                      {t('explore')}
                    </p>
                    <Link
                      href="/ads"
                      className="group flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent hover:border-accent"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <ListTree className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span>{t('browseListings')}</span>
                    </Link>

                    {/* Categories Grid */}
                    <div className="space-y-2.5 mt-4">
                       <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground px-1">
                        {t('categories')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                         {categories.slice(0, 6).map(category => (
                          <Link
                            key={category._id}
                            href={`/ads?category=${category.slug}`}
                            className="group flex flex-col items-center gap-1.5 p-2 rounded-md border border-border bg-card transition hover:bg-accent hover:border-accent text-center"
                          >
                             {category.icon && (
                              <div className="relative w-5 h-5 transition-transform group-hover:scale-110">
                                <Image src={category.icon} alt={category.name} fill sizes="20px" className="object-contain dark:invert brightness-0 opacity-70 group-hover:opacity-100" />
                              </div>
                            )}
                            <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground">{category.name}</span>
                          </Link>
                        ))}
                      </div>
                      <Link href="/ads" className="block text-center text-[11px] font-medium text-muted-foreground hover:text-primary transition-colors py-0.5 mt-1">
                        {t('viewAllCategories')} →
                      </Link>
                    </div>
                  </div>

                  {/* Settings & Account */}
                  <div className="space-y-2.5">
                     <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground px-1">
                      {t('settings')}
                    </p>
                    <Button
                      onClick={handleLanguageChange}
                      disabled={isPending}
                      variant="outline"
                      className="w-full h-9 justify-start flex items-center gap-2.5 rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground transition hover:bg-accent hover:border-accent disabled:opacity-70"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                        {isPending ? (
                          <Loader2 className="h-3 w-3 animate-spin text-primary" />
                        ) : (
                          <Globe className="h-3 w-3 text-primary" />
                        )}
                      </div>
                      <span>{locale === 'en' ? 'বাংলা' : 'English'}</span>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      {user && (
                        <Link
                          href="/chat"
                          className="group flex flex-col items-center gap-1 rounded-md border border-border bg-card p-2 text-sm text-foreground transition hover:bg-accent hover:border-accent"
                        >
                          <MessageCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                          <span className="text-[10px] font-medium">{t('inbox')}</span>
                        </Link>
                      )}
                      <Link
                        href={user ? '/profile' : '/auth/login'}
                        className={`group flex flex-col items-center gap-1 rounded-md border border-border bg-card p-2 text-sm text-foreground transition hover:bg-accent hover:border-accent ${!user ? 'col-span-2' : ''}`}
                      >
                        <User className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[10px] font-medium">{user ? t('profile') : t('signIn')}</span>
                      </Link>
                    </div>

                    {user && (
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full h-9 justify-start flex items-center gap-2.5 rounded-md border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 px-3 text-sm font-medium text-red-600 dark:text-red-500 transition hover:bg-red-100 dark:hover:bg-red-900/20"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
                          <LogOut className="h-3.5 w-3.5" />
                        </div>
                        <span>{t('logout')}</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                {!isBuyer && (
                  <div className="px-4 py-4 mt-auto border-t border-border/50 bg-muted/10">
                    <Link href="/ads/create">
                      <Button className="w-full h-10 gap-2 rounded-md bg-linear-to-r from-blue-600 to-violet-600 text-sm font-bold text-white shadow-md hover:from-blue-500 hover:to-violet-500 transition-all active:scale-[0.98]">
                        <PlusCircle className="h-4 w-4" />
                        {t('postFreeAd')}
                      </Button>
                    </Link>
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default NavMiddle;

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MenuIcon, LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/i18n/routing';
import { Category } from '@/types/category.type';

export default function CategoryModal({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Navbar');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground/10 shrink-0">
          <MenuIcon className="h-4 w-4" />
          <span>{t('categories')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border-border p-0 overflow-hidden shadow-xl rounded-lg z-10000">
        <DialogHeader className="px-5 py-4 border-b border-border bg-muted/30">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <LayoutGrid className="w-4 h-4 text-primary" />
            {t('categories')}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <ScrollArea className="max-h-[50vh] pr-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-2">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/ads?category=${category.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex flex-col items-center justify-center p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/50 transition-colors hover:border-border text-center"
                >
                  {category.icon && (
                    <div className="relative w-10 h-10 mb-2 transition-transform duration-200 group-hover:scale-105">
                      <Image 
                        src={category.icon} 
                        alt={category.name} 
                        fill 
                        sizes="40px" 
                        className="object-contain dark:invert brightness-0 opacity-70 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                  )}
                  <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}


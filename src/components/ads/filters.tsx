"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/types/category.type";
import { CategorySkeleton } from "./CategorySkeleton";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export const sortOptions = [
  { value: "newest", label: "Date: Newest first" },
  { value: "oldest", label: "Date: Oldest first" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export const locationOptions = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chattogram", label: "Chattogram" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
];

export type FiltersProps = {
  categories: Category[];
  showAsSheet?: boolean;
};

const FiltersContent = ({ categories }: { categories: Category[] }) => {
  const t = useTranslations("Ads");
  const { updateFilter, updateBatch, clearAll, getFilter } = useSmartFilter();

  const selectedCategory = getFilter("category");
  const selectedCondition = getFilter("condition");
  
  const minPrice = getFilter("minPrice") ? Number(getFilter("minPrice")) : 0;
  const maxPrice = getFilter("maxPrice") ? Number(getFilter("maxPrice")) : 100000;
  
  // Local state for smooth slider interaction
  const [localPrice, setLocalPrice] = useState<[number, number]>([minPrice, maxPrice]);

  const hasPriceFilter = getFilter("minPrice") || getFilter("maxPrice");
  const appliedCount = (selectedCategory ? 1 : 0) + (selectedCondition ? 1 : 0) + (hasPriceFilter ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{t("refineResults")}</p>
          <p className="text-xs text-muted-foreground">
            {appliedCount} {appliedCount === 1 ? "filter applied" : "filters applied"}
          </p>
        </div>
        {appliedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 text-muted-foreground hover:text-primary"
            onClick={() => {
              clearAll(["page", "limit", "sort", "location", "searchTerm", "view"]);
              setLocalPrice([0, 100000]);
            }}
          >
            <RotateCcw className="h-3 w-3" />
            {t("reset")}
          </Button>
        )}
      </header>

      {/* Applied Filter Chips */}
      {(selectedCategory || selectedCondition || hasPriceFilter) && (
        <div className="flex flex-wrap gap-1.5">
          {selectedCategory && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 dark:bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary">
              {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              <button type="button" onClick={() => updateFilter("category", null)} className="hover:bg-primary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {selectedCondition && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 dark:bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary">
              {selectedCondition}
              <button type="button" onClick={() => updateFilter("condition", null)} className="hover:bg-primary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {hasPriceFilter && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 dark:bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary">
              ৳{minPrice.toLocaleString()}–{maxPrice.toLocaleString()}
              <button type="button" onClick={() => { updateBatch({ minPrice: null, maxPrice: null }); setLocalPrice([0, 100000]); }} className="hover:bg-primary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}

      <Accordion type="multiple" defaultValue={["category", "condition", "price"]} className="space-y-3">
        {/* Category Filter */}
        <AccordionItem value="category" className="rounded-lg border border-border/40 bg-card/50 dark:bg-card/30 shadow-xs overflow-hidden">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-primary/5 transition-colors">
            <span className="flex items-center gap-2">
              {t("category")}
              {selectedCategory && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-1">
            {categories.length > 0 ? (
              <div className="space-y-1">
                {/* "All" option */}
                <button
                  type="button"
                  onClick={() => updateFilter("category", null)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 active:scale-[0.98]",
                    !selectedCategory
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:translate-x-0.5"
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => updateFilter("category", cat.slug)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 active:scale-[0.98]",
                      selectedCategory === cat.slug
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:translate-x-0.5"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            ) : (
              <CategorySkeleton />
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Condition Filter */}
        <AccordionItem value="condition" className="rounded-lg border border-border/40 bg-card/50 dark:bg-card/30 shadow-xs overflow-hidden">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-primary/5 transition-colors">
            <span className="flex items-center gap-2">
              {t("condition")}
              {selectedCondition && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-1">
            {/* Segmented control */}
            <div className="flex rounded-lg bg-muted p-1">
              {["new", "used"].map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => updateFilter("condition", selectedCondition === cond ? null : cond)}
                  className={cn(
                    "flex-1 px-4 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 capitalize",
                    selectedCondition === cond
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(cond)}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price" className="rounded-lg border border-border/40 bg-card/50 dark:bg-card/30 shadow-xs overflow-hidden">
          <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-primary/5 transition-colors">
            <span className="flex items-center gap-2">
              {t("priceRange")}
              {hasPriceFilter && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
              )}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-1">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">৳ {localPrice[0].toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">to</span>
                  <span className="text-sm text-foreground">৳ {localPrice[1].toLocaleString()}</span>
                </div>
                <Slider
                  min={0}
                  max={100000}
                  step={100}
                  value={localPrice}
                  onValueChange={(val) => setLocalPrice(val as [number, number])}
                  onValueCommit={(val) => updateBatch({ 
                    minPrice: val[0] === 0 ? null : val[0], 
                    maxPrice: val[1] === 100000 ? null : val[1] 
                  })}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("minPrice")}</span>
                <span>{t("maxPrice")}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const Filters = ({ categories = [], showAsSheet = false }: FiltersProps) => {
  const { getFilter } = useSmartFilter();
  const activeCount = ["category", "condition", "minPrice", "maxPrice"].filter(k => getFilter(k)).length;

  if (showAsSheet) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden h-10 rounded-lg relative px-4">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                {activeCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <SheetHeader className="pb-2 border-b border-border/40">
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Filters
              {activeCount > 0 && (
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {activeCount}
                </span>
              )}
            </SheetTitle>
            <SheetDescription>
              Refine your search results.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(85vh-100px)] px-1 mt-4">
            <FiltersContent categories={categories} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="rounded-3xl border border-border/40 bg-card/50 dark:bg-card/30 p-6 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-5 px-1">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h2 className="font-bold text-base text-foreground">Filters</h2>
        {activeCount > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1.5">
            {activeCount}
          </span>
        )}
      </div>
      <FiltersContent categories={categories} />
    </aside>
  );
};

export default Filters;

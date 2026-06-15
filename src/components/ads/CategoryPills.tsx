"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import { Category } from "@/types/category.type";

interface CategoryPillsProps {
  categories: Category[];
}

const CategoryPills = ({ categories }: CategoryPillsProps) => {
  const { getFilter, updateFilter } = useSmartFilter();
  const selectedCategory = getFilter("category");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!categories.length) return null;

  return (
    <div className="relative group/pills">
      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-card border border-border/60 shadow-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all opacity-0 group-hover/pills:opacity-100 -ml-3"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Pills Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 px-0.5"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* "All" pill */}
        <button
          type="button"
          onClick={() => updateFilter("category", null)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border active:scale-95",
            !selectedCategory
              ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
              : "bg-secondary dark:bg-primary/10 text-muted-foreground hover:text-foreground border-border/60 hover:border-primary/40"
          )}
        >
          All
        </button>

        {/* Category Pills */}
        {categories.map((cat) => (
          <button
            key={cat._id}
            type="button"
            onClick={() => updateFilter("category", cat.slug)}
            className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border whitespace-nowrap active:scale-95",
              selectedCategory === cat.slug
                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                : "bg-secondary dark:bg-primary/10 text-muted-foreground hover:text-foreground border-border/60 hover:border-primary/40"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center h-9 w-9 rounded-full bg-card border border-border/60 shadow-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all opacity-0 group-hover/pills:opacity-100 -mr-3"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CategoryPills;

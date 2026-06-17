"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category.type";

interface HeroSearchProps {
  categories: Category[];
}

const HeroSearch = ({ categories }: HeroSearchProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("searchTerm", searchQuery.trim());
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    router.push(`/ads?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 sm:gap-0 w-full max-w-2xl">
      {/* Category Dropdown */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="data-[size=default]:h-12 w-full sm:w-44 rounded-lg sm:rounded-r-none border-input bg-background px-4 text-sm shadow-xs">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat._id} value={cat.slug}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative flex-1">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="h-12 w-full border-input bg-background px-4 pl-11 text-sm sm:rounded-none rounded-lg shadow-xs"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>

      {/* Search Button */}
      <Button
        type="submit"
        size="lg"
        className="h-12 rounded-lg sm:rounded-l-none px-8 text-base font-semibold shadow-lg shadow-primary/25"
      >
        Search
      </Button>
    </form>
  );
};

export default HeroSearch;

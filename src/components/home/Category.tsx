import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import PageLayout from "@/tools/PageLayout";
import { fetchAllCategories } from "@/services/category";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

const accentColors = [
  "from-emerald-500/20 via-emerald-400/10 to-transparent",
  "from-green-400/25 via-green-300/10 to-transparent",
  "from-teal-400/25 via-teal-300/10 to-transparent",
  "from-emerald-400/25 via-emerald-300/10 to-transparent",
  "from-green-500/20 via-green-400/10 to-transparent",
  "from-teal-500/20 via-teal-400/10 to-transparent",
  "from-emerald-600/15 via-emerald-500/10 to-transparent",
  "from-green-600/15 via-green-500/10 to-transparent",
];

const Category = async () => {
  const categoriesRes = await fetchAllCategories();
  const categories = categoriesRes.success ? categoriesRes.data : [];
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <PageLayout>
        <div className="space-y-2 pb-10">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary dark:bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              {t("browseMarketplace")}
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              {t("categoriesTitle")}
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              {t("categoriesSubtitle")}
            </p>
          </div>
        </div>

        <div className="relative space-y-10">
          <div className="mx-auto grid custom-width gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category._id}
                href={`/ads?category=${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/95 p-5 transition-all hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition group-hover:opacity-100",
                    accentColors[index % accentColors.length]
                  )}
                />
                <div className="relative z-10 flex items-start gap-4">
                  <span className="inline-flex size-16 items-center justify-center rounded-xl border border-border/40 bg-background/80 text-primary shadow-sm transition group-hover:border-primary/60 group-hover:scale-110 group-hover:bg-secondary dark:group-hover:bg-primary/10">
                    {category.icon && (
                      <div className="relative w-10 h-10">
                        <Image 
                          src={category.icon} 
                          alt={category.name} 
                          fill 
                          sizes="40px"
                          className="object-contain dark:invert"
                        />
                      </div>
                    )}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</p>
                    <p className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                      {t("exploreNow")} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageLayout>
    </section>
  );
};

export default Category;

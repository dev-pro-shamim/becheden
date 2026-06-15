import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = async () => {
  const t = await getTranslations("CTA");

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-r from-emerald-600 via-emerald-500 to-green-600 dark:from-emerald-800 dark:via-emerald-700 dark:to-green-800" />

      {/* Decorative Overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      {/* Pattern Dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="custom-width mx-auto px-4 lg:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm mb-8">
            <Sparkles className="h-8 w-8 text-white" />
          </div>

          {/* Content */}
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-lg">
            {t("subtitle")}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-secondary shadow-xl shadow-black/10 rounded-xl px-8 h-13 text-base font-semibold"
            >
              <Link href="/ads/create">
                {t("button1")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white rounded-xl px-8 h-13 text-base font-semibold backdrop-blur-sm"
            >
              <Link href="/ads">{t("button2")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

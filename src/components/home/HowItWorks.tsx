import { getTranslations } from "next-intl/server";
import { Camera, Search, MessageCircle } from "lucide-react";

const steps = [
  { icon: Camera, key: "step1" },
  { icon: Search, key: "step2" },
  { icon: MessageCircle, key: "step3" },
];

const HowItWorks = async () => {
  const t = await getTranslations("HowItWorks");

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-secondary/50 via-background to-secondary/30 dark:from-primary/5 dark:via-background dark:to-primary/5" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="custom-width mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 lg:mb-16">
          <span className="inline-block rounded-full bg-secondary dark:bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary">
            {t("title")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {t("subtitle")}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-linear-to-r from-primary/30 via-primary/40 to-primary/30 dark:from-primary/40 dark:via-primary/50 dark:to-primary/40" />

          {steps.map(({ icon: Icon, key }, index) => (
            <div key={key} className="relative flex flex-col items-center text-center group">
              {/* Step Number & Icon */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-card border-2 border-border dark:border-primary/30 shadow-lg shadow-primary/10 transition group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1 group-hover:border-primary">
                <Icon className="h-7 w-7 text-primary" />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="mt-6 space-y-2 max-w-xs">
                <h3 className="text-lg font-semibold text-foreground">{t(`${key}Title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

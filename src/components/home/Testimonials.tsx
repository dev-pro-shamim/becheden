"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rafiq Hasan",
    location: "Dhaka",
    text: "Beche Den made it so easy to sell my old phone. I got a fair price and the buyer was verified. Highly recommended!",
    rating: 5,
    initials: "RH",
  },
  {
    name: "Fatima Begum",
    location: "Chattogram",
    text: "I found a great condition refrigerator at half the market price. The seller was responsive and the deal was smooth.",
    rating: 5,
    initials: "FB",
  },
  {
    name: "Kabir Hossain",
    location: "Sylhet",
    text: "Finally a trusted platform in Bangladesh. I've bought and sold multiple items without any hassle. The chat feature is very convenient.",
    rating: 5,
    initials: "KH",
  },
  {
    name: "Nasrin Akter",
    location: "Rajshahi",
    text: "I was skeptical at first but Beche Den exceeded my expectations. My old furniture found a new home within a week!",
    rating: 4,
    initials: "NA",
  },
];

const Testimonials = () => {
  const t = useTranslations("Testimonials");

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="custom-width mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20 dark:text-primary/10" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < item.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary dark:bg-primary/20 text-primary text-sm font-semibold">
                    {item.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

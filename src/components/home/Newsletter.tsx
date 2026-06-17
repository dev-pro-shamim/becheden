"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16">
      <div className="custom-width mx-auto px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border dark:border-primary/20 bg-linear-to-br from-secondary via-background to-secondary dark:from-primary/5 dark:via-background dark:to-primary/5 p-8 lg:p-14">
          {/* Decorative */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary dark:bg-primary/20 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                {t("title")}
              </h3>
              <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-auto lg:min-w-105">
              {subscribed ? (
                <div className="flex items-center gap-3 rounded-lg bg-secondary dark:bg-primary/10 px-6 py-4">
                  <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                  <p className="text-primary font-medium">
                    Thanks for subscribing! Check your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("placeholder")}
                      required
                      className="h-13 w-full pl-11 shadow-xs"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-13 rounded-lg px-8 font-semibold shadow-lg shadow-primary/25"
                  >
                    {t("button")}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
              <p className="mt-3 text-xs text-muted-foreground text-center lg:text-left">
                {t("trust")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Package, Layers, ShieldCheck } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix: string;
}

const stats: StatItem[] = [
  { icon: Users, label: "Active Users", value: 10000, suffix: "+" },
  { icon: Package, label: "Items Listed", value: 5000, suffix: "+" },
  { icon: Layers, label: "Categories", value: 50, suffix: "+" },
  { icon: ShieldCheck, label: "Secure Deals", value: 100, suffix: "%" },
];

function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatCard({ icon: Icon, label, value, suffix }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCounter(value, 2000, started);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-lg border border-border dark:border-primary/20 bg-card p-6 lg:p-8 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition group-hover:bg-primary/10" />
      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary dark:bg-primary/20 text-primary transition group-hover:scale-110 group-hover:bg-primary/15">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="text-3xl lg:text-4xl font-bold text-foreground tabular-nums">
            {formatNumber(count)}
            <span className="text-primary">{suffix}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

const TrustBadges = () => {
  return (
    <section className="py-16 relative">
      <div className="custom-width mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

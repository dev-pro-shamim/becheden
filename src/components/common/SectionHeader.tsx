import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  hasDot?: boolean; // Show the primary dot in badge
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  actionLink?: {
    text: string;
    href: string;
  };
  centered?: boolean;
  className?: string; // Container className override
  titleClassName?: string; // Title text className override
  darkBadge?: boolean; // Some sections might want a different background for the badge
}

export default function SectionHeader({
  title,
  subtitle,
  actionLink,
  centered = false,
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 md:mb-8 flex flex-col items-start gap-4 sm:gap-0", 
      centered ? "items-center text-center sm:flex-col" : "sm:flex-row sm:items-end justify-between",
      className)}>
      
      <div className={cn("space-y-3", centered ? "text-center mx-auto" : "text-left")}>
        <h2 className={cn("font-bold text-foreground uppercase", 
          centered ? "text-3xl lg:text-4xl tracking-tight" : "text-2xl lg:text-3xl", 
          titleClassName)}>
          {title}
        </h2>
        {subtitle && (
          <p className={cn("max-w-2xl text-base text-muted-foreground", centered && "mx-auto")}>
            {subtitle}
          </p>
        )}
      </div>

      {actionLink && (
        <Link href={actionLink.href} className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
          {actionLink.text}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

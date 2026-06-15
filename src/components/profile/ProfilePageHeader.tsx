import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProfilePageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function ProfilePageHeader({ title, description, actions, className }: ProfilePageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-linear-to-r from-primary/5 via-primary/10 to-primary/5 p-5 shadow-sm dark:from-primary/10 dark:via-primary/15 dark:to-primary/10",
        "border border-primary/20",
        "lg:flex-row lg:items-center lg:justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground lg:text-base">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2 justify-start lg:justify-end">{actions}</div> : null}
    </header>
  );
}

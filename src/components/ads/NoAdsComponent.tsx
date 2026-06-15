import { SearchX, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"

export default function NoAdsComponent() {
    const t = useTranslations('Ads');
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center min-h-100">
            <div className="relative mb-8">
                {/* Decorative blob */}
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl scale-150" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-secondary to-secondary/50 dark:from-primary/20 dark:to-primary/5 border border-border/40 shadow-sm">
                    <SearchX className="h-12 w-12 text-primary/60" />
                </div>
            </div>

            <div className="max-w-sm space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    {t('noAdsTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    {t('noAdsDesc')}
                </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                    variant="outline"
                    onClick={() => window.location.href = '/ads'}
                    className="rounded-full border-border/60"
                >
                    <SearchX className="h-4 w-4 mr-1.5" />
                    {t('clearFilters')}
                </Button>
                <Link href="/ads/create">
                    <Button className="rounded-full bg-primary px-8 font-semibold shadow-lg shadow-primary/25">
                        <Sparkles className="h-4 w-4 mr-1.5" />
                        {t('postAd')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

import { Skeleton } from "@/components/ui/skeleton";

export const CategorySkeleton = () => {
    return (
        <div className="space-y-3 mt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                </div>
            ))}
        </div>
    );
};

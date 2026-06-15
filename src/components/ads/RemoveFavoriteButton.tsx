
"use client";
import { Trash2, Loader2 } from "lucide-react";
import { removeFavorite } from "@/services/favorite";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const RemoveFavoriteButton = ({ adId }: { adId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      const res = await removeFavorite(adId);
      if (res.success) {
        SuccessToast("Removed from favorites");
      } else {
        ErrorToast(res.message || "Failed to remove");
      }
    } catch (err: unknown) {
      ErrorToast(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="icon" 
      disabled={loading}
      className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10 bg-white/90 hover:bg-destructive text-destructive hover:text-white border-none"
      onClick={handleRemove}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-white" />
      ) : (
        <Trash2 className="h-4 w-4 text-white" />
      )}
    </Button>
  );
};

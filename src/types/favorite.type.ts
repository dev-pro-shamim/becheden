export interface FavoriteItem {
  _id: string;
  adId: string;
  title: string;
  price: string | number;
  location: string;
  postedAt: string;
  imageUrl: string;
  isFeatured: boolean;
  isUrgent: boolean;
}

export interface FavoriteResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: FavoriteItem[];
}

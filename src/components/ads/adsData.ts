export const sampleListings = [
  {
    id: "apple-iphone-14",
    title: "Apple iPhone 14 Pro Max 256GB (Used)",
    price: "৳ 135,000",
    location: "Banani, Dhaka",
    postedAt: "2 hours ago",
    imageUrl:
      "https://images.pexels.com/photos/5081398/pexels-photo-5081398.jpeg",
    isUrgent: true,
  },
  {
    id: "gaming-pc",
    title: "Custom Gaming PC (Ryzen 7, RTX 3070)",
    price: "৳ 95,000",
    location: "Mirpur, Dhaka",
    postedAt: "Yesterday",
    imageUrl:
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
  },
  {
    id: "toyota-premio",
    title: "Toyota Premio 2017 (Registered 2019)",
    price: "৳ 2,150,000",
    location: "Chattogram",
    postedAt: "3 days ago",
    imageUrl:
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  },
  {
    id: "family-apartment",
    title: "2,200 sqft Apartment for Rent in Bashundhara R/A",
    price: "৳ 90,000 / month",
    location: "Bashundhara, Dhaka",
    postedAt: "5 days ago",
    imageUrl:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    isUrgent: true,
  },
  {
    id: "dslr-kit",
    title: "Canon EOS R6 with 24-105mm Lens (Warranty)",
    price: "৳ 195,000",
    location: "Sylhet",
    postedAt: "1 week ago",
    imageUrl: "https://images.pexels.com/photos/64609/pexels-photo-64609.jpeg",
  },
  {
    id: "office-space",
    title: "Serviced Office Space - Gulshan Avenue",
    price: "৳ 2,50,000 / month",
    location: "Gulshan 1, Dhaka",
    postedAt: "1 week ago",
    imageUrl:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    isUrgent: true,
  },
];

// Sample ad data - in real app, this would come from API/database
export const sampleAd = {
  id: "apple-iphone-14",
  title: "Apple iPhone 14 Pro Max 256GB (Used)",
  price: "৳ 135,000",
  originalPrice: "৳ 150,000",
  location: "Banani, Dhaka",
  postedAt: "2 hours ago",
  views: 1247,
  condition: "Used",
  category: "Mobiles",
  brand: "Apple",
  model: "iPhone 14 Pro Max",
  storage: "256GB",
  color: "Deep Purple",
  description: `Brand new sealed Apple iPhone 14 Pro Max 256GB Deep Purple.

Features:
• 6.7-inch Super Retina XDR display
• Pro camera system with 48MP main camera
• A16 Bionic chip
• Dynamic Island
• Ceramic Shield front
• Surgical-grade stainless steel
• All-day battery life
• iOS 16

Comes with original box, charger, and warranty card. Never used, still sealed.`,
  images: [
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
    "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg",
  ],
  isFeatured: true,
  isUrgent: false,
  seller: {
    id: "seller-1",
    name: "Rahul Ahmed",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    memberSince: "January 2023",
    rating: 4.8,
    totalAds: 15,
    verified: true,
    phone: "+880 1712-345678",
    location: "Dhaka, Bangladesh",
  },
  specifications: [
    { label: "Brand", value: "Apple" },
    { label: "Model", value: "iPhone 14 Pro Max" },
    { label: "Storage", value: "256GB" },
    { label: "Color", value: "Deep Purple" },
    { label: "Condition", value: "Used - Like New" },
    { label: "Warranty", value: "Apple Warranty" },
  ],
};
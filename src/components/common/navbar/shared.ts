export const navigationItems = [
  { name: "HOME", href: "/", hasDropdown: false },
  { name: "LAYOUT", href: "/layout", hasDropdown: true },
  { name: "FEATURES", href: "/features", hasDropdown: true },
  { name: "DAILY DEALS", href: "/deals", hasDropdown: false },
  { name: "BLOG", href: "/blog", hasDropdown: false },
  { name: "PAGES", href: "/pages", hasDropdown: true },
];

export const dropdownItems: Record<string, string[]> = {
  LAYOUT: ["Grid", "List", "Masonry"],
  FEATURES: ["New Arrivals", "Best Sellers", "Special Offers"],
  PAGES: ["About Us", "Contact", "FAQ"],
};

export const promoMessages = [
  "Gift every single day on Weekends",
  "New Coupon code: HAPPY2018",
  "Free shipping on all orders",
  "MOBILE : 01540581895",
];

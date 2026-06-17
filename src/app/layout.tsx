import type { Metadata } from "next";
import { Poppins, Righteous } from "next/font/google";
import "./[locale]/globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import UserProvider from "@/context/UserContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://becheden.com.bd"),
  title: {
    default: "becheben - Buy & Sell Used Goods in Bangladesh",
    template: "%s |Becheden",
  },
  description:
    "becheben is Bangladesh's premium online marketplace for buying and selling second-hand goods. Easily buy and sell used mobile phones, laptops, bikes, cars, furniture, and electronics locally at the best prices.",
  keywords: [
    "becheben",
    "Buy and Sell Used Goods",
    "Second hand mobile",
    "Used laptop in Dhaka",
    "Purana jinish kena becha",
    "Second hand bike",
    "Used cars Bangladesh",
    "Old furniture buy sell",
    "Used electronics market",
    "Bangladesh online classifieds",
    "Dhaka",
    "Chittagong",
    "Sylhet",
  ],
  authors: [{ name: "SmartEdge Technologies" }],
  creator: "SmartEdge Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://becheden.com.bd",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://becheden.com.bd",
    title: "becheben - Buy & Sell Used Goods in Bangladesh",
    description:
      "Find great deals on used electronics, second-hand cars, bikes, and furniture onBecheden. Safe and fast local buying and selling in Bangladesh.",
    siteName: "becheben",
  },
  twitter: {
    card: "summary_large_image",
    title: "becheben - Buy & Sell Used Goods in Bangladesh",
    description:
      "Bangladesh's trusted marketplace for buying and selling second-hand goods at great prices.",
    creator: "@bechedenbd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.variable} ${righteous.variable} antialiased max-w-480 mx-auto`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}

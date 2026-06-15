#Becheden

A modern e-commerce platform for buying and selling used items, built with Next.js 16, TypeScript, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Product Listings**: Browse ads across multiple categories
- **Featured Products**: Highlighted premium listings
- **Category Filtering**: Easily find items by category
- **Search Functionality**: Find specific items quickly
- **Responsive Design**: Works on all device sizes
- **Image Optimization**: Next.js Image component for performance
- **Type Safety**: Full TypeScript support

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **UI Components**: Shadcn UI, Lucide React Icons
- **State Management**: React Context API
- **Build Tool**: pnpm
- **Linting**: ESLint
- **Animations**: Framer Motion (planned)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/recycle-mart.git
   ```

2. Navigate to the project directory:
   ```bash
   cd recycle-mart
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
recycle-mart/
├── public/                 # Static assets
├── src/
│   ├── app/                # App Router pages
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   ├── theme/              # Theme configuration
│   └── tools/              # Custom tools and utilities
├── .gitignore
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Components

### Home Page Components

- **Hero**: Interactive carousel with featured banners
- **Category**: Grid of product categories with icons
- **FeaturedProducts**: Showcase of premium listings
- **TopAds**: Highlighted popular ads
- **LatestAds**: Recently posted listings

### UI Components

- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Site footer with links and information
- **ListingCard**: Reusable component for ad listings
- **ImageGallery**: Product image viewer
- **SellerInfo**: Seller details and ratings

## Pages

- **Home** (`/`): Main landing page with featured content
- **Ads** (`/ads`): Browse all listings with filtering
- **Ad Details** (`/ads/[id]`): Individual ad page
- **Create Ad** (`/ads/create`): Form to list new items
- **Profile** (`/profile`): User dashboard
- **Chat** (`/chat`): Messaging system
- **Auth** (`/auth/*`): Authentication pages (login, register, etc.)

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

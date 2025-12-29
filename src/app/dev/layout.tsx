import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administration panel", // Fixed typo: deScription -> description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Important: Use proper paths for CSS files */}
        <link
          href="/assets/backend/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/backend/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/backend/css/app.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/backend/css/custom.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div id="layout-wrapper">
          <Header />
          <main>{children}</main>{" "}
          {/* Wrapped children in main tag for better semantics */}
          <Footer />
        </div>

        {/* Scripts with proper strategy and paths */}
        <Script
          src="/assets/backend/libs/bootstrap/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/backend/libs/simplebar/simplebar.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/backend/libs/node-waves/waves.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/backend/libs/feather-icons/feather.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/backend/js/pages/plugins/lord-icon-2.1.0.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/backend/js/plugins.js"
          strategy="afterInteractive"
        />
        <Script
          src="/assets/backend/libs/apexcharts/apexcharts.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/backend/libs/jsvectormap/jsvectormap.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/backend/libs/jsvectormap/maps/world-merc.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/backend/libs/swiper/swiper-bundle.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/js/pages/dashboard-ecommerce.init.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/js/app.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}

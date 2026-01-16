import type { Metadata } from "next";
import Providers from "./providers";
import ToastProvider from "@/components/ToastProvider";
import BootstrapClient from "@/components/admin/BootstrapClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Javascript from "./components/Javascript";


export const metadata: Metadata = {
  title:
    "Expert Code Lab (P.) Ltd.- Best Website Development Company in India | ERP | Pathology | Web App | Digital Transformation",
  description:
    "Expert Code Lab (ECL) is the globally trusted USA and India based Software Development & IT Consulting company which expertise in the Web/CMS Development, UI/UX Development, Mobile App Development, Rest API Development, IOT, Artificial Intelligence, Chatbot, SEO & Digital Marketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* CSS */}
        <link rel="stylesheet" href="assets/front/css/bootstrap.min.css" />
        <link rel="stylesheet" href="assets/front/css/fontawesome.css" />
        <link rel="stylesheet" href="assets/front/css/animate.css" />
        <link rel="stylesheet" href="assets/front/css/swiper.min.css" />
        <link rel="stylesheet" href="assets/front/css/slick.css" />
        <link rel="stylesheet" href="assets/front/css/odometer.css" />
        <link rel="stylesheet" href="assets/front/css/nice-select.css" />
        <link rel="stylesheet" href="assets/front/css/magnific-popup.css" />
        <link rel="stylesheet" href="assets/front/css/cursor.css" />
        <link rel="stylesheet" href="assets/front/css/custom-font.css" />
        <link rel="stylesheet" href="assets/front/css/main.css" />
      </head>

      <body className="sco_agency">
        <BootstrapClient />

        <Providers>
          <div className="xb-backtotop">
            <a href="#" className="scroll">
              <i className="far fa-arrow-up" />
            </a>
          </div>

          {/* Preloader */}
          <div id="xb-loadding" className="xb-loader">
            <div className="xb-dual-ring" />
          </div>

          <div className="body_wrap">
            <Header />
            {children}
            <Footer />
          </div>

          <Javascript />
          <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}

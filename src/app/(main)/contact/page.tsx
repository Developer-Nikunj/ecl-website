// app/contact/page.tsx - Server Component
import { Metadata } from "next";
import ContactClient from "../components/Contact";

type SeoData = {
  title: string;
  description: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  robots: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schema: string;
};

// Fetch SEO data for contact page
async function getSeoDetail(slug: string): Promise<SeoData | null> {
  try {
    // Use server-side environment variable (no NEXT_PUBLIC_ prefix)
    const backendUrl =
      process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

    const res = await fetch(`${backendUrl}/common/seo/${slug}`, {
      // Add cache revalidation if needed
      next: { revalidate: 3600 }, // Revalidate every hour
      // Or use cache: 'no-store' for dynamic data
    });

    if (!res.ok) {
      console.error(`Failed to fetch SEO data: ${res.status}`);
      return null;
    }

    const response = await res.json();
    return response.data;
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return null;
  }
}

// Fallback metadata in case API fails
const defaultMetadata: Metadata = {
  title: "Contact Us | Expert Code Lab",
  description:
    "Get in touch with Expert Code Lab for innovative solutions and digital success. Contact our team for expert consultation.",
  keywords: ["contact", "digital solutions", "web development", "consultation"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Contact Us | Expert Code Lab",
    description:
      "Connect with our team for innovative solutions and your digital success",
    type: "website",
    url: "https://www.expertcodelab.com/contact",
    images: [
      {
        url: "https://www.expertcodelab.com/assets/front/img/bg/page_bg01.jpg",
        width: 1200,
        height: 630,
        alt: "Expert Code Lab Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Expert Code Lab",
    description:
      "Connect with our team for innovative solutions and your digital success",
    images: ["https://www.expertcodelab.com/assets/front/img/bg/page_bg01.jpg"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const slug = "contact";
  const seodata = await getSeoDetail(slug);

  console.log("seodata", seodata);

  // If API fails, return default metadata
  if (!seodata) {
    return defaultMetadata;
  }

  // Merge API data with defaults
  return {
    title: seodata.metaTitle || `${seodata.title} | Expert Code Lab`,
    description: seodata.metaDescription || seodata.description,
    keywords: seodata.metaKeywords?.split(",") || defaultMetadata.keywords,
    robots: seodata.robots || defaultMetadata.robots,
    alternates: {
      canonical:
        seodata.canonicalUrl ||
        defaultMetadata.openGraph?.url ||
        "https://www.expertcodelab.com/contact",
    },
    openGraph: {
      title: seodata.ogTitle || seodata.metaTitle || seodata.title,
      description:
        seodata.ogDescription || seodata.metaDescription || seodata.description,
      url: seodata.canonicalUrl || "https://www.expertcodelab.com/contact",
      type: "website",
      images: seodata.ogImage
        ? [
            {
              url: seodata.ogImage,
              width: 1200,
              height: 630,
              alt: seodata.ogTitle || seodata.title,
            },
          ]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: seodata.ogTitle || seodata.metaTitle || seodata.title,
      description:
        seodata.ogDescription || seodata.metaDescription || seodata.description,
      images: seodata.ogImage
        ? [seodata.ogImage]
        : defaultMetadata.twitter?.images,
    },
  };
}

// Contact Page Schema for structured data
function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Expert Code Lab",
    description:
      "Contact page for Expert Code Lab - Digital Solutions and Web Development Services",
    url: "https://www.expertcodelab.com/contact",
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    mainEntity: {
      "@type": "Organization",
      name: "Expert Code Lab Pvt. Ltd.",
      description: "Digital Solutions and Web Development Company",
      url: "https://www.expertcodelab.com",
      logo: "https://www.expertcodelab.com/logo.png",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "G 694/14, 1st Floor, Back Side Jaitpur Extn. Part-II",
          addressLocality: "Badarpur",
          addressRegion: "South Delhi",
          postalCode: "110044",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "C-50, Sector 2",
          addressLocality: "Noida",
          addressRegion: "Uttar Pradesh",
          postalCode: "201301",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "3513 Leanne Drive",
          addressLocality: "Flower Mound",
          addressRegion: "Texas",
          postalCode: "75022",
          addressCountry: "US",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+917303798986",
          contactType: "customer service",
          email: "info@expertcodelab.com",
          areaServed: ["IN", "US", "Worldwide"],
          availableLanguage: ["English", "Hindi"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/expertcodelab/",
        "https://www.instagram.com/expertscodelab/",
        "https://www.linkedin.com/company/expert-code-lab/",
      ],
    },
    provider: {
      "@type": "Organization",
      name: "Expert Code Lab Pvt. Ltd.",
      url: "https://www.expertcodelab.com",
      logo: "https://www.expertcodelab.com/logo.png",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export default async function ContactPage() {
  // You can also fetch additional server-side data here if needed
  // const additionalData = await fetchSomeData();

  return (
    <>
      {/* Render the schema script */}
      <ContactPageSchema />

      {/* Render the client component */}
      <ContactClient />
    </>
  );
}

import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";


export const getBlog = cache(async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/blog/${slug}`,
    {
      cache: "no-store", // SSR (change later if needed)
    },
  );

  if (!res.ok) return null;
  return res.json();
});

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

export const getSeoDetail = cache(
  async (slug: string): Promise<SeoData | null> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/seo/${slug}`,
    );
    if (!res.ok) return null;
    const response = await res.json();

    return response.data;
  },
);

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mblog = await getSeoDetail(slug);

  console.log("mblog", mblog);

  if (!mblog) return {};

  return {
    title: `${mblog.title} | Expert Code Lab`,
    description: mblog.description,
    keywords: mblog.metaKeywords,
    robots: mblog.robots,
    alternates: {
      canonical: mblog.canonicalUrl,
    },
    openGraph: {
      title: mblog.title,
      description: mblog.description,
      url: `https://www.expertcodelab.com/blogs/${slug}`,
      type: "article",
      images: mblog.ogImage ? [{ url: mblog.ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: mblog.ogTitle || mblog.metaTitle,
      description: mblog.ogDescription || mblog.metaDescription,
      images: mblog.ogImage ? [mblog.ogImage] : [],
    },
  };
}

function BlogSchema({
  slug,
  data,
}: {
  slug: string;
  data: {
    title: string;
    description: string;
    category: string;
    metaKeywords: string;
    createdAt: string;
    updatedAt: string;
    image?: string;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.expertcodelab.com/blogs/${slug}`,
    },

    headline: data.title,
    name: data.title,
    description: data.description,
    keywords: data.metaKeywords,
    url: `https://www.expertcodelab.com/blogs/${slug}`,
    articleSection: data.category,
    datePublished: data.createdAt,
    dateModified: data.updatedAt,

    author: {
      "@type": "Organization",
      name: "Expert Code Lab Pvt. Ltd.",
      url: "https://www.expertcodelab.com",
    },

    inLanguage: "en-IN",
    isAccessibleForFree: true,

    provider: {
      "@type": "Organization",
      name: "Expert Code Lab Pvt. Ltd.",
      url: "https://www.expertcodelab.com",
      logo: "https://www.expertcodelab.com/logo.png",
    },

    publisher: {
      "@type": "Organization",
      name: "Expert Code Lab Pvt. Ltd.",
      logo: {
        "@type": "ImageObject",
        url: "https://www.expertcodelab.com/logo.png",
        width: 200,
        height: 60,
      },
    },

    about: {
      "@type": "Thing",
      name: data.category,
    },

    areaServed: {
      "@type": "Country",
      name: "India",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Home({ params }: PageProps) {
  const { slug } = await params;
  const [blogData, seoData] = await Promise.all([
    getBlog(slug),
    getSeoDetail(slug),
  ]);

  return (
    <main>
      {seoData && (
        <BlogSchema
          slug={slug}
          data={{
            title: seoData.title,
            description: seoData.description,
            category: blogData.data.category,
            metaKeywords: seoData.metaKeywords,
            createdAt: blogData.data.createdAt,
            updatedAt: blogData.data.updatedAt,
          }}
        />
      )}
      {/* hero section start  */}
      <section
        className="hero o-hidden hero-style-two pos-rel pt-120 pb-120 bg_img"
        data-background="/assets/front/img/bg/hero-bg02.jpg"
      >
        <div className="container">
          <div className="row align-items-center gy-5">
            {/* IMAGE */}
            <div className="col-lg-6 text-center">
              <Image
                src={blogData.data.img}
                alt={blogData.data.title}
                width={700}
                height={460}
                className="img-fluid rounded-4 shadow-lg"
              />
            </div>

            {/* CONTENT */}
            <div className="col-lg-6">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm">
                {/* Meta */}
                <div className="mb-3">
                  <span className="badge bg-primary me-2">
                    {blogData.data.category}
                  </span>
                  <span className="badge bg-success">
                    {blogData.data.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="fw-bold mb-3">{blogData.data.title}</h2>

                {/* Excerpt */}
                <p className="text-muted fs-5">{blogData.data.excerpt}</p>

                {/* Divider */}
                <hr />

                {/* Content */}
                <p className="mb-4">{blogData.data.content}</p>

                {/* Footer Info */}
                <div className="d-flex align-items-center text-muted">
                  <i className="far fa-eye me-2" />
                  <span>{blogData.data.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* faq section end  */}
      {/* cta section start  */}
      <section className="cta">
        <div className="container">
          <div className="cta-wrap">
            <div className="cta-inner ul_li_between">
              <div
                className="xb-item--holder wow fadeInLeft"
                data-wow-delay="100ms"
                data-wow-duration="600ms"
              >
                <h2 className="xb-item--title">
                  Stop wasting money on bad SEO.
                </h2>
                <span className="xb-item--content">
                  Book a free consultation for the SEO results you need.
                </span>
                <div className="xb-btn mt-45">
                  <a
                    href="contact.html"
                    className="thm-btn thm-btn--aso thm-btn--aso_white"
                  >
                    Book a free consultation
                  </a>
                </div>
              </div>
              <div
                className="cta-right_img wow fadeInRight"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                <img
                  className="updown"
                  src="/assets/front/img/cta/clip-bord.png"
                  alt="Expert Code Lab"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* cta section end  */}
    </main>
  );
}

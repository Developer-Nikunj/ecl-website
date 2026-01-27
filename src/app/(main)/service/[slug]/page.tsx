"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import axios from "axios";

import { useParams } from "next/navigation";

type ServiceParams = {
  params: {
    slug: string;
  };
};
type ServiceData = {
  title: string;
  description: string;
  category?: string;
};
type ServiceSchemaProps = {
  slug: string;
  data: ServiceData;
};

// Service data
const service: Record<string, ServiceData> = {
  "web-design-and-development": {
    title: "Web Design and Development",
    description: "We create modern, responsive websites.",
    category: "Web Development",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "SEO and performance marketing solutions.",
    category: "Digital Marketing",
  },
};

// ✅ SEO Metadata
export async function generateMetadata({ params }: ServiceParams) {
  const mservice = service[params.slug as keyof typeof service];

  if (!mservice) return {};

  return {
    title: `${mservice.title} | Expert Code Lab`,
    description: mservice.description,
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return Object.keys(service).map((slug) => ({ slug }));
}

function ServiceSchema({ slug, data }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.description,
    serviceType: data.category,
    url: `https://www.expertcodelab.com/service/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Expert Code Lab Pvt. Ltd.",
      url: "https://www.expertcodelab.com",
      logo: "https://www.expertcodelab.com/logo.png",
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

// ✅ Page Component
export default function Service({ params }: ServiceParams) {
  const mservice = service[params.slug];

  if (!mservice) {
    notFound();
  }
  const { slug } = useParams();
  const getSeoBySlug = async () => {
    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/seo/bySlug`,
        {
          slug: slug,
        },
      );

      console.log("data", data);
    } catch (error) {}
  };

  useEffect(() => {
    getSeoBySlug();
  });

  return (
    <main>
      {/* hero section start  */}
      <section
        className="hero o-hidden hero-style-two pos-rel pt-120 bg_img"
        data-background="assets/front/img/bg/hero-bg02.jpg"
      >
        <div className="container">
          <div className="hero_wrap pt-40">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="xb-hero">
                  <h1
                    className="xb-item--title wow fadeInUp"
                    data-wow-duration="600ms"
                  >
                    Grow your business
                    <br /> with <span>{mservice.title} services</span>
                  </h1>
                  <p
                    className="xb-item--content wow fadeInUp"
                    data-wow-delay="100ms"
                    data-wow-duration="600ms"
                  >
                    (like 0 to 1000 new sales per month kind of results)
                  </p>
                  <ul
                    className="xb-item--item list-unstyled wow fadeInUp"
                    data-wow-delay="200ms"
                    data-wow-duration="600ms"
                  >
                    <li>
                      <i className="far fa-check" /> Recover lost traffic
                    </li>
                    <li>
                      <i className="far fa-check" /> Boost organic traffic
                    </li>
                    <li>
                      <i className="far fa-check" /> Get more sales
                    </li>
                  </ul>
                  <div
                    className="xb-btn mt-60 wow fadeInUp"
                    data-wow-delay="300ms"
                    data-wow-duration="600ms"
                  >
                    <a
                      href="contact.html"
                      className="thm-btn thm-btn--aso thm-btn--aso_yellow"
                    >
                      Book a free consultation
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-right_img pos-rel">
                  <img
                    className="wow fadeInRight"
                    data-wow-duration="600ms"
                    src="assets/front/img/hero/hero-img02.png"
                    alt="Expert Code Lab"
                  />
                  <div className="out-image">
                    <div className="img img--one updown-2">
                      <img
                        className="wow fadeInDown"
                        data-wow-delay="100ms"
                        data-wow-duration="600ms"
                        src="assets/front/img/hero/hero-img03.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <div className="img img--two updown-3">
                      <img
                        className="wow fadeInUp"
                        data-wow-delay="300ms"
                        data-wow-duration="600ms"
                        src="assets/front/img/hero/hero-img04.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-scroll-down active">
            <a href="#about" className="scrollspy-btn">
              <span />
              <span />
              <span />
            </a>
          </div>
        </div>
      </section>
      {/* hero section end  */}
      {/* brand section start */}
      <section className="brand pt-30 pb-140">
        <div className="container">
          <div className="o-hidden">
            <div className="brand-sub_title">
              <span>
                Trusted by <b>100+</b> teams to empower <b>5,00+</b> people
              </span>
            </div>
            <div className="brand-wrap brand-marquee">
              <div className="brand-logo">
                <img
                  src="assets/front/img/brand/brand-logo01.png"
                  alt="Expert Code Lab"
                />
              </div>
              <div className="brand-logo">
                <img
                  src="assets/front/img/brand/brand-logo02.png"
                  alt="Expert Code Lab"
                />
              </div>
              <div className="brand-logo">
                <img
                  src="assets/front/img/brand/brand-logo03.png"
                  alt="Expert Code Lab"
                />
              </div>
              <div className="brand-logo">
                <img
                  src="assets/front/img/brand/brand-logo04.png"
                  alt="Expert Code Lab"
                />
              </div>
              <div className="brand-logo">
                <img
                  src="assets/front/img/brand/brand-logo05.png"
                  alt="Expert Code Lab"
                />
              </div>
              <div className="brand-logo">
                <img
                  src="assets/front/img/brand/brand-logo06.png"
                  alt="Expert Code Lab"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* brand section end  */}
      {/* about section start  */}
      <section id="about" className="about m-lr">
        <div className="about-wrapper sec-bg pos-rel pb-130 pt-130">
          <div className="container">
            <div className="sec-title--two text-center">
              <div
                className="sub-title wow fadeInDown"
                data-wow-duration="600ms"
              >
                <img
                  src="assets/front/img/icon/magic.png"
                  alt="Expert Code Lab"
                />{" "}
                We are ECL
              </div>
              <h2
                className="title wow fadeInDown"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                Committed to Your SEO Success
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-6 mt-50">
                <div className="about-left">
                  <h2 className="title">Coure values</h2>
                  <div className="about-item_box ul_li">
                    <div className="xb-item--icon">
                      <img
                        src="assets/front/img/icon/airdrop.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <div className="xb-item--holder">
                      <p className="xb-item--content">
                        <span>Innovation:</span> Continuously refining SEO to
                        stay ahead of search engine updates.
                      </p>
                    </div>
                  </div>
                  <div className="about-item_box ul_li">
                    <div className="xb-item--icon">
                      <img
                        src="assets/front/img/icon/people.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <div className="xb-item--holder">
                      <p className="xb-item--content">
                        <span>Client Focus:</span> Your success drives us; we
                        craft custom SEO solutions for impact.
                      </p>
                    </div>
                  </div>
                  <div className="about-item_box ul_li">
                    <div className="xb-item--icon">
                      <img
                        src="assets/front/img/icon/microphone.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <div className="xb-item--holder">
                      <p className="xb-item--content">
                        <span>Transparency:</span> Clear communication and
                        honest reporting at every step.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-50">
                <div className="about-right">
                  <div className="xb-item--holder">
                    <h3 className="xb-item--title">Our Mission</h3>
                    <p className="xb-item--content">
                      Our mission is to boost online presence with cutting-edge
                      SEO, driving organic traffic, increasing visibility, and
                      delivering measurable results.
                    </p>
                  </div>
                  <div className="xb-item--holder">
                    <h3 className="xb-item--title">Our Vision</h3>
                    <p className="xb-item--content">
                      Our vision is to be a trusted leader in digital marketing,
                      setting the standard for ethical SEO. We empower
                      businesses to thrive with effective, strategies.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="xb-btn text-center mt-90 wow fadeInUp"
                data-wow-duration="600ms"
              >
                <a href="about.html" className="thm-btn thm-btn--aso">
                  Learn more about us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about section end  */}
      {/* service section start  */}
      <section className="service pt-140 pb-140">
        <div className="container">
          <div className="row mt-none-30">
            <div className="col-lg-4 mt-30">
              <div className="service-info">
                <div className="sec-title--two">
                  <span
                    className="sub-title wow fadeInDown"
                    data-wow-duration="600ms"
                  >
                    <img
                      src="assets/front/img/icon/ser-01.svg"
                      alt="Expert Code Lab"
                    />
                    Feature-services
                  </span>
                  <h2
                    className="title wow skewIn"
                    data-wow-delay="100ms"
                    data-wow-duration="600ms"
                  >
                    Growth with <br /> SEO services
                  </h2>
                  <p
                    className="content wow fadeInUp"
                    data-wow-delay="300ms"
                    data-wow-duration="600ms"
                  >
                    SEO services boost visibility and organic traffic, driving
                    leads and growth.
                  </p>
                </div>
                <div
                  className="xb-btn mt-50 wow fadeInUp"
                  data-wow-delay="450ms"
                  data-wow-duration="600ms"
                >
                  <a
                    href="service.html"
                    className="thm-btn thm-btn--aso thm-btn--aso_yellow"
                  >
                    View more services
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-30">
              <div className="service-all_item">
                <div className="service-box">
                  <div className="service-item">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">Niche research</h3>
                      <span className="xb-item--contact">
                        Niche research identifies a market segment to help
                        tailor growth strategies.
                      </span>
                    </div>
                    <div className="xb-item--icon ul_li_between">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/icon/research.gif"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <a href="service-details.html" className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Expert Code Lab"
                        />
                      </a>
                    </div>
                  </div>
                  <a href="service-details.html" className="xb-overlay" />
                </div>
                <div className="service-box">
                  <div className="service-item">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">International SEO</h3>
                      <span className="xb-item--contact">
                        International SEO optimizes your site for global
                        audiences and languages.
                      </span>
                    </div>
                    <div className="xb-item--icon ul_li_between">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/icon/digital-tra.gif"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <a href="service-details.html" className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Expert Code Lab"
                        />
                      </a>
                    </div>
                  </div>
                  <a href="service-details.html" className="xb-overlay" />
                </div>
                <div className="service-box">
                  <div className="service-item">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">SEO audit</h3>
                      <span className="xb-item--contact">
                        An SEO audit evaluates a website identify improvements
                        for better search rankings.
                      </span>
                    </div>
                    <div className="xb-item--icon ul_li_between">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/icon/search.gif"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <a href="service-details.html" className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Expert Code Lab"
                        />
                      </a>
                    </div>
                  </div>
                  <a href="service-details.html" className="xb-overlay" />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-30">
              <div className="service-all_item">
                <div className="service-box">
                  <div className="service-item">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">Link building</h3>
                      <span className="xb-item--contact">
                        Link building hyperlinks from other sites to boost and
                        improve search rankings.
                      </span>
                    </div>
                    <div className="xb-item--icon ul_li_between">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/icon/durability.gif"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <a href="service-details.html" className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Expert Code Lab"
                        />
                      </a>
                    </div>
                  </div>
                  <a href="service-details.html" className="xb-overlay" />
                </div>
                <div className="service-box">
                  <div className="service-item">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">Enterprise SEO</h3>
                      <span className="xb-item--contact">
                        Enterprise SEO optimizes large websites to improve
                        visibility and drive traffic.
                      </span>
                    </div>
                    <div className="xb-item--icon ul_li_between">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/icon/business-develop.gif"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <a href="service-details.html" className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Expert Code Lab"
                        />
                      </a>
                    </div>
                  </div>
                  <a href="service-details.html" className="xb-overlay" />
                </div>
                <div className="service-box">
                  <div className="service-item">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">Penalty recovery</h3>
                      <span className="xb-item--contact">
                        Penalty recovery fixes issues that caused search engine
                        penalty to restore rankings.
                      </span>
                    </div>
                    <div className="xb-item--icon ul_li_between">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/icon/warning.gif"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <a href="service-details.html" className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Expert Code Lab"
                        />
                      </a>
                    </div>
                  </div>
                  <a href="service-details.html" className="xb-overlay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* service section end  */}
      {/* project section start  */}
      <section className="project o-hidden pb-140">
        <div className="container">
          <div className="sa-project-top ul_li_between mb-25">
            <div className="sec-title--two mb-30">
              <span
                className="sub-title wow fadeInDown"
                data-wow-duration="600ms"
              >
                <img
                  src="assets/front/img/icon/eye-icon.svg"
                  alt="Expert Code Lab"
                />
                Case study
              </span>
              <h2 className="title wow skewIn" data-wow-duration="600ms">
                Our resent SEO work
              </h2>
            </div>
            <div
              className="xb-btn text-center wow fadeInRight mb-30"
              data-wow-duration="600ms"
            >
              <a href="casestudy.html" className="thm-btn thm-btn--aso">
                View more casestudy
              </a>
            </div>
          </div>
        </div>
        <div className="sa-project_wrapper">
          <div className="seo-project-slider-inner">
            <div className="seo-project-slider">
              <div
                className="sa-project-item bg_img"
                data-background="assets/front/img/testimonial/sa-tes02.jpg"
              >
                <div className="xb-item--inner ul_li_between pos-rel z-1">
                  <div className="xb-item--project_title">
                    <h2 className="xb-item--title">
                      Sitemark's success with tailored SEO solutions
                    </h2>
                    <p className="xb-item--content">
                      Sitemark thrived with customized SEO strategies, enhancing
                      visibility and organic traffic for strong ROI.
                    </p>
                    <div className="xb-btn mt-50">
                      <a
                        href="casestudy-details.html"
                        className="thm-btn thm-btn--border"
                      >
                        Read case study
                        <span>
                          <svg
                            width={11}
                            height={11}
                            viewBox="0 0 11 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.7354 3.14709C10.8167 2.74092 10.5533 2.3458 10.1471 2.26456L3.52817 0.94078C3.122 0.859546 2.72688 1.12296 2.64565 1.52913C2.56441 1.9353 2.82782 2.33042 3.23399 2.41165L9.11748 3.58835L7.94078 9.47183C7.85955 9.878 8.12296 10.2731 8.52913 10.3544C8.9353 10.4356 9.33042 10.1722 9.41165 9.76601L10.7354 3.14709ZM1.41603 9.62404L10.416 3.62404L9.58398 2.37596L0.583975 8.37596L1.41603 9.62404Z"
                              fill="#0C111D"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="xb-item--item-box mt-none-50">
                    <div className="xb-item--item">
                      <span className="xb-item--number">515%</span>
                      <span className="xb-item--text">
                        ROI increase over 3 years
                      </span>
                    </div>
                    <div className="xb-item--item border-blue">
                      <span className="xb-item--number">$218k</span>
                      <span className="xb-item--text">
                        In value due to increased team productivity
                      </span>
                    </div>
                    <div className="xb-item--item border-sky">
                      <span className="xb-item--number">522%</span>
                      <span className="xb-item--text">
                        Saved due to reduced administration time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="sa-project-item bg_img"
                data-background="assets/front/img/testimonial/sa-tes01.jpg"
              >
                <div className="xb-item--inner ul_li_between pos-rel z-1">
                  <div className="xb-item--project_title">
                    <h2 className="xb-item--title">
                      How greenish achieved a eco-friendly SEO success
                    </h2>
                    <p className="xb-item--content">
                      Greenish optimized sustainable content, attracting
                      eco-conscious audiences and driving traffic effectively.
                    </p>
                    <div className="xb-btn mt-50">
                      <a
                        href="career-details.html"
                        className="thm-btn thm-btn--border"
                      >
                        Read case study{" "}
                        <span>
                          <img
                            src="assets/front/img/icon/proj-arrow.svg"
                            alt="Expert Code Lab"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="xb-item--item-box mt-none-50">
                    <div className="xb-item--item">
                      <span className="xb-item--number">410%</span>
                      <span className="xb-item--text">
                        ROI increase over 3 years
                      </span>
                    </div>
                    <div className="xb-item--item border-blue">
                      <span className="xb-item--number">$121k</span>
                      <span className="xb-item--text">
                        In value due to increased team productivity
                      </span>
                    </div>
                    <div className="xb-item--item border-sky">
                      <span className="xb-item--number">410%</span>
                      <span className="xb-item--text">
                        Saved due to reduced administration time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="sa-project-item bg_img"
                data-background="assets/front/img/testimonial/sa-tes03.jpg"
              >
                <div className="xb-item--inner ul_li_between pos-rel z-1">
                  <div className="xb-item--project_title">
                    <h2 className="xb-item--title">
                      Expanding cambridge's reach with SEO solutions
                    </h2>
                    <p className="xb-item--content">
                      Cambridge expanded its reach with through targeted SEO
                      solutions, boosting visibility and driving growth.
                    </p>
                    <div className="xb-btn mt-50">
                      <a
                        href="casestudy-details.html"
                        className="thm-btn thm-btn--border"
                      >
                        Read case study{" "}
                        <span>
                          <img
                            src="assets/front/img/icon/proj-arrow.svg"
                            alt="Expert Code Lab"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="xb-item--item-box mt-none-50">
                    <div className="xb-item--item">
                      <span className="xb-item--number">418%</span>
                      <span className="xb-item--text">
                        ROI increase over 3 years
                      </span>
                    </div>
                    <div className="xb-item--item border-blue">
                      <span className="xb-item--number">$185k</span>
                      <span className="xb-item--text">
                        In value due to increased team productivity
                      </span>
                    </div>
                    <div className="xb-item--item border-sky">
                      <span className="xb-item--number">480%</span>
                      <span className="xb-item--text">
                        Saved due to reduced administration time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="sa-project-item bg_img"
                data-background="assets/front/img/testimonial/sa-tes04.jpg"
              >
                <div className="xb-item--inner ul_li_between pos-rel z-1">
                  <div className="xb-item--project_title">
                    <h2 className="xb-item--title">
                      Madrid's digital footprint with targeted SEO
                    </h2>
                    <p className="xb-item--content">
                      Targeted SEO strategies strengthened Madrid's digital
                      footprint,visibility and driving engagement.
                    </p>
                    <div className="xb-btn mt-50">
                      <a
                        href="career-details.html"
                        className="thm-btn thm-btn--border"
                      >
                        Read case study{" "}
                        <span>
                          <img
                            src="assets/front/img/icon/proj-arrow.svg"
                            alt="Expert Code Lab"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="xb-item--item-box mt-none-50">
                    <div className="xb-item--item">
                      <span className="xb-item--number">588%</span>
                      <span className="xb-item--text">
                        ROI increase over 3 years
                      </span>
                    </div>
                    <div className="xb-item--item border-blue">
                      <span className="xb-item--number">$355k</span>
                      <span className="xb-item--text">
                        In value due to increased team productivity
                      </span>
                    </div>
                    <div className="xb-item--item border-sky">
                      <span className="xb-item--number">547%</span>
                      <span className="xb-item--text">
                        Saved due to reduced administration time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="sa-project-item bg_img"
                data-background="assets/front/img/testimonial/sa-tes03.jpg"
              >
                <div className="xb-item--inner ul_li_between pos-rel z-1">
                  <div className="xb-item--project_title">
                    <h2 className="xb-item--title">
                      Expanding cambridge's reach with SEO solutions
                    </h2>
                    <p className="xb-item--content">
                      Cambridge expanded its reach with through targeted SEO
                      solutions, boosting visibility and driving growth.
                    </p>
                    <div className="xb-btn mt-50">
                      <a
                        href="casestudy-details.html"
                        className="thm-btn thm-btn--border"
                      >
                        Read case study{" "}
                        <span>
                          <img
                            src="assets/front/img/icon/proj-arrow.svg"
                            alt="Expert Code Lab"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="xb-item--item-box mt-none-50">
                    <div className="xb-item--item">
                      <span className="xb-item--number">418%</span>
                      <span className="xb-item--text">
                        ROI increase over 3 years
                      </span>
                    </div>
                    <div className="xb-item--item border-blue">
                      <span className="xb-item--number">$185k</span>
                      <span className="xb-item--text">
                        In value due to increased team productivity
                      </span>
                    </div>
                    <div className="xb-item--item border-sky">
                      <span className="xb-item--number">480%</span>
                      <span className="xb-item--text">
                        Saved due to reduced administration time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="sa-project-item bg_img"
                data-background="assets/front/img/testimonial/sa-tes04.jpg"
              >
                <div className="xb-item--inner ul_li_between pos-rel z-1">
                  <div className="xb-item--project_title">
                    <h2 className="xb-item--title">
                      Madrid's digital footprint with targeted SEO
                    </h2>
                    <p className="xb-item--content">
                      Targeted SEO strategies strengthened Madrid's digital
                      footprint,visibility and driving engagement.
                    </p>
                    <div className="xb-btn mt-50">
                      <a
                        href="casestudy-details.html"
                        className="thm-btn thm-btn--border"
                      >
                        Read case study{" "}
                        <span>
                          <img
                            src="assets/front/img/icon/proj-arrow.svg"
                            alt="Expert Code Lab"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                  <div className="xb-item--item-box mt-none-50">
                    <div className="xb-item--item">
                      <span className="xb-item--number">588%</span>
                      <span className="xb-item--text">
                        ROI increase over 3 years
                      </span>
                    </div>
                    <div className="xb-item--item border-blue">
                      <span className="xb-item--number">$355k</span>
                      <span className="xb-item--text">
                        In value due to increased team productivity
                      </span>
                    </div>
                    <div className="xb-item--item border-sky">
                      <span className="xb-item--number">547%</span>
                      <span className="xb-item--text">
                        Saved due to reduced administration time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sa-projecr_brand pt-70">
            <div className="container">
              <div className="seo-project-slider-nav">
                <div className="sa-brand-item">
                  <div className="xb-img">
                    <img
                      src="assets/front/img/brand/brand-logo03.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <div className="xb-line" />
                </div>
                <div className="sa-brand-item">
                  <div className="xb-img">
                    <img
                      src="assets/front/img/brand/brand-logo04.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <div className="xb-line" />
                </div>
                <div className="sa-brand-item">
                  <div className="xb-img">
                    <img
                      src="assets/front/img/brand/brand-logo02.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <div className="xb-line" />
                </div>
                <div className="sa-brand-item">
                  <div className="xb-img">
                    <img
                      src="assets/front/img/brand/brand-logo01.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <div className="xb-line" />
                </div>
                <div className="sa-brand-item">
                  <div className="xb-img">
                    <img
                      src="assets/front/img/brand/brand-logo02.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <div className="xb-line" />
                </div>
                <div className="sa-brand-item">
                  <div className="xb-img">
                    <img
                      src="assets/front/img/brand/brand-logo01.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <div className="xb-line" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* project section end  */}
      {/* process section start  */}
      <section
        className="process pt-130 pb-100 pos-rel"
        data-bg-color="#0F55DC"
      >
        <div className="container">
          <div className="sec-title--two text-center mb-90">
            <div
              className="sub-title sub-title--strock wow fadeInDown"
              data-wow-duration="600ms"
            >
              <img
                src="assets/front/img/icon/process-icon.svg"
                alt="Expert Code Lab"
              />
              Our working process
            </div>
            <h2
              className="title clr-white wow fadeInDown"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
              Our SEO workflow
            </h2>
          </div>
          <div className="row flex-row-reverse">
            <div className="col-lg-6">
              <div className="sa-process_right">
                <div
                  className="sa-process-image wow fadeInRight"
                  data-wow-duration="600ms"
                >
                  <img
                    className="updown"
                    src="assets/front/img/process/illistration.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <div className="process_shape">
                  <img
                    src="assets/front/img/shape/pattern.png"
                    alt="Expert Code Lab"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="sa-process_left">
                <div className="process-item process-item--one">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/search01.svg"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h4 className="xb-item--title">Research niche </h4>
                  <p className="xb-item--contact">
                    Identify your target market and understand customer needs to
                    find competitive.
                  </p>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="process-item process-item--two">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/user-icon.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h4 className="xb-item--title">Set up your team</h4>
                  <p className="xb-item--contact">
                    Assemble a skilled team aligned with your business goals and
                    objectives.
                  </p>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="process-item process-item--three">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/clipboar02.svg"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h4 className="xb-item--title">Create a game plan</h4>
                  <p className="xb-item--contact">
                    Develop a detailed strategy objectives, audiences, and
                    marketing approaches.
                  </p>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="process-item process-item--four">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/medal-star.svg"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h4 className="xb-item--title">Review and scale</h4>
                  <p className="xb-item--contact">
                    Analyze performance metrics regularly to optimize and grow
                    your strategy effectively.
                  </p>
                  <span className="xb-item--number">04</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sa-process_shape">
          <div className="shape shape--one">
            <img
              src="assets/front/img/shape/trangle-shape02.png"
              alt="Expert Code Lab"
            />
          </div>
          <div className="shape shape--two">
            <img
              src="assets/front/img/shape/trangle-shape03.png"
              alt="Expert Code Lab"
            />
          </div>
        </div>
      </section>
      {/* process section end  */}
      {/* industrie section start  */}
      <section className="industrie m-lr pt-140 pb-140">
        <div className="industrie-wrap sec-bg pos-rel pt-130 pb-130">
          <div className="container">
            <div className="sec-title--two text-center mb-30">
              <div
                className="sub-title wow fadeInDown"
                data-wow-duration="600ms"
              >
                <img
                  src="assets/front/img/icon/building.svg"
                  alt="Expert Code Lab"
                />
                Industries we work
              </div>
              <h2
                className="title wow fadeInDown"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                Serving diverse industries
              </h2>
            </div>
            <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2 row-cols-2">
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img01.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">SaaS</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="150ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img02.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Lawyers</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="300ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img03.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Real estate</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="450ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img04.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Insurance</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="600ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img05.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Crypto</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img06.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Private equity</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="150ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img07.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Education</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="300ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img08.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Finance</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="450ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img09.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Healthcare</h3>
                </div>
              </div>
              <div className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-delay="600ms"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img
                      src="assets/front/img/industrie/img10.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                  <h3 className="xb-title">Automotive</h3>
                </div>
              </div>
            </div>
            <div className="xb-btn text-center mt-60">
              <a href="contact.html" className="thm-btn thm-btn--aso">
                Book a free consultation
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* industrie section end  */}
      {/* testimonial section start */}
      <section className="testimonial o-hidden pb-140">
        <div className="container">
          <div className="sa-tes_top pos-rel mb-60">
            <div className="sec-title--two">
              <div
                className="sub-title wow fadeInDown"
                data-wow-duration="600ms"
              >
                <img
                  src="assets/front/img/icon/like-icon.svg"
                  alt="Expert Code Lab"
                />
                99% positive feedback
              </div>
              <h2
                className="title wow skewIn"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                Feedback That Speaks
              </h2>
            </div>
            <div className="sa-tes_button">
              <div className="sa-swiper-btn swiper-button-prev">
                <i className="fal fa-angle-left" />
              </div>
              <div className="sa-swiper-btn active swiper-button-next">
                <i className="fal fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="sa-testimonial-slider-inner">
          <div className="sa-testimonial-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="sa-testimonial-item">
                  <div className="xb-item--inner">
                    <div className="xb-item--quta">
                      <img
                        src="assets/front/img/icon/quta.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <p className="xb-item--content">
                      "Working with ECL was fantastic! Their strategies
                      <br /> improved our rankings and increased leads."
                    </p>
                    <div className="xb-item--holder ul_li">
                      <div className="xb-item--avatar">
                        <img
                          src="assets/front/img/testimonial/sa-tas05.png"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--author">
                        <h3 className="xb-item--name">Christopher Smith</h3>
                        <span className="xb-item--desig">
                          Brand Strat at near{" "}
                        </span>
                        <div className="xb-item--logo">
                          <img
                            src="assets/front/img/testimonial/tes-logo02.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="sa-testimonial-item">
                  <div className="xb-item--inner">
                    <div className="xb-item--quta">
                      <img
                        src="assets/front/img/icon/quta.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <p className="xb-item--content">
                      "ECL exceeded all our expectations! Their expertise in SEO
                      helped us achieve a remarkable 150% "
                    </p>
                    <div className="xb-item--holder ul_li">
                      <div className="xb-item--avatar">
                        <img
                          src="assets/front/img/testimonial/sa-tas01.png"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--author">
                        <h3 className="xb-item--name">Sarah Davis</h3>
                        <span className="xb-item--desig">
                          Branding at spinlet{" "}
                        </span>
                        <div className="xb-item--logo">
                          <img
                            src="assets/front/img/testimonial/tes-logo01.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="sa-testimonial-item">
                  <div className="xb-item--inner">
                    <div className="xb-item--quta">
                      <img
                        src="assets/front/img/icon/quta.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <p className="xb-item--content">
                      "Choosing ECL was a great decision. Their focus on trends
                      helped us rank for competitive keywords, our success!"
                    </p>
                    <div className="xb-item--holder ul_li">
                      <div className="xb-item--avatar">
                        <img
                          src="assets/front/img/testimonial/sa-tas02.png"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--author">
                        <h3 className="xb-item--name">Robert Miller</h3>
                        <span className="xb-item--desig">
                          Marketing Dir. at BUSD
                        </span>
                        <div className="xb-item--logo">
                          <img
                            src="assets/front/img/testimonial/tes-logo03.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="sa-testimonial-item">
                  <div className="xb-item--inner">
                    <div className="xb-item--quta">
                      <img
                        src="assets/front/img/icon/quta.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <p className="xb-item--content">
                      "Since partnering with ECL, our website's performance has
                      improved remarkably. Their data-driven approach and
                      top-notch!"
                    </p>
                    <div className="xb-item--holder ul_li">
                      <div className="xb-item--avatar">
                        <img
                          src="assets/front/img/testimonial/sa-tas03.png"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--author">
                        <h3 className="xb-item--name">Jessica Martinez</h3>
                        <span className="xb-item--desig">
                          Project Manager at Kuda
                        </span>
                        <div className="xb-item--logo">
                          <img
                            src="assets/front/img/testimonial/tes-logo04.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="sa-testimonial-item">
                  <div className="xb-item--inner">
                    <div className="xb-item--quta">
                      <img
                        src="assets/front/img/icon/quta.png"
                        alt="Expert Code Lab"
                      />
                    </div>
                    <p className="xb-item--content">
                      "Thanks to ECL, our organic search traffic has
                      skyrocketed! Their comprehensive SEO solutions are and
                      customized."
                    </p>
                    <div className="xb-item--holder ul_li">
                      <div className="xb-item--avatar">
                        <img
                          src="assets/front/img/testimonial/sa-tas04.png"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--author">
                        <h3 className="xb-item--name">Kevin Johnson</h3>
                        <span className="xb-item--desig">
                          Social Coordinator
                        </span>
                        <div className="xb-item--logo">
                          <img
                            src="assets/front/img/testimonial/tes-logo05.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial section end  */}
      {/* feature section start  */}
      <section className="feature">
        <div className="feature-wrapper sec-bg sec-bg--2 pt-130 pb-130">
          <div className="container">
            <div className="feature_inner">
              <div className="sec-title--two text-center mb-60">
                <div
                  className="sub-title wow fadeInDown"
                  data-wow-duration="600ms"
                >
                  <img
                    src="assets/front/img/icon/star.svg"
                    alt="Expert Code Lab"
                  />
                  Why we’re dirrerent
                </div>
                <h2
                  className="title wow fadeInDown"
                  data-wow-delay="150ms"
                  data-wow-duration="600ms"
                >
                  Take a look at how we're different
                </h2>
              </div>
              <table className="feature-table">
                <thead>
                  <tr>
                    <th>Features</th>
                    <th>
                      <img
                        src="assets/front/img/logo/logo-white.svg"
                        alt="Expert Code Lab"
                      />
                    </th>
                    <th>Other SEO agencies</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr>
                    <td>Take on projects only if confident in delivery.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/erorr.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tailor-made, revenue-boosting strategy.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/erorr.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>100% focus on your project.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/erorr.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Transparent about meeting goals and deadlines.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Cares about long-term SEO success.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/erorr.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Knows that ROI is the most important metric.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/erorr.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Feels like an extension of your marketing team.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Crafts a results-driven strategy.</td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                    <td>
                      <img
                        src="assets/front/img/icon/check.svg"
                        alt="Expert Code Lab"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* feature section end  */}
      {/* team section start  */}
      <section className="team pt-140 pb-140">
        <div className="container">
          <div className="sec-title--two text-center mb-60">
            <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
              <img src="assets/front/img/icon/cap.svg" alt="Expert Code Lab" />
              Our specialists
            </div>
            <h2
              className="title wow fadeInDown"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
              Dedicated Professionals{" "}
            </h2>
          </div>
          <div className="sa-team pos-rel">
            <div className="team-slider swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="team-item">
                    <div className="xb-item--content pos-rel">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/team/team-bg.jpg"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--item">
                        <span className="xb-item--skill">
                          15 Years experience
                        </span>
                        <span className="xb-item--reating">
                          <i className="fas fa-star" /> 4.9
                        </span>
                      </div>
                    </div>
                    <div className="xb-item--inner ul_li_between align-items-end">
                      <div className="xb-item--holder">
                        <div className="xb-item--avatar">
                          <img
                            src="assets/front/img/team/sa-team02.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                        <div className="xb-item--author">
                          <h3 className="xb-item--name">James anderson</h3>
                          <span className="xb-item--desig">
                            Technical SEO Specialist
                          </span>
                        </div>
                      </div>
                      <ul className="xb-item--social-link ul_li">
                        <li>
                          <a href="#!">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.6883 7.62176L17.2244 0H15.6756L10.0002 6.61789L5.46738 0H0.239258L7.09382 10.0074L0.239258 18H1.7882L7.7815 11.0113L12.5685 18H17.7967L10.6879 7.62176H10.6883ZM2.3463 1.16972H4.72537L15.6763 16.8835H13.2972L2.3463 1.16972Z"
                                fill="#111112"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="team-item">
                    <div className="xb-item--content pos-rel">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/team/team-bg.jpg"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--item">
                        <span className="xb-item--skill">
                          18 Years experience
                        </span>
                        <span className="xb-item--reating">
                          <i className="fas fa-star" /> 4.8
                        </span>
                      </div>
                    </div>
                    <div className="xb-item--inner ul_li_between align-items-end">
                      <div className="xb-item--holder">
                        <div className="xb-item--avatar">
                          <img
                            src="assets/front/img/team/sa-team03.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                        <div className="xb-item--author">
                          <h3 className="xb-item--name">David wilson</h3>
                          <span className="xb-item--desig">
                            SEO Project Manager
                          </span>
                        </div>
                      </div>
                      <ul className="xb-item--social-link ul_li">
                        <li>
                          <a href="#!">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.6883 7.62176L17.2244 0H15.6756L10.0002 6.61789L5.46738 0H0.239258L7.09382 10.0074L0.239258 18H1.7882L7.7815 11.0113L12.5685 18H17.7967L10.6879 7.62176H10.6883ZM2.3463 1.16972H4.72537L15.6763 16.8835H13.2972L2.3463 1.16972Z"
                                fill="#111112"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="team-item">
                    <div className="xb-item--content pos-rel">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/team/team-bg.jpg"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--item">
                        <span className="xb-item--skill">
                          10 Years experience
                        </span>
                        <span className="xb-item--reating">
                          <i className="fas fa-star" /> 4.8
                        </span>
                      </div>
                    </div>
                    <div className="xb-item--inner ul_li_between align-items-end">
                      <div className="xb-item--holder">
                        <div className="xb-item--avatar">
                          <img
                            src="assets/front/img/team/sa-team01.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                        <div className="xb-item--author">
                          <h3 className="xb-item--name">Sophia turner</h3>
                          <span className="xb-item--desig">
                            Link Building Manager
                          </span>
                        </div>
                      </div>
                      <ul className="xb-item--social-link ul_li">
                        <li>
                          <a href="#!">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.6883 7.62176L17.2244 0H15.6756L10.0002 6.61789L5.46738 0H0.239258L7.09382 10.0074L0.239258 18H1.7882L7.7815 11.0113L12.5685 18H17.7967L10.6879 7.62176H10.6883ZM2.3463 1.16972H4.72537L15.6763 16.8835H13.2972L2.3463 1.16972Z"
                                fill="#111112"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="team-item">
                    <div className="xb-item--content pos-rel">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/team/team-bg.jpg"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--item">
                        <span className="xb-item--skill">
                          18 Years experience
                        </span>
                        <span className="xb-item--reating">
                          <i className="fas fa-star" /> 4.9
                        </span>
                      </div>
                    </div>
                    <div className="xb-item--inner ul_li_between align-items-end">
                      <div className="xb-item--holder">
                        <div className="xb-item--avatar">
                          <img
                            src="assets/front/img/team/sa-team04.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                        <div className="xb-item--author">
                          <h3 className="xb-item--name">Natalie brooks</h3>
                          <span className="xb-item--desig">
                            Senior SEO Strategist
                          </span>
                        </div>
                      </div>
                      <ul className="xb-item--social-link ul_li">
                        <li>
                          <a href="#!">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.6883 7.62176L17.2244 0H15.6756L10.0002 6.61789L5.46738 0H0.239258L7.09382 10.0074L0.239258 18H1.7882L7.7815 11.0113L12.5685 18H17.7967L10.6879 7.62176H10.6883ZM2.3463 1.16972H4.72537L15.6763 16.8835H13.2972L2.3463 1.16972Z"
                                fill="#111112"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="team-item">
                    <div className="xb-item--content pos-rel">
                      <div className="xb-item--img">
                        <img
                          src="assets/front/img/team/team-bg.jpg"
                          alt="Expert Code Lab"
                        />
                      </div>
                      <div className="xb-item--item">
                        <span className="xb-item--skill">
                          20 Years experience
                        </span>
                        <span className="xb-item--reating">
                          <i className="fas fa-star" /> 4.8
                        </span>
                      </div>
                    </div>
                    <div className="xb-item--inner ul_li_between align-items-end">
                      <div className="xb-item--holder">
                        <div className="xb-item--avatar">
                          <img
                            src="assets/front/img/team/sa-team05.png"
                            alt="Expert Code Lab"
                          />
                        </div>
                        <div className="xb-item--author">
                          <h3 className="xb-item--name">Brian johnson</h3>
                          <span className="xb-item--desig">
                            Business Developer
                          </span>
                        </div>
                      </div>
                      <ul className="xb-item--social-link ul_li">
                        <li>
                          <a href="#!">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="#!">
                            <svg
                              width={18}
                              height={18}
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.6883 7.62176L17.2244 0H15.6756L10.0002 6.61789L5.46738 0H0.239258L7.09382 10.0074L0.239258 18H1.7882L7.7815 11.0113L12.5685 18H17.7967L10.6879 7.62176H10.6883ZM2.3463 1.16972H4.72537L15.6763 16.8835H13.2972L2.3463 1.16972Z"
                                fill="#111112"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="team-btn">
              <div className="sa-swiper-btn swiper-button-prev">
                <i className="fal fa-angle-left" />
              </div>
              <div className="sa-swiper-btn active swiper-button-next">
                <i className="fal fa-angle-right" />
              </div>
            </div>
            <div
              className="xb-btn text-center mt-50 wow fadeInUp"
              data-wow-duration="600ms"
            >
              <a href="team.html" className="thm-btn thm-btn--aso">
                Meet our all team member
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* team section end  */}
      {/* faq section start  */}
      <section className="faq pb-140">
        <div className="container">
          <div className="sec-title--two text-center mb-60">
            <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
              <img
                src="assets/front/img/icon/magic.svg"
                alt="Expert Code Lab"
              />
              FAQ’s
            </div>
            <h2
              className="title wow fadeInDown"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
              Have a question look here{" "}
            </h2>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div
                className="xb-faq wow fadeInUp"
                data-wow-delay="200ms"
                data-wow-duration="600ms"
              >
                <ul className="accordion_box clearfix list-unstyled">
                  <li className="accordion block active-block">
                    <div className="acc-btn active">
                      <span className="number">01</span> _ How long does it take
                      to get results from SEO?
                      <span className="arrow" />
                    </div>
                    <div className="acc_body current">
                      <div className="content">
                        <p>
                          On average, our clients start to see initial results
                          from SEO in 4-6 months. But heads up: If the niche is
                          very competitive, it can take up to 1-2 years. Every
                          website and strategy is different so the timeline will
                          depend on a number of factors. Like:
                        </p>
                        <ul className="list-unstyled">
                          <li>
                            <i className="far fa-check" />
                            The age and authority of your site.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Your on-page and off-page optimization.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Any penalties pulling your ranking down.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      <span className="number">02</span> _ What SEO strategies
                      do you implement for optimal results?
                      <span className="arrow" />
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        <p>
                          On average, our clients start to see initial results
                          from SEO in 4-6 months. But heads up: If the niche is
                          very competitive, it can take up to 1-2 years. Every
                          website and strategy is different so the timeline will
                          depend on a number of factors. Like:
                        </p>
                        <ul className="list-unstyled">
                          <li>
                            <i className="far fa-check" />
                            The age and authority of your site.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Your on-page and off-page optimization.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Any penalties pulling your ranking down.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      <span className="number">03</span> _ What part of the SEO
                      process do you outsource?
                      <span className="arrow" />
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        <p>
                          On average, our clients start to see initial results
                          from SEO in 4-6 months. But heads up: If the niche is
                          very competitive, it can take up to 1-2 years. Every
                          website and strategy is different so the timeline will
                          depend on a number of factors. Like:
                        </p>
                        <ul className="list-unstyled">
                          <li>
                            <i className="far fa-check" />
                            The age and authority of your site.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Your on-page and off-page optimization.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Any penalties pulling your ranking down.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      <span className="number">04</span> _ Can you handle SEO
                      for an enterprise-size company?
                      <span className="arrow" />
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        <p>
                          On average, our clients start to see initial results
                          from SEO in 4-6 months. But heads up: If the niche is
                          very competitive, it can take up to 1-2 years. Every
                          website and strategy is different so the timeline will
                          depend on a number of factors. Like:
                        </p>
                        <ul className="list-unstyled">
                          <li>
                            <i className="far fa-check" />
                            The age and authority of your site.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Your on-page and off-page optimization.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Any penalties pulling your ranking down.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      <span className="number">05</span> _ Do you offer
                      professional link-building services?
                      <span className="arrow" />
                    </div>
                    <div className="acc_body">
                      <div className="content">
                        <p>
                          On average, our clients start to see initial results
                          from SEO in 4-6 months. But heads up: If the niche is
                          very competitive, it can take up to 1-2 years. Every
                          website and strategy is different so the timeline will
                          depend on a number of factors. Like:
                        </p>
                        <ul className="list-unstyled">
                          <li>
                            <i className="far fa-check" />
                            The age and authority of your site.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Your on-page and off-page optimization.
                          </li>
                          <li>
                            <i className="far fa-check" />
                            Any penalties pulling your ranking down.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
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
                  src="assets/front/img/cta/clip-bord.png"
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

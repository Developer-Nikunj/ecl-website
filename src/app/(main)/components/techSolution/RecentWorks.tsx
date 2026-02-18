"use client";

import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import Link from "next/link";

const RecentWorks = () => {
  const swiperRef = useRef(null);
  const [data, setData] = useState([]);

  const getRecentWork = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/tech-recent-work`,
      );

      if (res.data.status != 1) {
        return null;
      }

      setData(res.data.data);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    // Initialize Swiper with modules
    swiperRef.current = new Swiper(".project-slider", {
      modules: [Autoplay, Pagination],
      slidesPerView: 1.2,
      centeredSlides: true,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 1.1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1.3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 1.5,
          spaceBetween: 25,
        },
        1280: {
          slidesPerView: 1.8,
          spaceBetween: 30,
        },
      },
    });

    // Cleanup function
    return () => {
      if (swiperRef.current && swiperRef.current.destroy) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, []);

  useEffect(() => {
    getRecentWork();
  }, []);

  // Project data for better maintainability
  const projects = [
    {
      id: 1,
      icon: "assets/front/img/icon/pro-icon01.png",
      title: "Delivering remote solutions",
      description:
        "Delivering Remote Solutions provides teams with tools for effective and productivity from anywhere.",
      categories: ["product design", "logo", "visual identity"],
      image: "assets/front/img/project/img01.png",
    },
    {
      id: 2,
      icon: "assets/front/img/icon/pro-icon02.png",
      title: "Real-time health monitoring",
      description:
        "Real-Time Health Monitoring via Mobile App tracks vital signs, enabling early detection.",
      categories: ["product design", "app", "visual identity"],
      image: "assets/front/img/project/img02.png",
    },
    {
      id: 3,
      icon: "assets/front/img/icon/pro-icon03.png",
      title: "Simple time management",
      description:
        "Simple Time Management boosts productivity by prioritizing tasks and reducing distractions.",
      categories: ["product design", "3d", "visual identity"],
      image: "assets/front/img/project/img03.png",
    },
    {
      id: 4,
      icon: "assets/front/img/icon/pro-icon02.png",
      title: "Mobile app development",
      description:
        "Custom mobile app development solutions for iOS and Android platforms.",
      categories: ["mobile app", "development", "ui/ux"],
      image: "assets/front/img/project/img02.png",
    },
  ];

  return (
    <section className="py-5 overflow-hidden">
      <div className="position-relative">
        <div className="project-slider swiper">
          <div className="swiper-wrapper">
            {data.map((project) => (
              <div key={project.id} className="swiper-slide">
                <div
                  className=" p-3 p-md-4 p-lg-5 mx-2 h-100"
                  style={{
                    minHeight: "clamp(400px, 50vh, 520px)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="d-flex flex-column flex-lg-row align-items-start gap-3 gap-lg-4 w-100">
                    {/* Left Content */}
                    <div className="flex-grow-1">
                      <div className="mb-3 mb-md-4">
                        <img
                          src={project.icon}
                          alt={`${project.title} icon`}
                          className="img-fluid"
                          style={{
                            maxWidth: "clamp(40px, 5vw, 60px)",
                            height: "auto",
                          }}
                          loading="lazy"
                        />
                      </div>

                      <h3 className="h5 h4-md h3-lg mb-2 mb-md-3">
                        <a
                          href="casestudy-details.html"
                          className="text-decoration-none text-dark"
                        >
                          {project.title}
                        </a>
                      </h3>

                      <p
                        className="text-secondary mb-3 mb-md-4"
                        style={{
                          fontSize: "clamp(15px, 1.4vw, 25px)",
                          lineHeight: "1.7",
                          maxWidth: "700px",
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {project.description}
                      </p>

                      <ul className="list-unstyled d-flex flex-wrap gap-2 mb-3 mb-md-4">
                        {project.categories.map((category, index) => (
                          <li key={index}>
                            <a
                              href="#!"
                              className="d-inline-block px-2 py-1 bg-light text-decoration-none text-secondary rounded-pill small text-capitalize"
                              style={{
                                fontSize: "clamp(15px, 1.9vw, 29px)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {category}
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div>
                        <Link
                          href={`recent-work/${project.slug}`}
                          className="d-inline-flex align-items-center gap-2 text-decoration-none fw-semibold position-relative"
                          style={{
                            fontSize: "clamp(16px, 1.4vw, 22px)",
                            padding: "12px 22px",
                            borderRadius: "50px",
                            background:
                              "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "#fff",
                            transition: "all 0.3s ease",
                            overflow: "hidden",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-3px)";
                            e.currentTarget.style.boxShadow =
                              "0 12px 25px rgba(79, 70, 229, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <span>View Case Study</span>

                          <span
                            style={{
                              display: "inline-flex",
                              transition: "transform 0.3s ease",
                            }}
                            className="arrow"
                          >
                            <i className="fas fa-arrow-right" />
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Right Image with Hover Effect */}
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: "clamp(350px, 45%, 450px)",
                        maxWidth: "100%",
                      }}
                    >
                      <a
                        href="casestudy-details.html"
                        className="d-block overflow-hidden rounded-3"
                        style={{
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 20px rgba(0,0,0,0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="img-fluid w-100"
                          style={{
                            transition: "all 0.3s ease",
                          }}
                          loading="lazy"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="swiper-pagination position-relative mt-3 mt-md-4 pt-2 pt-md-3"></div>
        </div>
      </div>
    </section>
  );
};

export default RecentWorks;

"use client";

import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const RecentWorks = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper with modules
    swiperRef.current = new Swiper(".project-slider", {
      modules: [Autoplay, Pagination],
      slidesPerView: 1.9,
      centeredSlides: true,
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 2000,
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
          slidesPerView: 1.5,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 1.8,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 2.0,
          spaceBetween: 25,
        },
        1280: {
          slidesPerView: 2.5,
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
            {projects.map((project) => (
              <div key={project.id} className="swiper-slide">
                <div
                  className=" p-3 p-md-4 p-lg-5 mx-4 h-100"
                  style={{
                    minHeight: "clamp(400px, 50vh, 520px)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className="d-flex flex-column flex-lg-row align-items-start gap-1 gap-lg-1 w-120">
                    {/* Left Content */}
                    <div
                      className="flex-grow-1"
                      style={{
                        flex: "1 1 60%", // 👈 ADD THIS - takes 60% of space
                        minWidth: "300px", // 👈 ADD THIS - prevents shrinking too much
                      }}
                    >
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
                        className="text-secondary small mb-3 mb-md-4"
                        style={{
                          fontSize: "clamp(13px, 1.5vw, 15px)",
                          lineHeight: "1.5",
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
                                fontSize: "clamp(10px, 1.2vw, 12px)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {category}
                            </a>
                          </li>
                        ))}
                      </ul>

                      <div>
                        <a
                          href="casestudy-details.html"
                          className="d-inline-flex align-items-center text-decoration-none text-dark fw-semibold"
                          style={{ fontSize: "clamp(13px, 1.5vw, 14px)" }}
                        >
                          <span>View case study</span>
                          <span className="mx-1 mx-md-2">
                            <i className="far fa-long-arrow-right" />
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Right Image with Hover Effect */}
                    <div
                      className="flex-shrink-0"
                      style={{
                        width: "clamp(250px, 50%, 450px)",
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

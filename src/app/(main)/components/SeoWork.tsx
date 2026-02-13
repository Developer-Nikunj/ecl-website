"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import Link from "next/link";

const SeoWork = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide>
          <div
            className="sa-project-item"
            style={{
              backgroundImage:
                "url(/assets/front/img/testimonial/sa-tes02.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "700px",
            }}
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
                  <Link
                    href="/"
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
                  </Link>
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
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="sa-project-item"
            style={{
              backgroundImage:
                "url(/assets/front/img/testimonial/sa-tes01.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "700px",
            }}
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
                  <Link
                    href="/"
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
                  </Link>
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
                  <span className="xb-item--number">$211k</span>
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
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="sa-project-item"
            style={{
              backgroundImage:
                "url(/assets/front/img/testimonial/sa-tes03.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "700px",
            }}
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
                  <Link
                    href="/"
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
                  </Link>
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
                  <span className="xb-item--number">$185</span>
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
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="sa-project-item"
            style={{
              backgroundImage:
                "url(/assets/front/img/testimonial/sa-tes04.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "700px",
            }}
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
                  <Link
                    href="/"
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
                  </Link>
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
                  <span className="xb-item--number">$355</span>
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
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="sa-project-item"
            style={{
              backgroundImage:
                "url(/assets/front/img/testimonial/sa-tes03.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "700px",
            }}
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
                  <Link
                    href="/"
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
                  </Link>
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
                  <span className="xb-item--number">$185</span>
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
        </SwiperSlide>
      </Swiper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        <img
          src="/assets/front/img/brand/brand-logo03.png"
          width={120}
          style={{
            cursor: "pointer",
            opacity: activeIndex === 0 ? 1 : 0.5,
            // border: activeIndex === 0 ? "2px solid #000" : "none",
            transition: "0.3s",
          }}
          onClick={() => swiperRef.current?.slideToLoop(0)}
        />

        <img
          src="/assets/front/img/brand/brand-logo04.png"
          width={120}
          style={{
            cursor: "pointer",
            opacity: activeIndex === 1 ? 1 : 0.5,
            border: activeIndex === 1 ? "2px solid #000" : "none",
            transition: "0.3s",
          }}
          onClick={() => swiperRef.current?.slideToLoop(1)}
        />
        <img
          src="/assets/front/img/brand/brand-logo02.png"
          width={120}
          style={{
            cursor: "pointer",
            opacity: activeIndex === 2 ? 1 : 0.5,
            border: activeIndex === 2 ? "2px solid #000" : "none",
            transition: "0.3s",
          }}
          onClick={() => swiperRef.current?.slideToLoop(2)}
        />
        <img
          src="/assets/front/img/brand/brand-logo03.png"
          width={120}
          style={{
            cursor: "pointer",
            opacity: activeIndex === 3 ? 1 : 0.5,
            border: activeIndex === 3 ? "2px solid #000" : "none",
            transition: "0.3s",
          }}
          onClick={() => swiperRef.current?.slideToLoop(3)}
        />
        <img
          src="/assets/front/img/brand/brand-logo02.png"
          width={120}
          style={{
            cursor: "pointer",
            opacity: activeIndex === 4 ? 1 : 0.5,
            border: activeIndex === 4 ? "2px solid #000" : "none",
            transition: "0.3s",
          }}
          onClick={() => swiperRef.current?.slideToLoop(4)}
        />
      </div>
    </>
  );
};

export default SeoWork;

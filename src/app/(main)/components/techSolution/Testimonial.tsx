"use client";

import React, { useEffect } from "react";
import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonial = () => {
  useEffect(() => {
    new Swiper(".testimonial-slider", {
      modules: [Autoplay, Pagination, Navigation],

      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 800,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }, []);

  return (
    <div>
      {/* ADD ONLY "swiper" CLASS HERE */}
      <div className="testimonial-slider swiper pb-40">
        <div className="swiper-wrapper">
          {/* Slide 1 */}
          <div className="swiper-slide">
            <div className="container">
              <div className="row justify-content-center">
                {/* 20% left + 20% right ≈ center card */}
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="testimonial-item">
                    <div className="xb-item--holder">
                      <div className="xb-item--author">
                        <div className="img img--one">
                          <img
                            src="/assets/front/img/icon/tes-icon.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="img img--two">
                          <img
                            src="/assets/front/img/testimonial/tes-img01.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="xb-item--avatar mt-20">
                          <h3 className="xb-item--name">Sophia Turner</h3>
                          <span className="xb-item--desig">
                            Founder at Fleet chaser
                          </span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center align-items-center">
                        <p className="xb-item--content text-center">
                          "We’ve worked with ECL for over a year, and their IT
                          services have been nothing short of excellent."
                        </p>
                      </div>
                    </div>

                    <div className="xb-item--bottom ul_li_between">
                      <div className="xb-item--rating">
                        <span>
                          <img
                            src="/assets/front/img/testimonial/rating-star.png"
                            alt="Experts Solutions"
                          />
                          5.0
                        </span>
                      </div>

                      <span className="xb-item--quat">
                        <img
                          src="/assets/front/img/icon/quat.png"
                          alt="Experts Solutions"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="swiper-slide">
            <div className="container">
              <div className="row justify-content-center">
                {/* Center card */}
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="testimonial-item">
                    <div className="xb-item--holder">
                      <div className="xb-item--author">
                        <div className="img img--one">
                          <img
                            src="/assets/front/img/icon/tes-icon.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="img img--two">
                          <img
                            src="/assets/front/img/testimonial/tes-img01.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="xb-item--avatar mt-20">
                          <h3 className="xb-item--name">Sophia Turner</h3>
                          <span className="xb-item--desig">
                            Founder at Fleet chaser
                          </span>
                        </div>
                      </div>

                      <p className="xb-item--content">
                        "We’ve worked with ECL for over a year, and their IT
                        services have been nothing short of excellent. They are
                        quick to respond, reliable, and have helped us avoid
                        several critical issues."
                      </p>
                    </div>

                    <div className="xb-item--bottom ul_li_between">
                      <div className="xb-item--rating">
                        <span>
                          <img
                            src="/assets/front/img/testimonial/rating-star.png"
                            alt="Experts Solutions"
                          />
                          5.0
                        </span>
                      </div>

                      <span className="xb-item--quat">
                        <img
                          src="/assets/front/img/icon/quat.png"
                          alt="Experts Solutions"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="swiper-slide">
            <div className="container">
              <div className="row justify-content-center">
                {/* Center card */}
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="testimonial-item">
                    <div className="xb-item--holder">
                      <div className="xb-item--author">
                        <div className="img img--one">
                          <img
                            src="/assets/front/img/icon/tes-icon02.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="img img--two">
                          <img
                            src="/assets/front/img/testimonial/tes-img02.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="xb-item--avatar mt-20">
                          <h3 className="xb-item--name">James Edward</h3>
                          <span className="xb-item--desig">
                            CEO of BrightTech
                          </span>
                        </div>
                      </div>

                      <p className="xb-item--content">
                        "ECL made managing our IT effortless. Their expert team
                        handled everything from cybersecurity to system upgrades
                        with precision."
                      </p>
                    </div>

                    <div className="xb-item--bottom ul_li_between">
                      <div className="xb-item--rating">
                        <span>
                          <img
                            src="/assets/front/img/testimonial/rating-star.png"
                            alt="Experts Solutions"
                          />
                          5.0
                        </span>
                      </div>

                      <span className="xb-item--quat">
                        <img
                          src="/assets/front/img/icon/quat.png"
                          alt="Experts Solutions"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="swiper-slide">
            <div className="container">
              <div className="row justify-content-center">
                {/* Center card */}
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="testimonial-item">
                    <div className="xb-item--holder">
                      <div className="xb-item--author">
                        <div className="img img--one">
                          <img
                            src="/assets/front/img/icon/tes-icon03.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="img img--two">
                          <img
                            src="/assets/front/img/testimonial/tes-img03.png"
                            alt="Experts Solutions"
                          />
                        </div>

                        <div className="xb-item--avatar mt-20">
                          <h3 className="xb-item--name">David Anderson</h3>
                          <span className="xb-item--desig">
                            HR Director of Max
                          </span>
                        </div>
                      </div>

                      <p className="xb-item--content">
                        "Working with ECL has been a game changer for our
                        business. Their proactive approach to IT management
                        saves us time and resources."
                      </p>
                    </div>

                    <div className="xb-item--bottom ul_li_between">
                      <div className="xb-item--rating">
                        <span>
                          <img
                            src="/assets/front/img/testimonial/rating-star.png"
                            alt="Experts Solutions"
                          />
                          5.0
                        </span>
                      </div>

                      <span className="xb-item--quat">
                        <img
                          src="/assets/front/img/icon/quat.png"
                          alt="Experts Solutions"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonial-pagination">
        <div className="swiper-buttons swiper-button-next">
          <i className="far fa-angle-right" />
        </div>
        <div className="swiper-buttons swiper-button-prev">
          <i className="far fa-angle-left" />
        </div>
        <div className="swiper-pagination" />
      </div>
    </div>
  );
};

export default Testimonial;

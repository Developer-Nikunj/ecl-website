"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

interface TeamMember {
  id: string;
  employeeImg: string;
  employeeName: string;
  Designation: string;
  Experience: string;
  Rating: number;
  [key: string]: any;
}

const Teams = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/employee`,
      );
      console.log(res)
      setData(res.data.data || []);
    } catch (error) {
      console.error("Teams data error:", error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-3">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="sa-team py-5 bg-white">
      <div className="container">
        {/* Top Section */}
        {/* Team Slider */}
        <div className="position-relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              nextEl: ".team-swiper-button-next",
              prevEl: ".team-swiper-button-prev",
            }}
            breakpoints={{
              576: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              992: { slidesPerView: 2 },
              1200: { slidesPerView: 2 },
            }}
            className="team-slider"
          >
            {data.map((member) => (
              <SwiperSlide key={member.id || member.employeeName}>
                <div className="team-item h-100">
                  {/* Card with background image */}
                  <div className="card border-0 rounded-4 overflow-hidden shadow-sm h-100">
                    {/* Background Image Section */}
                    <div
                      className="position-relative"
                      style={{ height: "180px" }}
                    >
                      <img
                        src="/assets/front/img/team/team-bg.jpg"
                        alt="Team Background"
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />

                      {/* Experience and Rating Badges */}
                      <div className="position-absolute top-0 start-0 w-100 p-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <span className="badge bg-light text-dark px-3 py-2 rounded-pill fw-semibold">
                            {member.Experience} Years experience
                          </span>
                          <span className="badge bg-white text-dark px-3 py-2 rounded-pill d-flex align-items-center gap-1">
                            <i className="fas fa-star text-warning"></i>
                            <span className="fw-semibold">{member.Rating}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Team Member Info */}
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-end">
                        <div className="flex-grow-1">
                          {/* Avatar */}
                          <div className="position-relative mb-4">
                            <div
                              className="position-absolute top-0 start-0"
                              style={{ transform: "translateY(-80%)" }}
                            >
                              {/* White background circle for border effect */}
                              <div
                                className="rounded-circle p-2 shadow"
                                style={{
                                  backgroundColor: "white",
                                  width: "116px",
                                  height: "116px",
                                }}
                              >
                                {/* Main border */}
                                <div
                                  className="rounded-circle border-4 border-white shadow overflow-hidden w-100 h-100"
                                  style={{
                                    borderWidth: "6px !important",
                                    boxShadow:
                                      "0 0 0 3px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.2)",
                                  }}
                                >
                                  <img
                                    src={
                                      member?.employeeImg ||
                                      "/assets/front/img/team/img01.png"
                                    }
                                    alt={member?.employeeName}
                                    className="img-fluid w-100 h-100 object-fit-cover"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.src =
                                        "/assets/front/img/team/img01.png";
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Name and Designation */}
                          <h3 className="card-title fw-bold text-dark mb-1">
                            {member.employeeName}
                          </h3>
                          <p className="card-text text-primary mb-3">
                            {member.Designation}
                          </p>
                        </div>

                        {/* Social Links */}
                        <div className="d-flex flex-column gap-2">
                          <a
                            href="#"
                            className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "36px", height: "36px" }}
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                          <a
                            href="#"
                            className="btn btn-outline-dark btn-sm rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "36px", height: "36px" }}
                          >
                            {/* Twitter/X SVG Icon */}
                            <svg
                              width="18"
                              height="18"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          {/* <div className="team-btn d-none d-md-flex">
            <div
              className="team-swiper-button-prev swiper-button-prev position-absolute top-50 start-0 translate-middle-y bg-white shadow rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                zIndex: 10,
                left: "-25px",
              }}
            >
              <i className="fas fa-angle-left"></i>
            </div>
            <div
              className="team-swiper-button-next swiper-button-next position-absolute top-50 end-0 translate-middle-y bg-white shadow rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                zIndex: 10,
                right: "-25px",
              }}
            >
              <i className="fas fa-angle-right"></i>
            </div>
          </div> */}
        </div>

        {/* View All Team Button */}
        <div className="text-center mt-5">
          <Link
            href="/team"
            className="btn btn-primary btn-lg px-4 py-3 rounded-pill"
          >
            Meet our all team member
          </Link>
        </div>

        {/* Custom CSS for Swiper */}
        <style jsx global>{`
          .team-slider {
            padding: 10px 5px 40px !important;
          }

          .team-slider .swiper-slide {
            height: auto;
          }

          .team-swiper-button-next,
          .team-swiper-button-prev {
            color: #333;
            background: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .team-swiper-button-next:hover,
          .team-swiper-button-prev:hover {
            background: #f8f9fa;
            color: #0d6efd;
          }

          .team-swiper-button-next:after,
          .team-swiper-button-prev:after {
            font-size: 20px;
            font-weight: bold;
          }

          @media (max-width: 768px) {
            .team-swiper-button-next,
            .team-swiper-button-prev {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Teams;

"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

const Jobs = () => {
  const [data,setData] =useState([]);
  const [category,setCategory] = useState('');
  const getAllJobs = async () => {
    const url = category
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/career?category=${category}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/career`;

    const response = await axios.get(url);
    setData(response.data.data);
  };

  const handleButtonClick=async(cat:string)=>{
    setCategory(cat);
  }

  useEffect(() => {
    getAllJobs();
  }, [category]);

  return (
    <div className="container">
      <div className="sec-title--two text-center mb-50">
        <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
          <img src="assets/front/img/icon/cp-icon.svg" alt="Hire Experts" />
          Open Positions
        </div>
        <h2
          className="title wow fadeInDown"
          data-wow-delay="150ms"
          data-wow-duration="600ms"
        >
          Join our team
        </h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-12 text-center">
          <div className="team-menu mb-50">
            <button
              onClick={() => handleButtonClick("")}
              className={category === "" ? "active" : ""}
              data-filter="*"
            >
              View all
            </button>

            <button
              onClick={() => handleButtonClick("Development")}
              className={category === "Development" ? "active" : ""}
              data-filter=".cat1"
            >
              Development
            </button>

            <button
              onClick={() => handleButtonClick("Design")}
              className={category === "Design" ? "active" : ""}
              data-filter=".cat2"
            >
              Design
            </button>

            <button
              onClick={() => handleButtonClick("Marketing")}
              className={category === "Marketing" ? "active" : ""}
              data-filter=".cat3"
            >
              Marketing
            </button>

            <button
              onClick={() => handleButtonClick("Customer Services")}
              className={category === "Customer Services" ? "active" : ""}
              data-filter=".cat4"
            >
              Customer services
            </button>

            <button
              onClick={() => handleButtonClick("Management")}
              className={category === "Management" ? "active" : ""}
              data-filter=".cat5"
            >
              Management
            </button>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="cp-team-wrap grid">
            {data.map((i) => (
              <div key={i.id} className="cp-team-item grid-item cat1 cat3 cat5">
                <div className="xb-item--inner ul_li_between">
                  <div className="xb-item--content">
                    <h3 className="xb-item--title">
                      <a href="#!">{i.title}</a>
                    </h3>
                    <div className="xb-item--holder ul_li">
                      <span className="xb-item--meta">
                        <img
                          src="assets/front/img/icon/loc-icon.svg"
                          alt="Hire Experts"
                        />
                        {i.location}
                      </span>
                      <span className="xb-item--meta">
                        <img
                          src="assets/front/img/icon/clock-icon.svg"
                          alt="Hire Experts"
                        />
                        {i.type}
                      </span>
                    </div>
                  </div>
                  <div className="cp-team-btn">
                    <Link href={`career/${i.id}`} className="cp-btn">
                      View job <i className="fal fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

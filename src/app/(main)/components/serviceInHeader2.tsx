"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const ServiceInHeader2 = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/service`,
      );

      console.log(res.data);

      // FIX: store only the array
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Vertical split
  const leftServices = data.filter((_, index) => index % 2 === 0);
  const rightServices = data.filter((_, index) => index % 2 !== 0);

  return (
    <div className="row">
      {/* Left Column */}
      <div className="col-xl-6 col-12">
        <div className="megamenu_widget">
          <ul className="icon_list unordered_list_block">
            {leftServices.map((i) => (
              <li key={i.id}>
                <Link href={`/service/${i.slug}`}>
                  <span className="icon_list_text">{i.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-xl-6 col-12">
        <div className="megamenu_widget">
          <ul className="icon_list unordered_list_block">
            {rightServices.map((i) => (
              <li key={i.id}>
                <Link href={`/service/${i.slug}`}>
                  <span className="icon_list_text">{i.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceInHeader2;

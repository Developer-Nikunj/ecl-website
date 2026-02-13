"use client";
import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';


const ServiceInHeader = () => {

    const [data,setData] = useState([]);

    const getData = async()=>{
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/service`,
        );
        console.log(res.data);
        setData(res.data);
    }

    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
      <div className="row">
        <div className="col-xl-6">
          <div className="megamenu_widget">
            <ul className="icon_list unordered_list_block">
              <li>
                <a href="#">
                  <span className="icon_list_text">International SEO</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_list_text">Niche research</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_list_text">Link building </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_list_text">Enterprise SEO</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="megamenu_widget">
            <ul className="icon_list unordered_list_block">
              <li>
                <a href="#">
                  <span className="icon_list_text">Penalty recovery</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_list_text">Content optimization</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_list_text">Technical SEO</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon_list_text">Competitor analysis</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceInHeader;

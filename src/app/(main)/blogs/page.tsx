"use client";

import axios from "axios";
import Image from "next/image";
import React,{useState,useEffect} from "react";
import BlogsComponent from "@/app/(main)/components/Blogs";
import Link from "next/link";

export default function Blogs() {
  
  const [blog, setBlog] = useState([]);
  const [first3blogs, setFirst3blogs] = useState([]);

  const fetchBlogs = async ()=>{
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/blogCategory`,
      );
      console.log("blogs", res.data.ans);
      if (res.data.ans.length > 1) {
        setBlog(res.data.ans);
        setFirst3blogs(res.data.first3blogs);
      }
    } catch (error) {
      
    }finally{

    }
  }

  useEffect(()=>{
    fetchBlogs()
  },[])
  return (
    <main>
      {/* page title start  */}
      <section
        className="page-title  pt-200 pos-rel bg_img"
        data-background="assets/front/img/bg/page_bg01.jpg"
      >
        <div className="container">
          <div className="page-title-wrap sd-title-wrap">
            <div className="row mt-none-30 align-items-end">
              <div className="col-lg-9 mt-30">
                <div className="page-title-box">
                  <span className="sub-title">
                    <img src="assets/front/img/icon/magic-icon.svg" alt="" />{" "}
                    Blog
                  </span>
                  <h2 className="title">
                    Expert insights from our SEO <br /> &amp; IT solutions blog
                    your <br /> source for success
                  </h2>
                </div>
              </div>
              <div className="col-lg-3 mt-30">
                <div className="sd-right-img pos-rel">
                  <img src="assets/front/img/hero/cd-img02.png" alt="" />
                  <div className="sd-arrow-shape style-2">
                    <img
                      className="xbzoominzoomup"
                      src="assets/front/img/shape/brd_shape.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page title end  */}
      {/* blog-slide end  */}
      <div className="blog pt-70">
        <div className="container">
          <div className="blog-slider swiper-container pos-rel">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="blog-slide-item">
                  <div className="xb-item--img">
                    <a href="blog-details.html">
                      <img src="assets/front/img/blog/b-img01.jpg" alt="" />
                    </a>
                  </div>
                  <div className="xb-item--holder">
                    <a href="#!" className="xb-item--tag">
                      software
                    </a>
                    <h2 className="xb-item--title border-effect">
                      <a href="blog-details.html">
                        How to optimize your IT network for maximum performance.
                      </a>
                    </h2>
                    <p className="xb-item--content">
                      Embark on an enlightening journey through the realm of IT
                      solutions as we delve into the <br /> latest technological
                      advancements shaping the digital landscape.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="blog-slide-item">
                  <div className="xb-item--img">
                    <img src="assets/front/img/blog/b-img02.jpg" alt="" />
                  </div>
                  <div className="xb-item--holder">
                    <a href="#!" className="xb-item--tag">
                      technology
                    </a>
                    <h2 className="xb-item--title border-effect">
                      <a href="blog-details.html">
                        How to perform a comprehensive SEO audit step by step
                        guide.
                      </a>
                    </h2>
                    <p className="xb-item--content">
                      Performing a comprehensive SEO audit involves a systematic
                      analysis of your website to <br /> identify areas for
                      improvement and ensure that it aligns with best practices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="blog-slide-item">
                  <div className="xb-item--img">
                    <img src="assets/front/img/blog/b-img01.jpg" alt="" />
                  </div>
                  <div className="xb-item--holder">
                    <a href="#!" className="xb-item--tag">
                      software
                    </a>
                    <h2 className="xb-item--title border-effect">
                      <a href="blog-details.html">
                        How to optimize your IT network for maximum performance.
                      </a>
                    </h2>
                    <p className="xb-item--content">
                      Embark on an enlightening journey through the realm of IT
                      solutions as we delve into the <br /> latest technological
                      advancements shaping the digital landscape.
                    </p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="blog-slide-item">
                  <div className="xb-item--img">
                    <img src="assets/front/img/blog/b-img02.jpg" alt="" />
                  </div>
                  <div className="xb-item--holder">
                    <a href="#!" className="xb-item--tag">
                      technology
                    </a>
                    <h2 className="xb-item--title border-effect">
                      <a href="blog-details.html">
                        How to perform a comprehensive SEO audit step by step
                        guide.
                      </a>
                    </h2>
                    <p className="xb-item--content">
                      Performing a comprehensive SEO audit involves a systematic
                      analysis of your website to <br /> identify areas for
                      improvement and ensure that it aligns with best practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination" />
            <div className="blog-item_button">
              <div className="blog-swiper-btn swiper-button-prev">
                <img src="assets/front/img/icon/prev-icon.png" alt="" />
              </div>
              <div className="blog-swiper-btn swiper-button-next">
                <img src="assets/front/img/icon/next-icon.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* blog-slide end  */}
      {/* blog content start  */}
      <section className="blog_details_section pb-130 mt-120">
        <div className="container">
          <div className="row mt-none-30 g-0 align-items-start">
            <BlogsComponent />
            {/* <div className="col-lg-8 mt-30">
              <div className="blog_details_content">
                <div className="blog_details_item ul_li">
                  <div className="xb-item--img">
                    <a href="#!">
                      <img src="assets/front/img/blog/b-img03.jpg" alt="" />
                    </a>
                  </div>
                  <div className="xb-item--holder">
                    <span className="xb-item--text">technology</span>
                    <h3 className="xb-item--title border-effect">
                      <a href="blog-details.html">
                        Exploring IT solutions unraveling the latest digital
                        advancements..
                      </a>
                    </h3>
                    <span className="xb-item--content">
                      Embark on an enlightening journey through the realm.
                    </span>
                    <div className="xb-item--button mt-50">
                      <a href="blog-details.html">
                        Read more <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="blog_details_item">
                <div className="xb-item--inner">
                  <span className="xb-item--text">seo tips</span>
                  <h3 className="xb-item--title border-effect">
                    <a href="blog-details.html">
                      Common SEO mistakes to avoid how to <br /> keep Your website
                      ranking high..
                    </a>
                  </h3>
                  <span className="xb-item--content">
                    avoid common SEO mistakes like keyword stuffing, ignoring
                    mobile optimization, and <br /> neglecting meta tags. Focus on
                    quality content and backlinks.
                  </span>
                  <div className="xb-item--button mt-50">
                    <a href="blog-details.html">
                      Read more <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
            </div>
                

                <ul className="blog-pagination ul_li">
                  <li>
                    <a href="#!">
                      <i className="fas fa-chevron-double-left" />
                    </a>
                  </li>
                  <li>
                    <a href="#!">1</a>
                  </li>
                  <li className="active">
                    <a href="#!">2</a>
                  </li>
                  <li>
                    <a href="#!">3</a>
                  </li>
                  <li>
                    <a href="#!">
                      <i className="fas fa-chevron-double-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="col-lg-4 mt-30">
              <div className="sidebar">
                <div className="sidebar_widget">
                  <h3 className="sidebar_widget_title">Search</h3>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="search"
                      name="search"
                      placeholder=""
                    />
                    <button type="submit" className="search_icon">
                      <img
                        src="assets/front/img/icon/search-icon.svg"
                        alt="Icon Search"
                      />
                    </button>
                  </div>
                </div>
                <div className="sidebar_widget">
                  <h3 className="sidebar_widget_title">related posts</h3>
                  <ul className="recent_post_block list-unstyled">
                    {first3blogs.map((i) => (
                      <li key={i.id} className="recent_post_item">
                        <h3 className="post-title border-effect-2 text-truncate">
                          <Link href={`/blogs/${i.slug}`}>
                            {i.title}.
                          </Link>
                        </h3>
                        <span>
                          <img
                            src="assets/front/img/icon/profile-circle.svg"
                            alt=""
                          />
                          By Expert Code Lab
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar_widget">
                  <h3 className="sidebar_widget_title">Categories</h3>
                  <ul className="category_list_block list-unstyled">
                    {blog.map((i) => (
                      <li key={i.name}>
                        <a href="#">
                          <span>
                            <i className="far fa-arrow-right" /> {i.name}
                          </span>
                          <span>({i.total})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar_widget">
                  <h3 className="sidebar_widget_title">Tags</h3>
                  <ul className="tags_block list-unstyled">
                    <li>
                      <a href="#!">Cybersecurity</a>
                    </li>
                    <li>
                      <a href="#!">AppDev</a>
                    </li>
                    <li>
                      <a href="#!">SEO</a>
                    </li>
                    <li>
                      <a href="#!">UXDesign</a>
                    </li>
                    <li>
                      <a href="#!">TechSolutions</a>
                    </li>
                    <li>
                      <a href="#!">IT</a>
                    </li>
                    <li>
                      <a href="#!">Solution</a>
                    </li>
                    <li>
                      <a href="#!">Consultants</a>
                    </li>
                    <li>
                      <a href="#!">Cloud</a>
                    </li>
                    <li>
                      <a href="#!">Optimization</a>
                    </li>
                    <li>
                      <a href="#!">Startup</a>
                    </li>
                    <li>
                      <a href="#!">Data</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* blog content end */}
      {/* cta section start  */}
      <section className="cta" data-bg-color="#f6f6f8">
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
                  alt=""
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

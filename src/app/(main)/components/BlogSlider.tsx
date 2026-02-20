"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogSlider({ blogs = [] }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    if (!blogs.length) return null;

    return (
        <div className="blog pt-70">
            <div className="container">

                <div className="blog-slider switer-container pos-rel">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ clickable: true }}

                        onSwiper={(swiper) => {
                            setTimeout(() => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;

                                swiper.navigation.destroy();
                                swiper.navigation.init();
                                swiper.navigation.update();
                            });
                        }}

                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                    >
                        {blogs.map((i) => (
                            <SwiperSlide key={i.id}>

                                {/* Bootstrap centered card */}
                                <div key={i.id} className="blog-slide-item">
                                    <div className="xb-item--img">
                                        <Link href={`/blogs/${i.slug}`}>
                                            <img src="assets/front/img/blog/b-img01.jpg" alt="" />
                                        </Link>
                                    </div>
                                    <div className="xb-item--holder">
                                        <Link href={`/blogs/${i.slug}`} className="xb-item--tag">
                                            {i.slug}
                                        </Link>
                                        <h2 className="xb-item--title border-effect">
                                            <Link href={`/blogs/${i.slug}`}>
                                                {i.title}
                                            </Link>
                                        </h2>
                                        <p className="xb-item--content">
                                            {i.excerpt}
                                        </p>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-pagination" />
                    <div className="blog-item_button">
                        <div
                            ref={prevRef}
                            className="blog-swiper-btn swiper-button-prev"
                        >
                            <img src="/assets/front/img/icon/prev-icon.png" alt="prev" />
                        </div>

                        <div
                            ref={nextRef}
                            className="blog-swiper-btn swiper-button-next"
                        >
                            <img src="/assets/front/img/icon/next-icon.png" alt="next" />
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

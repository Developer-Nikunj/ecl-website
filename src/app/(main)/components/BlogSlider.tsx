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
        <div className="blog py-5">
            <div className="container">

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}   // 🔥 ONE ITEM ONLY
                    spaceBetween={20}
                    loop={true}

                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}

                    pagination={{ clickable: true }}

                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}

                    navigation
                >
                    {blogs.map((i) => (
                        <SwiperSlide key={i.id}>

                            {/* Bootstrap centered card */}
                            <div className="d-flex justify-content-center">

                                <div className="card shadow-sm border-0 w-100" style={{ maxWidth: "700px" }}>

                                    <Link href={`/blog/${i.slug || i.id}`}>
                                        <Image
                                            src={i.image || "/assets/front/img/blog/b-img01.jpg"}
                                            alt={i.title}
                                            width={700}
                                            height={420}
                                            className="card-img-top"
                                        />
                                    </Link>

                                    <div className="card-body">

                                        <span className="badge bg-primary mb-2">
                                            {i.category || "Software"}
                                        </span>

                                        <h4 className="card-title">
                                            <Link
                                                href={`/blog/${i.slug || i.id}`}
                                                className="text-decoration-none text-dark"
                                            >
                                                {i.title}
                                            </Link>
                                        </h4>

                                        <p className="card-text text-muted">
                                            {i.excerpt}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* 🔥 Bootstrap Controls */}
                <div className="d-flex justify-content-center gap-3 mt-4">

                    <button ref={prevRef} className="btn btn-outline-primary">
                        ← Prev
                    </button>

                    <button ref={nextRef} className="btn btn-outline-primary">
                        Next →
                    </button>

                </div>

            </div>
        </div>
    );
}

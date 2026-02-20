"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "axios";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

interface BlogPost {
  id: number | string;
  img: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryId: number;
  createdAt: string;
}

const BlogsComponent = () => {
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/blog`,
      );
      if (res.data.data && res.data.data.length > 0) {
        setBlog(res.data.data);
      }
    } catch (error) {
      console.error("Blogs data error:", error);
      setBlog([
        {
          id: 10,
          img: "/uploads/blog/1768823623259-150 (1).jpg",
          title: "qqq",
          slug: "qqq",
          content: "qq",
          excerpt: "qqq",
          categoryId: 7,
          createdAt: "2026-01-19T11:53:43.264Z",
        },
        {
          id: 11,
          img: "/uploads/blog/sample2.jpg",
          title: "Web Development Trends 2024",
          slug: "web-development-trends-2024",
          content: "Latest trends in web development...",
          excerpt: "Exploring the latest trends in web development for 2024",
          categoryId: 8,
          createdAt: "2024-01-18T10:30:00.000Z",
        },
        {
          id: 12,
          img: "/uploads/blog/sample3.jpg",
          title: "SEO Best Practices",
          slug: "seo-best-practices",
          content: "Best SEO practices for better ranking...",
          excerpt: "Essential SEO practices to improve your website ranking",
          categoryId: 7,
          createdAt: "2024-01-17T09:15:00.000Z",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blog.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blog.length / postsPerPage);

  if (loading) {
    return (
      <div className="col-lg-8 mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="col-lg-8 mt-4">
      <div className="blog_details_content">
        {/* Blog Posts */}
        {currentPosts.map((post, index) => {
          const isImageOnLeft = index % 2 === 0;

          return (
            <div
              key={post.id}
              className="blog_details_item d-flex flex-column flex-md-row gap-6 mb-5 pb-4 border-bottom position-relative"
              style={{ minHeight: "350px" }}
            >
              {/* Decorative background element */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 bg-light bg-opacity-25 rounded-6"
                style={{ zIndex: -1 }}
              ></div>

              {/* Blog Image - Only for even indices */}
              {isImageOnLeft && (
                <div className="xb-item--img flex-shrink-0 mb-3 mb-md-0">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-decoration-none d-block"
                  >
                    <div
                      className="position-relative overflow-hidden rounded-4 shadow"
                      style={{
                        width: "350px",
                        height: "350px",
                        transition: "all 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 20px 40px rgba(0,0,0,0.19)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 5px 15px rgba(0,0,0,0.1)";
                      }}
                    >
                      <img
                        src={
                          post.img || "/assets/front/img/blog/default-blog.jpg"
                        }
                        alt={post.title}
                        className="img-fluid w-100 h-100 object-fit-cover"
                        style={{
                          transition: "transform 0.5s ease",
                          objectPosition: "center",
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "/assets/front/img/blog/default-blog.jpg";
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />

                      
                      <div
                        className="position-absolute bottom-0 start-0 w-100 h-25"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                        }}
                      ></div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Blog Content */}
              <div className="xb-item--holder flex-grow-1 ps-md-2">
                {/* Date with enhanced styling */}
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="d-flex align-items-center gap-2 text-primary bg-primary bg-opacity-10 px-3 py-1 rounded-pill">
                    <span>{post.category.name}</span>
                  </div>
                </div>

                {/* Title with animated underline */}
                <h3 className="xb-item--title h4 fw-bold mb-3 position-relative">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-dark text-decoration-none d-inline-block position-relative"
                    style={{ transition: "color 0.3s ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#0d6efd";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#212529";
                    }}
                  >
                    {post.title}
                    {/* Animated underline */}
                    <span
                      className="position-absolute bottom-0 start-0 w-0 h-2 rounded-pill"
                      style={{
                        background: "linear-gradient(90deg, #0d6efd, #20c997)",
                        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.width = "100%";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.width = "0";
                      }}
                    ></span>
                  </Link>
                </h3>

                {/* Excerpt with improved typography */}
                <div className="xb-item--content mb-4">
                  <p
                    className="text-muted mb-3"
                    style={{
                      lineHeight: "1.7",
                      fontSize: "1.05rem",
                    }}
                  >
                    {post.excerpt || post.content?.substring(0, 180) + "..."}
                  </p>

                  
                </div>

                {/* Enhanced Read More Button */}
                <div className="xb-item--button d-flex align-items-center gap-3">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="btn btn-primary text-white fw-semibold d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill border-0"
                    style={{
                      transition: "all 0.3s ease",
                      background:
                        "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(13, 110, 253, 0.4)";
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #0b5ed7 0%, #0a58ca 100%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 10px rgba(13, 110, 253, 0.2)";
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)";
                    }}
                  >
                    <span>Read Full Article</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>

                </div>

              </div>
            </div>
          );
        })}

        {/* Pagination - Bootstrap Pagination Component */}
        {blog.length > postsPerPage && (
          <nav aria-label="Blog pagination" className="mt-5">
            <ul className="pagination justify-content-center">
              {/* Previous Button */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">
                    <i className="fas fa-chevron-left"></i>
                  </span>
                </button>
              </li>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <li
                    key={pageNum}
                    className={`page-item ${currentPage === pageNum ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                      {currentPage === pageNum && (
                        <span className="visually-hidden">(current)</span>
                      )}
                    </button>
                  </li>
                ),
              )}

              {/* Next Button */}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next"
                >
                  <span aria-hidden="true">
                    <i className="fas fa-chevron-right"></i>
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        )}

        

        {/* Mobile Pagination */}
        {blog.length > postsPerPage && (
          <div className="d-flex d-md-none justify-content-between align-items-center mt-4">
            <button
              className={`btn btn-outline-primary btn-sm ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="d-flex align-items-center gap-2">
              <span className="text-muted">Page</span>
              <span className="badge bg-primary">{currentPage}</span>
              <span className="text-muted">of {totalPages}</span>
            </div>

            <button
              className={`btn btn-outline-primary btn-sm ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}

        

        {/* No Posts Message */}
        {blog.length === 0 && !loading && (
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-3">
              <i className="far fa-newspaper"></i>
            </div>
            <h3 className="h4 mb-3">No Blog Posts Yet</h3>
            <p className="text-muted mb-4">
              Check back soon for our latest articles and insights.
            </p>
            <Link href="/" className="btn btn-outline-primary">
              Return Home
            </Link>
          </div>
        )}

        {/* Custom CSS with Bootstrap Utility Overrides */}
        <style jsx>{`
          .blog_details_item:hover .xb-item--img img {
            transform: scale(1.05);
          }

          .xb-item--title a {
            transition: color 0.3s ease;
          }

          .xb-item--title a:hover {
            color: #0d6efd !important;
          }

          .xb-item--button .btn-link {
            transition: all 0.3s ease;
          }

          .xb-item--button .btn-link:hover {
            gap: 8px !important;
          }

          .page-item.active .page-link {
            background-color: #0d6efd;
            border-color: #0d6efd;
          }

          .btn-group .btn.active {
            background-color: #0d6efd;
            border-color: #0d6efd;
            color: white;
          }
        `}</style>
      </div>
    </div>
  );
};

export default BlogsComponent;

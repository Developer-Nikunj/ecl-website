"use client";
import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="vh-100 overflow-auto">
      <div className="d-flex align-items-center justify-content-between mb-3 mt-4  position-relative">
        <span className="fw-bold fs-4 position-absolute start-50 translate-middle-x">
          Menu
        </span>
      </div>

      <div className="container-fluid">
        <ul className="navbar-nav" id="sidebarAccordion">
          {/* Admin */}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarAdmin"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarAdmin"
            >
              <i className="ri-dashboard-2-line" />
              <span>Admin</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarAdmin"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/menu" className="nav-link">
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/role" className="nav-link">
                    Role
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/contact-form" className="nav-link">
                    Enquiries
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/employee" className="nav-link">
                    Employee
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* SEO */}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarSEO"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarSEO"
            >
              <i className="ri-bar-chart-line" />
              <span>SEO</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarSEO"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/seo" className="nav-link">
                    SEO
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Banner */}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarBanner"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarBanner"
            >
              <i className="ri-user-voice-line" />
              <span>Banner</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarBanner"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/banner" className="nav-link">
                    Banner
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Footer */}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarFooter"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarFooter"
            >
              <i className="ri-file-list-2-line" />
              <span>Footer</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarFooter"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/footer" className="nav-link">
                    Footer
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Header */}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarHeader"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarHeader"
            >
              <i className="ri-layout-top-line" />
              <span>Header</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarHeader"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/header" className="nav-link">
                    Header
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Testimonial */}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarTestimonial"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarTestimonial"
            >
              <i className="ri-chat-quote-line" />
              <span>Testimonial</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarTestimonial"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/testimonial" className="nav-link">
                    Testimonial
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Blogs*/}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarBlogs"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarBlogs"
            >
              <i className="ri-book-2-line" />
              <span>Blogs</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarBlogs"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/blogCategory" className="nav-link">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/blog" className="nav-link">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* Services*/}
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarServices"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarServices"
            >
              <i className="ri-tools-line" />
              <span>Services</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarServices"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/serviceCategory" className="nav-link">
                    Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/services" className="nav-link">
                    Services
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarCareer"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarCareer"
            >
              <i className="ri-building-line" />
              <span>Career</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarCareer"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/career" className="nav-link">
                    Career
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarServingIndus"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarServingIndus"
            >
              <i className="ri-service-line" />
              <span>Serving Industry</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarServingIndus"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/serving-industry" className="nav-link">
                    Serving Industry
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link menu-link"
              href="#sidebarTechSol"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarTechSol"
            >
              <i className="ri-user-line" />
              <span>Tech & Sol</span>
            </Link>

            <div
              className="collapse menu-dropdown"
              data-bs-parent="#sidebarAccordion"
              id="sidebarTechSol"
            >
              <ul className="nav nav-sm flex-column">
                <li className="nav-item">
                  <Link href="/dev/tech-recent-works" className="nav-link">
                    Recent Works
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dev/tech-testimonial" className="nav-link">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

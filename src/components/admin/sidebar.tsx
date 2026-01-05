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
                <li className="nav-item">
                  <Link href="/dev/seo" className="nav-link">
                    SEO
                  </Link>
                </li>
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
              <i className="ri-add-line me-2" />
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
              <i className="ri-check-line" />
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
              <i className="ri-bar-chart-line" />
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import Profile from "./profile";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);

    document.body.setAttribute("data-sidebar-size", newState ? "lg" : "sm");

    // ✅ FIX CONTENT SHIFT
    const mainContent = document.querySelector(".main-content");
    if (mainContent) {
      mainContent.style.marginLeft = newState ? "" : "0px";
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleDarkMode = () => {
    if (isDark) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
      setIsDark(false);
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
      setIsDark(true);
    }
  };

  useEffect(() => {
    // default sidebar state
    document.body.setAttribute("data-sidebar-size", "lg");
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* ================= HEADER - FULL WIDTH ================= */}
      <header
        id="page-topbar"
        className="w-100"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div className="container-fluid px-0">
          <div className="navbar-header">
            <div className="d-flex align-items-center w-100">
              {/* Logo */}
              <div className="navbar-brand-box me-3">
                <Link href="/dev" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src="/assets/backend/images/logo-ecl.png"
                      height={42}
                      alt="Logo Small Dark"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="/assets/backend/images/logo-ecl.png"
                      height={47}
                      alt="Logo Large Dark"
                    />
                  </span>
                </Link>

                <Link href="/dev" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="/assets/backend/images/logo-ecl.png"
                      height={42}
                      alt="Logo Small Light"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="/assets/backend/images/logo-ecl.png"
                      height={47}
                      alt="Logo Large Light"
                    />
                  </span>
                </Link>
              </div>

              {/* Toggle Button */}
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarCollapse"
                aria-expanded={isSidebarOpen}
                aria-controls="sidebarCollapse"
                onClick={toggleSidebar}
              >
                <span className="hamburger-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </button>

              {/* Search Bar */}
              <form
                className="app-search d-none d-md-block ms-3 flex-grow-1"
                style={{ maxWidth: "400px" }}
              >
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    id="search-options"
                    defaultValue=""
                  />
                  <span className="mdi mdi-magnify search-widget-icon" />
                  <span
                    className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                    id="search-close-options"
                  />
                </div>
              </form>

              {/* Right Side Items */}
              <div className="d-flex align-items-center ms-auto">
                <div className="header-item d-none d-sm-flex">
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                    data-toggle="fullscreen"
                    onClick={toggleFullscreen}
                  >
                    <i className="bx bx-fullscreen fs-22" />
                  </button>
                </div>

                <div className="ms-2 header-item d-none d-sm-flex">
                  <button
                    type="button"
                    className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode"
                    onClick={toggleDarkMode}
                  >
                    <i className="bx bx-moon fs-22" />
                  </button>
                </div>

                <div
                  className="dropdown ms-2 header-item topbar-user"
                  ref={dropdownRef}
                >
                  <button
                    type="button"
                    className="btn material-shadow-none d-flex align-items-center"
                    onClick={() => setOpen(!open)}
                    aria-haspopup="true"
                    aria-expanded={open}
                  >
                    <img
                      className="rounded-circle header-profile-user"
                      src="/assets/backend/images/users/avatar-2.jpg"
                      alt="Header Avatar"
                      width={40}
                      height={40}
                    />
                    <span className="text-start ms-2 d-none d-xl-inline-flex flex-column">
                      <span className="fw-medium user-name-text">
                        Anna Adame
                      </span>
                      <span className="fs-12 user-name-sub-text">Founder</span>
                    </span>
                  </button>
                  <div
                    className={`dropdown-menu dropdown-menu-end shadow ${
                      open ? "show" : ""
                    }`}
                    style={{ minWidth: "200px" }}
                  >
                    <h6 className="dropdown-header">Welcome Anna!</h6>

                    <Link href="/dev/userprofile" className="dropdown-item">
                      <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
                      <span className="align-middle">Profile</span>
                    </Link>

                    <div className="dropdown-divider" />

                    <Link href="/dev/setting" className="dropdown-item">
                      <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                      <span className="align-middle">Setting</span>
                    </Link>

                    <Link href="/signout" className="dropdown-item">
                      <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                      <span className="align-middle">SignOut</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= SIDEBAR - BELOW HEADER ================= */}
      <div
        id="sidebarCollapse"
        className={`app-menu navbar-menu collapse collapse-horizontal ${
          isSidebarOpen ? "show" : ""
        }`}
        style={{ marginTop: "70px" }} // Adjust based on your actual header height
      >
        <Profile />
        <Sidebar />
      </div>
    </>
  );
};

export default Header;

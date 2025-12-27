import React from "react";

const Header = () => {
  return (
    <>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box horizontal-logo">
                <a href="index.html" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src="assets/backend/images/logo-sm.png"
                      alt=""
                      height={22}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="assets/backend/images/logo-dark.png"
                      alt=""
                      height={17}
                    />
                  </span>
                </a>
                <a href="index.html" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="assets/backend/images/logo-sm.png"
                      alt=""
                      height={22}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="assets/backend/images/logo-light.png"
                      alt=""
                      height={17}
                    />
                  </span>
                </a>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span />
                  <span />
                  <span />
                </span>
              </button>
              {/* App Search*/}
              <form className="app-search d-none d-md-block">
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
                <div
                  className="dropdown-menu dropdown-menu-lg"
                  id="search-dropdown"
                >
                  <div data-simplebar="" style={{ maxHeight: 320 }}>
                    {/* item*/}
                    <div className="dropdown-header">
                      <h6 className="text-overflow text-muted mb-0 text-uppercase">
                        Recent Searches
                      </h6>
                    </div>
                    <div className="dropdown-item bg-transparent text-wrap">
                      <a
                        href="index.html"
                        className="btn btn-soft-secondary btn-sm rounded-pill"
                      >
                        how to setup <i className="mdi mdi-magnify ms-1" />
                      </a>
                      <a
                        href="index.html"
                        className="btn btn-soft-secondary btn-sm rounded-pill"
                      >
                        buttons <i className="mdi mdi-magnify ms-1" />
                      </a>
                    </div>
                    {/* item*/}
                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-1 text-uppercase">
                        Pages
                      </h6>
                    </div>
                    {/* item*/}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
                      <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                      <span>Analytics Dashboard</span>
                    </a>
                    {/* item*/}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
                      <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                      <span>Help Center</span>
                    </a>
                    {/* item*/}
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item notify-item"
                    >
                      <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                      <span>My account settings</span>
                    </a>
                    {/* item*/}
                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-2 text-uppercase">
                        Members
                      </h6>
                    </div>
                    <div className="notification-list">
                      {/* item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item notify-item py-2"
                      >
                        <div className="d-flex">
                          <img
                            src="assets/backend/images/users/avatar-2.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">Angela Bernier</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Manager
                            </span>
                          </div>
                        </div>
                      </a>
                      {/* item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item notify-item py-2"
                      >
                        <div className="d-flex">
                          <img
                            src="assets/backend/images/users/avatar-3.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">David Grasso</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Web Designer
                            </span>
                          </div>
                        </div>
                      </a>
                      {/* item */}
                      <a
                        href="javascript:void(0);"
                        className="dropdown-item notify-item py-2"
                      >
                        <div className="d-flex">
                          <img
                            src="assets/backend/images/users/avatar-5.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">Mike Bunch</h6>
                            <span className="fs-11 mb-0 text-muted">
                              React Developer
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="text-center pt-3 pb-1">
                    <a
                      href="pages-search-results.html"
                      className="btn btn-primary btn-sm"
                    >
                      View All Results{" "}
                      <i className="ri-arrow-right-line ms-1" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
            <div className="d-flex align-items-center">
              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  id="page-header-search-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-search fs-22" />
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="dropdown ms-1 topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    id="header-lang-img"
                    src="assets/backend/images/flags/us.svg"
                    alt="Header Language"
                    height={20}
                    className="rounded"
                  />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language py-2"
                    data-lang="en"
                    title="English"
                  >
                    <img
                      src="assets/backend/images/flags/us.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">English</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="sp"
                    title="Spanish"
                  >
                    <img
                      src="assets/backend/images/flags/spain.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">Española</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="gr"
                    title="German"
                  >
                    <img
                      src="assets/backend/images/flags/germany.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />{" "}
                    <span className="align-middle">Deutsche</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="it"
                    title="Italian"
                  >
                    <img
                      src="assets/backend/images/flags/italy.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">Italiana</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="ru"
                    title="Russian"
                  >
                    <img
                      src="assets/backend/images/flags/russia.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">русский</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="ch"
                    title="Chinese"
                  >
                    <img
                      src="assets/backend/images/flags/china.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">中国人</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="fr"
                    title="French"
                  >
                    <img
                      src="assets/backend/images/flags/french.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">français</span>
                  </a>
                  {/* item*/}
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item notify-item language"
                    data-lang="ar"
                    title="Arabic"
                  >
                    <img
                      src="assets/backend/images/flags/ae.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height={18}
                    />
                    <span className="align-middle">Arabic</span>
                  </a>
                </div>
              </div>
              <div className="dropdown topbar-head-dropdown ms-1 header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-category-alt fs-22" />
                </button>
                <div className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fw-semibold fs-15"> Web Apps </h6>
                      </div>
                      <div className="col-auto">
                        <a href="#!" className="btn btn-sm btn-soft-info">
                          {" "}
                          View All Apps
                          <i className="ri-arrow-right-s-line align-middle" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/backend/images/brands/github.png"
                            alt="Github"
                          />
                          <span>GitHub</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/backend/images/brands/bitbucket.png"
                            alt="bitbucket"
                          />
                          <span>Bitbucket</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/backend/images/brands/dribbble.png"
                            alt="dribbble"
                          />
                          <span>Dribbble</span>
                        </a>
                      </div>
                    </div>
                    <div className="row g-0">
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/backend/images/brands/dropbox.png"
                            alt="dropbox"
                          />
                          <span>Dropbox</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/backend/images/brands/mail_chimp.png"
                            alt="mail_chimp"
                          />
                          <span>Mail Chimp</span>
                        </a>
                      </div>
                      <div className="col">
                        <a className="dropdown-icon-item" href="#!">
                          <img
                            src="assets/backend/images/brands/slack.png"
                            alt="slack"
                          />
                          <span>Slack</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown topbar-head-dropdown ms-1 header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  id="page-header-cart-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-shopping-bag fs-22" />
                  <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">
                    5
                  </span>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
                  aria-labelledby="page-header-cart-dropdown"
                >
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fs-16 fw-semibold"> My Cart</h6>
                      </div>
                      <div className="col-auto">
                        <span className="badge bg-warning-subtle text-warning fs-13">
                          <span className="cartitem-badge">7</span>
                          items
                        </span>
                      </div>
                    </div>
                  </div>
                  <div data-simplebar="" style={{ maxHeight: 300 }}>
                    <div className="p-2">
                      <div className="text-center empty-cart" id="empty-cart">
                        <div className="avatar-md mx-auto my-3">
                          <div className="avatar-title bg-info-subtle text-info fs-36 rounded-circle">
                            <i className="bx bx-cart" />
                          </div>
                        </div>
                        <h5 className="mb-3">Your Cart is Empty!</h5>
                        <a
                          href="apps-ecommerce-products.html"
                          className="btn btn-success w-md mb-3"
                        >
                          Shop Now
                        </a>
                      </div>
                      <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="assets/backend/images/products/img-1.png"
                            className="me-3 rounded-circle avatar-sm p-2 bg-light"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="text-reset"
                              >
                                Branded T-Shirts
                              </a>
                            </h6>
                            <p className="mb-0 fs-12 text-muted">
                              Quantity: <span>10 x $32</span>
                            </p>
                          </div>
                          <div className="px-2">
                            <h5 className="m-0 fw-normal">
                              $<span className="cart-item-price">320</span>
                            </h5>
                          </div>
                          <div className="ps-2">
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                            >
                              <i className="ri-close-fill fs-16" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="assets/backend/images/products/img-2.png"
                            className="me-3 rounded-circle avatar-sm p-2 bg-light"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="text-reset"
                              >
                                Bentwood Chair
                              </a>
                            </h6>
                            <p className="mb-0 fs-12 text-muted">
                              Quantity: <span>5 x $18</span>
                            </p>
                          </div>
                          <div className="px-2">
                            <h5 className="m-0 fw-normal">
                              $<span className="cart-item-price">89</span>
                            </h5>
                          </div>
                          <div className="ps-2">
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                            >
                              <i className="ri-close-fill fs-16" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="assets/backend/images/products/img-3.png"
                            className="me-3 rounded-circle avatar-sm p-2 bg-light"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="text-reset"
                              >
                                Borosil Paper Cup
                              </a>
                            </h6>
                            <p className="mb-0 fs-12 text-muted">
                              Quantity: <span>3 x $250</span>
                            </p>
                          </div>
                          <div className="px-2">
                            <h5 className="m-0 fw-normal">
                              $<span className="cart-item-price">750</span>
                            </h5>
                          </div>
                          <div className="ps-2">
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                            >
                              <i className="ri-close-fill fs-16" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="assets/backend/images/products/img-6.png"
                            className="me-3 rounded-circle avatar-sm p-2 bg-light"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="text-reset"
                              >
                                Gray Styled T-Shirt
                              </a>
                            </h6>
                            <p className="mb-0 fs-12 text-muted">
                              Quantity: <span>1 x $1250</span>
                            </p>
                          </div>
                          <div className="px-2">
                            <h5 className="m-0 fw-normal">
                              $ <span className="cart-item-price">1250</span>
                            </h5>
                          </div>
                          <div className="ps-2">
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                            >
                              <i className="ri-close-fill fs-16" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="assets/backend/images/products/img-5.png"
                            className="me-3 rounded-circle avatar-sm p-2 bg-light"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1 fs-14">
                              <a
                                href="apps-ecommerce-product-details.html"
                                className="text-reset"
                              >
                                Stillbird Helmet
                              </a>
                            </h6>
                            <p className="mb-0 fs-12 text-muted">
                              Quantity: <span>2 x $495</span>
                            </p>
                          </div>
                          <div className="px-2">
                            <h5 className="m-0 fw-normal">
                              $<span className="cart-item-price">990</span>
                            </h5>
                          </div>
                          <div className="ps-2">
                            <button
                              type="button"
                              className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"
                            >
                              <i className="ri-close-fill fs-16" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
                    id="checkout-elem"
                  >
                    <div className="d-flex justify-content-between align-items-center pb-3">
                      <h5 className="m-0 text-muted">Total:</h5>
                      <div className="px-2">
                        <h5 className="m-0" id="cart-item-total">
                          $1258.58
                        </h5>
                      </div>
                    </div>
                    <a
                      href="apps-ecommerce-checkout.html"
                      className="btn btn-success text-center w-100"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  data-toggle="fullscreen"
                >
                  <i className="bx bx-fullscreen fs-22" />
                </button>
              </div>
              <div className="ms-1 header-item d-none d-sm-flex">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle light-dark-mode"
                >
                  <i className="bx bx-moon fs-22" />
                </button>
              </div>
              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <button
                  type="button"
                  className="btn btn-icon btn-topbar material-shadow-none btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22" />
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold text-white">
                            {" "}
                            Notifications{" "}
                          </h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          <span className="badge bg-light text-body fs-13">
                            {" "}
                            4 New
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 pt-2">
                      <ul
                        className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                        data-dropdown-tabs="true"
                        id="notificationItemsTab"
                        role="tablist"
                      >
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#all-noti-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            All (4)
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#messages-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Messages
                          </a>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#alerts-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Alerts
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="tab-content position-relative"
                    id="notificationItemsTabContent"
                  >
                    <div
                      className="tab-pane fade show active py-2 ps-2"
                      id="all-noti-tab"
                      role="tabpanel"
                    >
                      <div
                        data-simplebar=""
                        style={{ maxHeight: 300 }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                <i className="bx bx-badge-check" />
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 lh-base">
                                  Your <b>Elite</b> author Graphic Optimization{" "}
                                  <span className="text-secondary">reward</span>{" "}
                                  is ready!
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> Just
                                  30 sec ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="all-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check01"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/backend/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 48 min
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="all-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check02"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                <i className="bx bx-message-square-dots" />
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 fs-13 lh-base">
                                  You have received{" "}
                                  <b className="text-success">20</b> new
                                  messages in the conversation
                                </h6>
                              </a>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 2 hrs
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="all-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check03"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="assets/backend/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 4 hrs
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="all-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check04"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-3 text-center view-all">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Notifications{" "}
                            <i className="ri-arrow-right-line align-middle" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade py-2 ps-2"
                      id="messages-tab"
                      role="tabpanel"
                      aria-labelledby="messages-tab"
                    >
                      <div
                        data-simplebar=""
                        style={{ maxHeight: 300 }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/backend/images/users/avatar-3.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  James Lemire
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 30 min
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="messages-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check01"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/backend/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 2 hrs
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="messages-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check02"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/backend/images/users/avatar-6.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Kenneth Brown
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Mentionned you in his comment on 📃 invoice
                                  #12501.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 10 hrs
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="messages-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check03"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="assets/backend/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <a href="#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </a>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline" /> 3 days
                                  ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="messages-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check04"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-3 text-center view-all">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Messages{" "}
                            <i className="ri-arrow-right-line align-middle" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade p-4"
                      id="alerts-tab"
                      role="tabpanel"
                      aria-labelledby="alerts-tab"
                    />
                    <div
                      className="notification-actions"
                      id="notification-actions"
                    >
                      <div className="d-flex text-muted justify-content-center">
                        Select{" "}
                        <div
                          id="select-content"
                          className="text-body fw-semibold px-1"
                        >
                          0
                        </div>{" "}
                        Result{" "}
                        <button
                          type="button"
                          className="btn btn-link link-danger p-0 ms-3"
                          data-bs-toggle="modal"
                          data-bs-target="#removeNotificationModal"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn material-shadow-none"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="assets/backend/images/users/avatar-1.jpg"
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        Anna Adame
                      </span>
                      <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                        Founder
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  {/* item*/}
                  <h6 className="dropdown-header">Welcome Anna!</h6>
                  <a className="dropdown-item" href="pages-profile.html">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Profile</span>
                  </a>
                  <a className="dropdown-item" href="apps-chat.html">
                    <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Messages</span>
                  </a>
                  <a className="dropdown-item" href="apps-tasks-kanban.html">
                    <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Taskboard</span>
                  </a>
                  <a className="dropdown-item" href="pages-faqs.html">
                    <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Help</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="pages-profile.html">
                    <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">
                      Balance : <b>$5971.67</b>
                    </span>
                  </a>
                  <a
                    className="dropdown-item"
                    href="pages-profile-settings.html"
                  >
                    <span className="badge bg-success-subtle text-success mt-1 float-end">
                      New
                    </span>
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Settings</span>
                  </a>
                  <a
                    className="dropdown-item"
                    href="auth-lockscreen-basic.html"
                  >
                    <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle">Lock screen</span>
                  </a>
                  <a className="dropdown-item" href="auth-logout-basic.html">
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* removeNotificationModal */}
      <div
        id="removeNotificationModal"
        className="modal fade zoomIn"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="NotificationModalbtn-close"
              />
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="loop"
                  colors="primary:#f7b84b,secondary:#f06548"
                  style={{ width: 100, height: 100 }}
                />
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this Notification ?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="btn w-sm btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn w-sm btn-danger"
                  id="delete-notification"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
      {/* /.modal */}

      {/* ========== App Menu ========== */}
      <div className="app-menu navbar-menu">
        {/* LOGO */}
        <div className="navbar-brand-box">
          {/* Dark Logo*/}
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src="assets/backend/images/logo-sm.png" alt="" height={22} />
            </span>
            <span className="logo-lg">
              <img
                src="assets/backend/images/logo-dark.png"
                alt=""
                height={17}
              />
            </span>
          </a>
          {/* Light Logo*/}
          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src="assets/backend/images/logo-sm.png" alt="" height={22} />
            </span>
            <span className="logo-lg">
              <img
                src="assets/backend/images/logo-light.png"
                alt=""
                height={17}
              />
            </span>
          </a>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line" />
          </button>
        </div>
        <div className="dropdown sidebar-user m-1 rounded">
          <button
            type="button"
            className="btn material-shadow-none"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="d-flex align-items-center gap-2">
              <img
                className="rounded header-profile-user"
                src="assets/backend/images/users/avatar-1.jpg"
                alt="Header Avatar"
              />
              <span className="text-start">
                <span className="d-block fw-medium sidebar-user-name-text">
                  Anna Adame
                </span>
                <span className="d-block fs-14 sidebar-user-name-sub-text">
                  <i className="ri ri-circle-fill fs-10 text-success align-baseline" />{" "}
                  <span className="align-middle">Online</span>
                </span>
              </span>
            </span>
          </button>
          <div className="dropdown-menu dropdown-menu-end">
            {/* item*/}
            <h6 className="dropdown-header">Welcome Anna!</h6>
            <a className="dropdown-item" href="pages-profile.html">
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Profile</span>
            </a>
            <a className="dropdown-item" href="apps-chat.html">
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Messages</span>
            </a>
            <a className="dropdown-item" href="apps-tasks-kanban.html">
              <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Taskboard</span>
            </a>
            <a className="dropdown-item" href="pages-faqs.html">
              <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Help</span>
            </a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="pages-profile.html">
              <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">
                Balance : <b>$5971.67</b>
              </span>
            </a>
            <a className="dropdown-item" href="pages-profile-settings.html">
              <span className="badge bg-success-subtle text-success mt-1 float-end">
                New
              </span>
              <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Settings</span>
            </a>
            <a className="dropdown-item" href="auth-lockscreen-basic.html">
              <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle">Lock screen</span>
            </a>
            <a className="dropdown-item" href="auth-logout-basic.html">
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </a>
          </div>
        </div>
        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarDashboards"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                >
                  <i className="ri-dashboard-2-line" />{" "}
                  <span data-key="t-dashboards">Dashboards</span>
                </a>
                {/* menu dashboard start here */}
                <div className="collapse menu-dropdown" id="sidebarDashboards">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="dashboard-analytics.html"
                        className="nav-link"
                        data-key="t-analytics"
                      >
                        {" "}
                        Analytics{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="dashboard-crm.html"
                        className="nav-link"
                        data-key="t-crm"
                      >
                        {" "}
                        CRM{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="index.html"
                        className="nav-link"
                        data-key="t-ecommerce"
                      >
                        {" "}
                        Ecommerce{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="dashboard-crypto.html"
                        className="nav-link"
                        data-key="t-crypto"
                      >
                        {" "}
                        Crypto{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="dashboard-projects.html"
                        className="nav-link"
                        data-key="t-projects"
                      >
                        {" "}
                        Projects{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="dashboard-nft.html"
                        className="nav-link"
                        data-key="t-nft"
                      >
                        {" "}
                        NFT
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="dashboard-job.html"
                        className="nav-link"
                        data-key="t-job"
                      >
                        Job
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="dashboard-blog.html" className="nav-link">
                        <span data-key="t-blog">Blog</span>{" "}
                        <span className="badge bg-success" data-key="t-new">
                          New
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>{" "}
              {/* end Dashboard Menu */}
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-apps-2-line" />{" "}
                  <span data-key="t-apps">Apps</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="#sidebarCalendar"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarCalendar"
                        data-key="t-calender"
                      >
                        Calendar
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarCalendar"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-calendar.html"
                              className="nav-link"
                              data-key="t-main-calender"
                            >
                              {" "}
                              Main Calender{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-calendar-month-grid.html"
                              className="nav-link"
                              data-key="t-month-grid"
                            >
                              {" "}
                              Month Grid{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="apps-chat.html"
                        className="nav-link"
                        data-key="t-chat"
                      >
                        {" "}
                        Chat{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarEmail"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarEmail"
                        data-key="t-email"
                      >
                        Email
                      </a>
                      <div className="collapse menu-dropdown" id="sidebarEmail">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-mailbox.html"
                              className="nav-link"
                              data-key="t-mailbox"
                            >
                              {" "}
                              Mailbox{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#sidebaremailTemplates"
                              className="nav-link"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="sidebaremailTemplates"
                              data-key="t-email-templates"
                            >
                              Email Templates
                            </a>
                            <div
                              className="collapse menu-dropdown"
                              id="sidebaremailTemplates"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item">
                                  <a
                                    href="apps-email-basic.html"
                                    className="nav-link"
                                    data-key="t-basic-action"
                                  >
                                    {" "}
                                    Basic Action{" "}
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="apps-email-ecommerce.html"
                                    className="nav-link"
                                    data-key="t-ecommerce-action"
                                  >
                                    {" "}
                                    Ecommerce Action{" "}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarEcommerce"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarEcommerce"
                        data-key="t-ecommerce"
                      >
                        Ecommerce
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarEcommerce"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-products.html"
                              className="nav-link"
                              data-key="t-products"
                            >
                              {" "}
                              Products{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-product-details.html"
                              className="nav-link"
                              data-key="t-product-Details"
                            >
                              {" "}
                              Product Details{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-add-product.html"
                              className="nav-link"
                              data-key="t-create-product"
                            >
                              {" "}
                              Create Product{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-orders.html"
                              className="nav-link"
                              data-key="t-orders"
                            >
                              Orders{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-order-details.html"
                              className="nav-link"
                              data-key="t-order-details"
                            >
                              {" "}
                              Order Details{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-customers.html"
                              className="nav-link"
                              data-key="t-customers"
                            >
                              {" "}
                              Customers{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-cart.html"
                              className="nav-link"
                              data-key="t-shopping-cart"
                            >
                              {" "}
                              Shopping Cart{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-checkout.html"
                              className="nav-link"
                              data-key="t-checkout"
                            >
                              {" "}
                              Checkout{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-sellers.html"
                              className="nav-link"
                              data-key="t-sellers"
                            >
                              Sellers{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-ecommerce-seller-details.html"
                              className="nav-link"
                              data-key="t-sellers-details"
                            >
                              {" "}
                              Seller Details{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarProjects"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarProjects"
                        data-key="t-projects"
                      >
                        Projects
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarProjects"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-projects-list.html"
                              className="nav-link"
                              data-key="t-list"
                            >
                              {" "}
                              List
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-projects-overview.html"
                              className="nav-link"
                              data-key="t-overview"
                            >
                              {" "}
                              Overview{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-projects-create.html"
                              className="nav-link"
                              data-key="t-create-project"
                            >
                              {" "}
                              Create Project{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarTasks"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarTasks"
                        data-key="t-tasks"
                      >
                        {" "}
                        Tasks
                      </a>
                      <div className="collapse menu-dropdown" id="sidebarTasks">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-tasks-kanban.html"
                              className="nav-link"
                              data-key="t-kanbanboard"
                            >
                              Kanban Board{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-tasks-list-view.html"
                              className="nav-link"
                              data-key="t-list-view"
                            >
                              List View{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-tasks-details.html"
                              className="nav-link"
                              data-key="t-task-details"
                            >
                              {" "}
                              Task Details{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarCRM"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarCRM"
                        data-key="t-crm"
                      >
                        {" "}
                        CRM
                      </a>
                      <div className="collapse menu-dropdown" id="sidebarCRM">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-crm-contacts.html"
                              className="nav-link"
                              data-key="t-contacts"
                            >
                              Contacts{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crm-companies.html"
                              className="nav-link"
                              data-key="t-companies"
                            >
                              Companies{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crm-deals.html"
                              className="nav-link"
                              data-key="t-deals"
                            >
                              {" "}
                              Deals
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crm-leads.html"
                              className="nav-link"
                              data-key="t-leads"
                            >
                              {" "}
                              Leads
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarCrypto"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarCrypto"
                        data-key="t-crypto"
                      >
                        {" "}
                        Crypto
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarCrypto"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-crypto-transactions.html"
                              className="nav-link"
                              data-key="t-transactions"
                            >
                              {" "}
                              Transactions{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crypto-buy-sell.html"
                              className="nav-link"
                              data-key="t-buy-sell"
                            >
                              Buy &amp; Sell{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crypto-orders.html"
                              className="nav-link"
                              data-key="t-orders"
                            >
                              Orders{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crypto-wallet.html"
                              className="nav-link"
                              data-key="t-my-wallet"
                            >
                              My Wallet{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crypto-ico.html"
                              className="nav-link"
                              data-key="t-ico-list"
                            >
                              {" "}
                              ICO List{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-crypto-kyc.html"
                              className="nav-link"
                              data-key="t-kyc-application"
                            >
                              {" "}
                              KYC Application{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarInvoices"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarInvoices"
                        data-key="t-invoices"
                      >
                        Invoices
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarInvoices"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-invoices-list.html"
                              className="nav-link"
                              data-key="t-list-view"
                            >
                              List View{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-invoices-details.html"
                              className="nav-link"
                              data-key="t-details"
                            >
                              Details{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-invoices-create.html"
                              className="nav-link"
                              data-key="t-create-invoice"
                            >
                              {" "}
                              Create Invoice{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarTickets"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarTickets"
                        data-key="t-supprt-tickets"
                      >
                        Support Tickets
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarTickets"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-tickets-list.html"
                              className="nav-link"
                              data-key="t-list-view"
                            >
                              List View{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-tickets-details.html"
                              className="nav-link"
                              data-key="t-ticket-details"
                            >
                              {" "}
                              Ticket Details{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarnft"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarnft"
                        data-key="t-nft-marketplace"
                      >
                        NFT Marketplace
                      </a>
                      <div className="collapse menu-dropdown" id="sidebarnft">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-nft-marketplace.html"
                              className="nav-link"
                              data-key="t-marketplace"
                            >
                              {" "}
                              Marketplace{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-explore.html"
                              className="nav-link"
                              data-key="t-explore-now"
                            >
                              {" "}
                              Explore Now{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-auction.html"
                              className="nav-link"
                              data-key="t-live-auction"
                            >
                              {" "}
                              Live Auction{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-item-details.html"
                              className="nav-link"
                              data-key="t-item-details"
                            >
                              {" "}
                              Item Details{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-collections.html"
                              className="nav-link"
                              data-key="t-collections"
                            >
                              {" "}
                              Collections{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-creators.html"
                              className="nav-link"
                              data-key="t-creators"
                            >
                              {" "}
                              Creators{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-ranking.html"
                              className="nav-link"
                              data-key="t-ranking"
                            >
                              {" "}
                              Ranking{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-wallet.html"
                              className="nav-link"
                              data-key="t-wallet-connect"
                            >
                              {" "}
                              Wallet Connect{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-nft-create.html"
                              className="nav-link"
                              data-key="t-create-nft"
                            >
                              {" "}
                              Create NFT{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a href="apps-file-manager.html" className="nav-link">
                        {" "}
                        <span data-key="t-file-manager">File Manager</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="apps-todo.html" className="nav-link">
                        {" "}
                        <span data-key="t-to-do">To Do</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarjobs"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarjobs"
                        data-key="t-jobs"
                      >
                        {" "}
                        Jobs
                      </a>
                      <div className="collapse menu-dropdown" id="sidebarjobs">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="apps-job-statistics.html"
                              className="nav-link"
                              data-key="t-statistics"
                            >
                              {" "}
                              Statistics{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#sidebarJoblists"
                              className="nav-link"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="sidebarJoblists"
                              data-key="t-job-lists"
                            >
                              Job Lists
                            </a>
                            <div
                              className="collapse menu-dropdown"
                              id="sidebarJoblists"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item">
                                  <a
                                    href="apps-job-lists.html"
                                    className="nav-link"
                                    data-key="t-list"
                                  >
                                    {" "}
                                    List
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="apps-job-grid-lists.html"
                                    className="nav-link"
                                    data-key="t-grid"
                                  >
                                    {" "}
                                    Grid{" "}
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="apps-job-details.html"
                                    className="nav-link"
                                    data-key="t-overview"
                                  >
                                    {" "}
                                    Overview
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#sidebarCandidatelists"
                              className="nav-link"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="sidebarCandidatelists"
                              data-key="t-candidate-lists"
                            >
                              Candidate Lists
                            </a>
                            <div
                              className="collapse menu-dropdown"
                              id="sidebarCandidatelists"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item">
                                  <a
                                    href="apps-job-candidate-lists.html"
                                    className="nav-link"
                                    data-key="t-list-view"
                                  >
                                    {" "}
                                    List View
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="apps-job-candidate-grid.html"
                                    className="nav-link"
                                    data-key="t-grid-view"
                                  >
                                    {" "}
                                    Grid View
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-job-application.html"
                              className="nav-link"
                              data-key="t-application"
                            >
                              {" "}
                              Application{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-job-new.html"
                              className="nav-link"
                              data-key="t-new-job"
                            >
                              {" "}
                              New Job{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-job-companies-lists.html"
                              className="nav-link"
                              data-key="t-companies-list"
                            >
                              {" "}
                              Companies List{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="apps-job-categories.html"
                              className="nav-link"
                              data-key="t-job-categories"
                            >
                              {" "}
                              Job Categories
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="apps-api-key.html"
                        className="nav-link"
                        data-key="t-api-key"
                      >
                        API Key
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarLayouts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLayouts"
                >
                  <i className="ri-layout-3-line" />{" "}
                  <span data-key="t-layouts">Layouts</span>{" "}
                  <span className="badge badge-pill bg-danger" data-key="t-hot">
                    Hot
                  </span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarLayouts">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="layouts-horizontal.html"
                        target="_blank"
                        className="nav-link"
                        data-key="t-horizontal"
                      >
                        Horizontal
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="layouts-detached.html"
                        target="_blank"
                        className="nav-link"
                        data-key="t-detached"
                      >
                        Detached
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="layouts-two-column.html"
                        target="_blank"
                        className="nav-link"
                        data-key="t-two-column"
                      >
                        Two Column
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="layouts-vertical-hovered.html"
                        target="_blank"
                        className="nav-link"
                        data-key="t-hovered"
                      >
                        Hovered
                      </a>
                    </li>
                  </ul>
                </div>
              </li>{" "}
              {/* end Dashboard Menu */}
              <li className="menu-title">
                <i className="ri-more-fill" />{" "}
                <span data-key="t-pages">Pages</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarAuth"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAuth"
                >
                  <i className="ri-account-circle-line" />{" "}
                  <span data-key="t-authentication">Authentication</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarAuth">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="#sidebarSignIn"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarSignIn"
                        data-key="t-signin"
                      >
                        {" "}
                        Sign In
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarSignIn"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-signin-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              {" "}
                              Basic
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-signin-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              {" "}
                              Cover
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarSignUp"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarSignUp"
                        data-key="t-signup"
                      >
                        {" "}
                        Sign Up
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarSignUp"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-signup-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              {" "}
                              Basic
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-signup-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              {" "}
                              Cover
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarResetPass"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarResetPass"
                        data-key="t-password-reset"
                      >
                        Password Reset
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarResetPass"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-pass-reset-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              Basic{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-pass-reset-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              Cover{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarchangePass"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarchangePass"
                        data-key="t-password-create"
                      >
                        Password Create
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarchangePass"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-pass-change-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              Basic{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-pass-change-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              Cover{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarLockScreen"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarLockScreen"
                        data-key="t-lock-screen"
                      >
                        Lock Screen
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarLockScreen"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-lockscreen-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              Basic{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-lockscreen-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              Cover{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarLogout"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarLogout"
                        data-key="t-logout"
                      >
                        {" "}
                        Logout
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarLogout"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-logout-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              {" "}
                              Basic
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-logout-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              {" "}
                              Cover
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarSuccessMsg"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarSuccessMsg"
                        data-key="t-success-message"
                      >
                        {" "}
                        Success Message
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarSuccessMsg"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-success-msg-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              Basic{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-success-msg-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              Cover{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarTwoStep"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarTwoStep"
                        data-key="t-two-step-verification"
                      >
                        {" "}
                        Two Step Verification
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarTwoStep"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-twostep-basic.html"
                              className="nav-link"
                              data-key="t-basic"
                            >
                              {" "}
                              Basic
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-twostep-cover.html"
                              className="nav-link"
                              data-key="t-cover"
                            >
                              {" "}
                              Cover
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarErrors"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarErrors"
                        data-key="t-errors"
                      >
                        {" "}
                        Errors
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarErrors"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="auth-404-basic.html"
                              className="nav-link"
                              data-key="t-404-basic"
                            >
                              {" "}
                              404 Basic{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-404-cover.html"
                              className="nav-link"
                              data-key="t-404-cover"
                            >
                              {" "}
                              404 Cover{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-404-alt.html"
                              className="nav-link"
                              data-key="t-404-alt"
                            >
                              {" "}
                              404 Alt
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-500.html"
                              className="nav-link"
                              data-key="t-500"
                            >
                              {" "}
                              500{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="auth-offline.html"
                              className="nav-link"
                              data-key="t-offline-page"
                            >
                              {" "}
                              Offline Page{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarPages"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPages"
                >
                  <i className="ri-pages-line" />{" "}
                  <span data-key="t-pages">Pages</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarPages">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="pages-starter.html"
                        className="nav-link"
                        data-key="t-starter"
                      >
                        {" "}
                        Starter{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarProfile"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarProfile"
                        data-key="t-profile"
                      >
                        {" "}
                        Profile
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarProfile"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="pages-profile.html"
                              className="nav-link"
                              data-key="t-simple-page"
                            >
                              Simple Page{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages-profile-settings.html"
                              className="nav-link"
                              data-key="t-settings"
                            >
                              {" "}
                              Settings{" "}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-team.html"
                        className="nav-link"
                        data-key="t-team"
                      >
                        {" "}
                        Team{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-timeline.html"
                        className="nav-link"
                        data-key="t-timeline"
                      >
                        {" "}
                        Timeline{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-faqs.html"
                        className="nav-link"
                        data-key="t-faqs"
                      >
                        {" "}
                        FAQs{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-pricing.html"
                        className="nav-link"
                        data-key="t-pricing"
                      >
                        {" "}
                        Pricing{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-gallery.html"
                        className="nav-link"
                        data-key="t-gallery"
                      >
                        {" "}
                        Gallery{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-maintenance.html"
                        className="nav-link"
                        data-key="t-maintenance"
                      >
                        {" "}
                        Maintenance
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-coming-soon.html"
                        className="nav-link"
                        data-key="t-coming-soon"
                      >
                        {" "}
                        Coming Soon
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-sitemap.html"
                        className="nav-link"
                        data-key="t-sitemap"
                      >
                        {" "}
                        Sitemap{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-search-results.html"
                        className="nav-link"
                        data-key="t-search-results"
                      >
                        {" "}
                        Search Results{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-privacy-policy.html"
                        className="nav-link"
                        data-key="t-privacy-policy"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="pages-term-conditions.html"
                        className="nav-link"
                        data-key="t-term-conditions"
                      >
                        Term &amp; Conditions
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarBlogs"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarBlogs"
                      >
                        <span data-key="t-blogs">Blogs</span>{" "}
                        <span
                          className="badge badge-pill bg-success"
                          data-key="t-new"
                        >
                          New
                        </span>
                      </a>
                      <div className="collapse menu-dropdown" id="sidebarBlogs">
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="pages-blog-list.html"
                              className="nav-link"
                              data-key="t-list-view"
                            >
                              List View
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages-blog-grid.html"
                              className="nav-link"
                              data-key="t-grid-view"
                            >
                              Grid View
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="pages-blog-overview.html"
                              className="nav-link"
                              data-key="t-overview"
                            >
                              Overview
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarLanding"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLanding"
                >
                  <i className="ri-rocket-line" />{" "}
                  <span data-key="t-landing">Landing</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarLanding">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="landing.html"
                        className="nav-link"
                        data-key="t-one-page"
                      >
                        {" "}
                        One Page{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="nft-landing.html"
                        className="nav-link"
                        data-key="t-nft-landing"
                      >
                        {" "}
                        NFT Landing{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="job-landing.html"
                        className="nav-link"
                        data-key="t-job"
                      >
                        Job
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-title">
                <i className="ri-more-fill" />{" "}
                <span data-key="t-components">Components</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarUI"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarUI"
                >
                  <i className="ri-pencil-ruler-2-line" />{" "}
                  <span data-key="t-base-ui">Base UI</span>
                </a>
                <div
                  className="collapse menu-dropdown mega-dropdown-menu"
                  id="sidebarUI"
                >
                  <div className="row">
                    <div className="col-lg-4">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            href="ui-alerts.html"
                            className="nav-link"
                            data-key="t-alerts"
                          >
                            Alerts
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-badges.html"
                            className="nav-link"
                            data-key="t-badges"
                          >
                            Badges
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-buttons.html"
                            className="nav-link"
                            data-key="t-buttons"
                          >
                            Buttons
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-colors.html"
                            className="nav-link"
                            data-key="t-colors"
                          >
                            Colors
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-cards.html"
                            className="nav-link"
                            data-key="t-cards"
                          >
                            Cards
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-carousel.html"
                            className="nav-link"
                            data-key="t-carousel"
                          >
                            Carousel
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-dropdowns.html"
                            className="nav-link"
                            data-key="t-dropdowns"
                          >
                            Dropdowns
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-grid.html"
                            className="nav-link"
                            data-key="t-grid"
                          >
                            Grid
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            href="ui-images.html"
                            className="nav-link"
                            data-key="t-images"
                          >
                            Images
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-tabs.html"
                            className="nav-link"
                            data-key="t-tabs"
                          >
                            Tabs
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-accordions.html"
                            className="nav-link"
                            data-key="t-accordion-collapse"
                          >
                            Accordion &amp; Collapse
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-modals.html"
                            className="nav-link"
                            data-key="t-modals"
                          >
                            Modals
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-offcanvas.html"
                            className="nav-link"
                            data-key="t-offcanvas"
                          >
                            Offcanvas
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-placeholders.html"
                            className="nav-link"
                            data-key="t-placeholders"
                          >
                            Placeholders
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-progress.html"
                            className="nav-link"
                            data-key="t-progress"
                          >
                            Progress
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-notifications.html"
                            className="nav-link"
                            data-key="t-notifications"
                          >
                            Notifications
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4">
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <a
                            href="ui-media.html"
                            className="nav-link"
                            data-key="t-media-object"
                          >
                            Media object
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-embed-video.html"
                            className="nav-link"
                            data-key="t-embed-video"
                          >
                            Embed Video
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-typography.html"
                            className="nav-link"
                            data-key="t-typography"
                          >
                            Typography
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-lists.html"
                            className="nav-link"
                            data-key="t-lists"
                          >
                            Lists
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="ui-links.html" className="nav-link">
                            <span data-key="t-links">Links</span>{" "}
                            <span
                              className="badge badge-pill bg-success"
                              data-key="t-new"
                            >
                              New
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-general.html"
                            className="nav-link"
                            data-key="t-general"
                          >
                            General
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-ribbons.html"
                            className="nav-link"
                            data-key="t-ribbons"
                          >
                            Ribbons
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            href="ui-utilities.html"
                            className="nav-link"
                            data-key="t-utilities"
                          >
                            Utilities
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarAdvanceUI"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAdvanceUI"
                >
                  <i className="ri-stack-line" />{" "}
                  <span data-key="t-advance-ui">Advance UI</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarAdvanceUI">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="advance-ui-sweetalerts.html"
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Sweet Alerts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-nestable.html"
                        className="nav-link"
                        data-key="t-nestable-list"
                      >
                        Nestable List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-scrollbar.html"
                        className="nav-link"
                        data-key="t-scrollbar"
                      >
                        Scrollbar
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-animation.html"
                        className="nav-link"
                        data-key="t-animation"
                      >
                        Animation
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-tour.html"
                        className="nav-link"
                        data-key="t-tour"
                      >
                        Tour
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-swiper.html"
                        className="nav-link"
                        data-key="t-swiper-slider"
                      >
                        Swiper Slider
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-ratings.html"
                        className="nav-link"
                        data-key="t-ratings"
                      >
                        Ratings
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-highlight.html"
                        className="nav-link"
                        data-key="t-highlight"
                      >
                        Highlight
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="advance-ui-scrollspy.html"
                        className="nav-link"
                        data-key="t-scrollSpy"
                      >
                        ScrollSpy
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link menu-link" href="widgets.html">
                  <i className="ri-honour-line" />{" "}
                  <span data-key="t-widgets">Widgets</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarForms"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarForms"
                >
                  <i className="ri-file-list-3-line" />{" "}
                  <span data-key="t-forms">Forms</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarForms">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="forms-elements.html"
                        className="nav-link"
                        data-key="t-basic-elements"
                      >
                        Basic Elements
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-select.html"
                        className="nav-link"
                        data-key="t-form-select"
                      >
                        {" "}
                        Form Select{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-checkboxs-radios.html"
                        className="nav-link"
                        data-key="t-checkboxs-radios"
                      >
                        Checkboxs &amp; Radios
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-pickers.html"
                        className="nav-link"
                        data-key="t-pickers"
                      >
                        {" "}
                        Pickers{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-masks.html"
                        className="nav-link"
                        data-key="t-input-masks"
                      >
                        Input Masks
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-advanced.html"
                        className="nav-link"
                        data-key="t-advanced"
                      >
                        Advanced
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-range-sliders.html"
                        className="nav-link"
                        data-key="t-range-slider"
                      >
                        {" "}
                        Range Slider{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-validation.html"
                        className="nav-link"
                        data-key="t-validation"
                      >
                        Validation
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-wizard.html"
                        className="nav-link"
                        data-key="t-wizard"
                      >
                        Wizard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-editors.html"
                        className="nav-link"
                        data-key="t-editors"
                      >
                        Editors
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-file-uploads.html"
                        className="nav-link"
                        data-key="t-file-uploads"
                      >
                        File Uploads
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-layouts.html"
                        className="nav-link"
                        data-key="t-form-layouts"
                      >
                        Form Layouts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="forms-select2.html"
                        className="nav-link"
                        data-key="t-select2"
                      >
                        Select2
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarTables"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarTables"
                >
                  <i className="ri-layout-grid-line" />{" "}
                  <span data-key="t-tables">Tables</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarTables">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="tables-basic.html"
                        className="nav-link"
                        data-key="t-basic-tables"
                      >
                        Basic Tables
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="tables-gridjs.html"
                        className="nav-link"
                        data-key="t-grid-js"
                      >
                        Grid Js
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="tables-listjs.html"
                        className="nav-link"
                        data-key="t-list-js"
                      >
                        List Js
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="tables-datatables.html"
                        className="nav-link"
                        data-key="t-datatables"
                      >
                        Datatables
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarCharts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarCharts"
                >
                  <i className="ri-pie-chart-line" />{" "}
                  <span data-key="t-charts">Charts</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarCharts">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="#sidebarApexcharts"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarApexcharts"
                        data-key="t-apexcharts"
                      >
                        Apexcharts
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarApexcharts"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="charts-apex-line.html"
                              className="nav-link"
                              data-key="t-line"
                            >
                              {" "}
                              Line
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-area.html"
                              className="nav-link"
                              data-key="t-area"
                            >
                              {" "}
                              Area
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-column.html"
                              className="nav-link"
                              data-key="t-column"
                            >
                              Column{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-bar.html"
                              className="nav-link"
                              data-key="t-bar"
                            >
                              {" "}
                              Bar{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-mixed.html"
                              className="nav-link"
                              data-key="t-mixed"
                            >
                              {" "}
                              Mixed
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-timeline.html"
                              className="nav-link"
                              data-key="t-timeline"
                            >
                              Timeline{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-range-area.html"
                              className="nav-link"
                              data-key="t-range-area"
                            >
                              Range Area
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-funnel.html"
                              className="nav-link"
                              data-key="t-funnel"
                            >
                              Funnel
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-candlestick.html"
                              className="nav-link"
                              data-key="t-candlstick"
                            >
                              {" "}
                              Candlstick{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-boxplot.html"
                              className="nav-link"
                              data-key="t-boxplot"
                            >
                              Boxplot{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-bubble.html"
                              className="nav-link"
                              data-key="t-bubble"
                            >
                              Bubble{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-scatter.html"
                              className="nav-link"
                              data-key="t-scatter"
                            >
                              Scatter{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-heatmap.html"
                              className="nav-link"
                              data-key="t-heatmap"
                            >
                              Heatmap{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-treemap.html"
                              className="nav-link"
                              data-key="t-treemap"
                            >
                              Treemap{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-pie.html"
                              className="nav-link"
                              data-key="t-pie"
                            >
                              {" "}
                              Pie{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-radialbar.html"
                              className="nav-link"
                              data-key="t-radialbar"
                            >
                              {" "}
                              Radialbar{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-radar.html"
                              className="nav-link"
                              data-key="t-radar"
                            >
                              {" "}
                              Radar
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-polar.html"
                              className="nav-link"
                              data-key="t-polar-area"
                            >
                              Polar Area{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="charts-apex-slope.html"
                              className="nav-link"
                            >
                              <span data-key="t-slope">Slope</span>{" "}
                              <span
                                className="badge badge-pill bg-success"
                                data-key="t-new"
                              >
                                New
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a
                        href="charts-chartjs.html"
                        className="nav-link"
                        data-key="t-chartjs"
                      >
                        {" "}
                        Chartjs{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="charts-echarts.html"
                        className="nav-link"
                        data-key="t-echarts"
                      >
                        {" "}
                        Echarts{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarIcons"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarIcons"
                >
                  <i className="ri-compasses-2-line" />{" "}
                  <span data-key="t-icons">Icons</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarIcons">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="icons-remix.html" className="nav-link">
                        <span data-key="t-remix">Remix</span>{" "}
                        <span className="badge badge-pill bg-info">v4.3</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="icons-boxicons.html" className="nav-link">
                        <span data-key="t-boxicons">Boxicons</span>{" "}
                        <span className="badge badge-pill bg-info">v2.1.4</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="icons-materialdesign.html" className="nav-link">
                        <span data-key="t-material-design">
                          Material Design
                        </span>{" "}
                        <span className="badge badge-pill bg-info">
                          v7.2.96
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="icons-lineawesome.html"
                        className="nav-link"
                        data-key="t-line-awesome"
                      >
                        Line Awesome
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="icons-feather.html" className="nav-link">
                        <span data-key="t-feather">Feather</span>{" "}
                        <span className="badge badge-pill bg-info">
                          v4.29.2
                        </span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="icons-crypto.html" className="nav-link">
                        {" "}
                        <span data-key="t-crypto-svg">Crypto SVG</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarMaps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarMaps"
                >
                  <i className="ri-map-pin-line" />{" "}
                  <span data-key="t-maps">Maps</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarMaps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a
                        href="maps-google.html"
                        className="nav-link"
                        data-key="t-google"
                      >
                        Google
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="maps-vector.html"
                        className="nav-link"
                        data-key="t-vector"
                      >
                        Vector
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="maps-leaflet.html"
                        className="nav-link"
                        data-key="t-leaflet"
                      >
                        Leaflet
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarMultilevel"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarMultilevel"
                >
                  <i className="ri-share-line" />{" "}
                  <span data-key="t-multi-level">Multi Level</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarMultilevel">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <a href="#" className="nav-link" data-key="t-level-1.1">
                        {" "}
                        Level 1.1{" "}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#sidebarAccount"
                        className="nav-link"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarAccount"
                        data-key="t-level-1.2"
                      >
                        {" "}
                        Level 1.2
                      </a>
                      <div
                        className="collapse menu-dropdown"
                        id="sidebarAccount"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item">
                            <a
                              href="#"
                              className="nav-link"
                              data-key="t-level-2.1"
                            >
                              {" "}
                              Level 2.1{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#sidebarCrm"
                              className="nav-link"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="sidebarCrm"
                              data-key="t-level-2.2"
                            >
                              {" "}
                              Level 2.2
                            </a>
                            <div
                              className="collapse menu-dropdown"
                              id="sidebarCrm"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item">
                                  <a
                                    href="#"
                                    className="nav-link"
                                    data-key="t-level-3.1"
                                  >
                                    {" "}
                                    Level 3.1
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    href="#"
                                    className="nav-link"
                                    data-key="t-level-3.2"
                                  >
                                    {" "}
                                    Level 3.2
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          {/* Sidebar */}
        </div>
        <div className="sidebar-background" />
      </div>
      {/* Left Sidebar End */}
      {/* Vertical Overlay*/}
      <div className="vertical-overlay" />
    </>
  );
};

export default Header;

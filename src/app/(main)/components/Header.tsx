import Link from "next/link";

export default function Header() {
  return (
    <header
      id="xb-header-area"
      className="header-area header-style-two header-transparent"
    >
      <div className="header-top">
        <span>
          Get 15% off on all annual plans until September 30! Join Texpo as we
          transform SEO 🚀
        </span>
        <span>
          <a href="#!">Learn more</a>
          <i className="far fa-angle-right" />
        </span>
        <div className="header-shape">
          <div className="shape shape--one">
            <img src="assets/front/img/shape/trangle-shape.png" alt="Expert Code Lab" />
          </div>
          <div className="shape shape--two">
            <img src="assets/front/img/shape/trangle-shape.png" alt="Expert Code Lab" />
          </div>
        </div>
      </div>
      <div className="xb-header stricky">
        <div className="container">
          <div className="header__wrap ul_li_between">
            <div className="header-logo">
              <Link href="/">
                <img src="assets/front/img/logo/logo.png" alt="Expert Code Lab" />
              </Link>
            </div>
            <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li className="active">
                    <Link href="/">
                      <span>Home</span>
                    </Link>
                  
                  </li>
                  <li className="menu-item-has-children megamenu">
                    <a href="#!">
                      <span>About ECL</span>
                    </a>
                    <ul className="submenu">
                      <li>
                        <div className="mega_menu_wrapper">
                          <div className="container">
                            <div className="mega_menu_wrapper_inner">
                              <div className="row">
                                <div className="col-xl-9">
                                  <div className="megamenu_pages_wrapper mb-5">
                                    <div className="row g-10">
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="about.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_01.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              About Us
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Learn more about ECL
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="pricing.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_02.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Our Pricing
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Streamlined Pricing{" "}
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="team.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_03.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                               Our Experts
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            We are friendly Join our team.
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="services"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_04.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Services
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Happy to help you!
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="#"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_05.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Services details
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Happy to help you!
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="casestudy.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_06.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Casestudy
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Explore our all casestudy.
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="career.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_07.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Career
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Happy to help you!{" "}
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="career-details.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_08.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Career details
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            {" "}
                                            We are friendly Join our team.
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="casestudy-details.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_09.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Casestudy details
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Explore our all casestudy.
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="terms-conditions.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_10.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Terms &amp; Conditions
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Your Rights and Responsibilities.
                                          </span>
                                        </a>
                                      </div>
                                      <div className="col-xl-4 col-md-4">
                                        <a
                                          className="iconbox_block_2"
                                          href="privacy-policy.html"
                                        >
                                          <span className="icon_title_wrap">
                                            <small className="iconbox_icon">
                                              <img
                                                src="assets/front/img/icon/m_11.svg"
                                                alt="Expert Code Lab"
                                              />
                                            </small>
                                            <small className="iconbox_title">
                                              Privacy Policy
                                            </small>
                                          </span>
                                          <span className="deScription mb-0">
                                            Commitment to Confidentiality.
                                          </span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <ul className="btns_group p-0 unordered_list justify-content-start">
                                    <li>
                                      <Link
                                        href="/contact"
                                        className="thm-btn thm-btn--aso megamenu-btn thm-btn--header-black"
                                      >
                                        Get free consultation
                                      </Link>
                                    </li>
                                    <li>
                                      <div className="review_short_info_2">
                                        <div className="review_admin_logo">
                                          <img
                                            src="assets/front/img/logo/client-logo.svg"
                                            alt="Expert Code Lab"
                                          />
                                        </div>
                                        <div className="review_info_content">
                                          <ul className="rating_block unordered_list">
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                          </ul>
                                          <div className="review_counter">
                                            From
                                            <b>200+</b> reviews
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li>
                                      <div className="review_short_info_2">
                                        <div className="review_admin_logo">
                                          <img
                                            src="assets/front/img/logo/client-logo2.svg"
                                            alt="Expert Code Lab"
                                          />
                                        </div>
                                        <div className="review_info_content">
                                          <ul className="rating_block unordered_list">
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                            <li>
                                              <i className="fas fa-star" />
                                            </li>
                                          </ul>
                                          <div className="review_counter">
                                            From
                                            <b>200+</b> reviews
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-xl-3">
                                  <div className="autpr_box">
                                    <div className="site_author">
                                      <div className="author_box">
                                        <div className="author_image bg-light">
                                          <img
                                            src="assets/front/img/bg/rp-yadav.png"
                                            alt="Expert Code Lab"
                                          />
                                        </div>
                                        <div className="author_box_content">
                                          <h3 className="author_name text-white">
                                            Ram Pravesh Yadav
                                          </h3>
                                          <span className="author_designation text-white">
                                            CEO
                                          </span>
                                        </div>
                                      </div>
                                      <p className="mb-0 text-white">
                                        “As a CEO at Expert Code Lab I have been voice
                                        crying in the wilderness, trying to make
                                        requirements clear, use every minute to
                                        deliver the result, and not reinvent the
                                        wheel. Here at ECL, I made that
                                        possible for the clients”.{" "}
                                      </p>
                                      <div className="author_box_quote">
                                        <img
                                          src="assets/front/img/icon/quote.png"
                                          alt="Expert Code Lab"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item-has-children megamenu">
                    <a href="services">
                      <span>Services</span>
                    </a>
                    <ul className="submenu">
                      <li>
                        <div className="mega_menu_wrapper">
                          <div className="container">
                            <div className="mega_menu_wrapper_inner megamenu_widget_wrapper">
                              <div className="row justify-content-lg-between">
                                <div className="col-xl-8">
                                  <div className="megamenu_widget_inner">
                                    <div className="row">
                                      <div className="col-xl-6">
                                        <div className="megamenu_widget">
                                          <ul className="icon_list unordered_list_block">
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  International SEO
                                                </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  Niche research
                                                </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  Link building{" "}
                                                </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  Enterprise SEO
                                                </span>
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
                                                <span className="icon_list_text">
                                                  Penalty recovery
                                                </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  Content optimization
                                                </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  Technical SEO
                                                </span>
                                              </a>
                                            </li>
                                            <li>
                                              <a href="#">
                                                <span className="icon_list_text">
                                                  Competitor analysis
                                                </span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="social_area">
                                    <div className="social_inner ul_li">
                                      <h5>Follow Us:</h5>
                                      <ul className="social_icons_block unordered_list">
                                        <li>
                                          <a href="#!">
                                            <i className="fab fa-facebook-f" />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#!">
                                            <i className="fab fa-linkedin-in" />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#!">
                                            <svg
                                              width={18}
                                              height={18}
                                              viewBox="0 0 18 18"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M10.6774 7.62177L17.2342 0H15.6805L9.98719 6.61788L5.43998 0H0.195312L7.07159 10.0074L0.195312 18H1.74916L7.76141 11.0113L12.5636 18H17.8083L10.677 7.62177H10.6774ZM8.54921 10.0956L7.8525 9.09906L2.30903 1.16971H4.69564L9.16929 7.56895L9.866 8.56546L15.6812 16.8835H13.2946L8.54921 10.096V10.0956Z"
                                                fill="#0C111D"
                                              />
                                            </svg>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#!">
                                            <i className="fab fa-dribbble" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <p className="career_link m-0">
                                      Looking for new career?{" "}
                                      <a href="career.html">We’re Hiring</a>
                                    </p>
                                  </div>
                                </div>
                                <div className="col-xl-3">
                                  <div className="megamenu_case">
                                    <h3>Software</h3>
                                    <h4>Madical SEO success..</h4>
                                    <img
                                      src="assets/front/img/casestudy/mm_img.png"
                                      alt="Expert Code Lab"
                                    />
                                    <a
                                      className="megamenu_btn"
                                      href="casestudy.html"
                                    >
                                      <span className="btn_label">
                                        Read casestudy
                                      </span>
                                      <span className="btn_icon">
                                        <svg
                                          width={13}
                                          height={13}
                                          viewBox="0 0 13 13"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M13 1C13 0.447715 12.5523 2.00008e-07 12 -5.28728e-08L3 7.47917e-07C2.44771 4.10743e-07 2 0.447716 2 1C2 1.55228 2.44772 2 3 2L11 2L11 10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10L13 1ZM1.70711 12.7071L12.7071 1.70711L11.2929 0.292894L0.292893 11.2929L1.70711 12.7071Z"
                                            fill="white"
                                          />
                                        </svg>
                                      </span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li >
                    <a href="/technology-and-solutions">
                      <span>Technology & Solutions</span>
                    </a>
                    
                  </li>
                  <li className="">
                    <Link href="/blogs">
                      <span>Blog</span>
                    </Link>
                  
                  </li>
                  <li>
                    <Link href="/contact">
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="xb-header-wrap">
                <div className="xb-header-menu">
                  <div className="xb-header-menu-scroll lenis lenis-smooth">
                    <div className="xb-menu-close xb-hide-xl xb-close" />
                    <div className="xb-logo-mobile xb-hide-xl">
                      <a href="/" rel="home">
                        <img src="assets/front/img/logo/logo.png" alt="Expert Code Lab" />
                      </a>
                    </div>
                    
                    <nav className="xb-header-nav">
                      <ul className="xb-menu-primary clearfix">
                        <li className="active">
                          <a href="/">
                            <span>Home</span>
                          </a>
                         
                        </li>
                        <li className="menu-item menu-item-has-children megamenu">
                          <a href="#!">
                            <span>About ECL</span>
                          </a>
                          <ul className="sub-menu">
                            <li>
                              <div className="mega_menu_wrapper">
                                <div className="container">
                                  <div className="mega_menu_wrapper_inner">
                                    <div className="row">
                                      <div className="col-xl-9">
                                        <div className="megamenu_pages_wrapper mb-5">
                                          <div className="row g-10">
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="about.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_01.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    About Us
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Learn more about ECL
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="#"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_02.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Our Pricing
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Streamlined Pricing{" "}
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="#"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_03.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Our Experts
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  We are friendly Join our team.
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="#"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_04.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Services
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Happy to help you!
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="#"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_05.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Services details
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Happy to help you!
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="casestudy.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_06.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Casestudy
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Explore our all casestudy.
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="career.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_07.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Career
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Happy to help you!{" "}
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="career-details.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_08.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Career details
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  {" "}
                                                  We are friendly Join our team.
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="casestudy-details.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_09.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Casestudy details
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Explore our all casestudy.
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="terms-conditions.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_10.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Terms &amp; Conditions
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Your Rights and
                                                  Responsibilities.
                                                </span>
                                              </a>
                                            </div>
                                            <div className="col-xl-4 col-lg-12">
                                              <a
                                                className="iconbox_block_2"
                                                href="privacy-policy.html"
                                              >
                                                <span className="icon_title_wrap">
                                                  <small className="iconbox_icon">
                                                    <img
                                                      src="assets/front/img/icon/m_11.svg"
                                                      alt="Expert Code Lab"
                                                    />
                                                  </small>
                                                  <small className="iconbox_title">
                                                    Privacy Policy
                                                  </small>
                                                </span>
                                                <span className="deScription mb-0">
                                                  Commitment to Confidentiality.
                                                </span>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <ul className="btns_group p-0 unordered_list justify-content-start">
                                          <li>
                                            <a
                                              href="contact.html"
                                              className="thm-btn thm-btn--aso megamenu-btn thm-btn--header-black"
                                            >
                                              Get free consultation
                                            </a>
                                          </li>
                                          <li>
                                            <div className="review_short_info_2">
                                              <div className="review_admin_logo">
                                                <img
                                                  src="assets/front/img/logo/client-logo.svg"
                                                  alt="Expert Code Lab"
                                                />
                                              </div>
                                              <div className="review_info_content">
                                                <ul className="rating_block unordered_list ul_li">
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                </ul>
                                                <div className="review_counter">
                                                  From
                                                  <b>50+</b> reviews
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="review_short_info_2">
                                              <div className="review_admin_logo">
                                                <img
                                                  src="assets/front/img/logo/client-logo2.svg"
                                                  alt="Expert Code Lab"
                                                />
                                              </div>
                                              <div className="review_info_content">
                                                <ul className="rating_block unordered_list ul_li">
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                  <li>
                                                    <i className="fas fa-star" />
                                                  </li>
                                                </ul>
                                                <div className="review_counter">
                                                  From
                                                  <b>200+</b> reviews
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="col-xl-3">
                                        <div className="autpr_box">
                                          <div className="site_author">
                                            <div className="author_box">
                                              <div className="author_image bg-light">
                                                <img
                                                  src="assets/front/img/bg/rp-yadav.png"
                                                  alt="Expert Code Lab"
                                                />
                                              </div>
                                              <div className="author_box_content">
                                                <h3 className="author_name text-white">
                                                  Ram Pravesh Yadav
                                                </h3>
                                                <span className="author_designation text-white">
                                                  CEO
                                                </span>
                                              </div>
                                            </div>
                                            <p className="mb-0 text-white">
                                              “As a CEO at ECL I have been
                                              voice crying in the wilderness,
                                              trying to make requirements clear,
                                              use every minute to deliver the
                                              result, and not reinvent the
                                              wheel. Here at ECL, I made
                                              that possible for the clients”.{" "}
                                            </p>
                                            <div className="author_box_quote">
                                              <img
                                                src="assets/front/img/icon/quote.png"
                                                alt="Expert Code Lab"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li className="menu-item menu-item-has-children megamenu">
                          <a href="#!">
                            <span>Services</span>
                          </a>
                          <ul className="sub-menu">
                            <li>
                              <div className="mega_menu_wrapper">
                                <div className="container">
                                  <div className="mega_menu_wrapper_inner megamenu_widget_wrapper">
                                    <div className="row justify-content-lg-between">
                                      <div className="col-xl-8">
                                        <div className="megamenu_widget_inner">
                                          <div className="row">
                                            <div className="col-xl-6">
                                              <div className="megamenu_widget">
                                                <ul className="icon_list unordered_list_block">
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        International SEO
                                                      </span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        Niche research
                                                      </span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        Link building{" "}
                                                      </span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        Enterprise SEO
                                                      </span>
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
                                                      <span className="icon_list_text">
                                                        Penalty recovery
                                                      </span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        Content optimization
                                                      </span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        Technical SEO
                                                      </span>
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a href="#">
                                                      <span className="icon_list_text">
                                                        Competitor analysis
                                                      </span>
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="social_area">
                                          <div className="social_inner ul_li">
                                            <h5>Follow Us:</h5>
                                            <ul className="social_icons_block unordered_list">
                                              <li>
                                                <a href="#!">
                                                  <i className="fab fa-facebook-f" />
                                                </a>
                                              </li>
                                              <li>
                                                <a href="#!">
                                                  <i className="fab fa-linkedin-in" />
                                                </a>
                                              </li>
                                              <li>
                                                <a href="#!">
                                                  <svg
                                                    width={18}
                                                    height={18}
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M10.6774 7.62177L17.2342 0H15.6805L9.98719 6.61788L5.43998 0H0.195312L7.07159 10.0074L0.195312 18H1.74916L7.76141 11.0113L12.5636 18H17.8083L10.677 7.62177H10.6774ZM8.54921 10.0956L7.8525 9.09906L2.30903 1.16971H4.69564L9.16929 7.56895L9.866 8.56546L15.6812 16.8835H13.2946L8.54921 10.096V10.0956Z"
                                                      fill="#0C111D"
                                                    />
                                                  </svg>
                                                </a>
                                              </li>
                                              <li>
                                                <a href="#!">
                                                  <i className="fab fa-dribbble" />
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                          <p className="career_link m-0">
                                            Looking for new career?{" "}
                                            <a href="#">
                                              We’re Hiring
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-xl-3">
                                        <div className="megamenu_case">
                                          <h3>Software</h3>
                                          <h4>Madical SEO success..</h4>
                                          <img
                                            src="assets/front/img/casestudy/mm_img.png"
                                            alt="Expert Code Lab"
                                          />
                                          <a
                                            className="megamenu_btn"
                                            href="#"
                                          >
                                            <span className="btn_label">
                                              Read casestudy
                                            </span>
                                            <span className="btn_icon">
                                              <svg
                                                width={13}
                                                height={13}
                                                viewBox="0 0 13 13"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M13 1C13 0.447715 12.5523 2.00008e-07 12 -5.28728e-08L3 7.47917e-07C2.44771 4.10743e-07 2 0.447716 2 1C2 1.55228 2.44772 2 3 2L11 2L11 10C11 10.5523 11.4477 11 12 11C12.5523 11 13 10.5523 13 10L13 1ZM1.70711 12.7071L12.7071 1.70711L11.2929 0.292894L0.292893 11.2929L1.70711 12.7071Z"
                                                  fill="white"
                                                />
                                              </svg>
                                            </span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link href="/technology-and-solutions">
                            <span>Technology & Solutions</span>
                          </Link>
                         
                        </li>
                        <li>
                          <Link href="/blogs">
                            <span>Blog</span>
                          </Link>
                        
                        </li>
                        <li>
                          <Link href="/contact">
                            <span>Contact</span>
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="xb-header-menu-backdrop" />
              </div>
            </div>
            <div className="header-bar-mobile side-menu d-xl-none">
              <a className="xb-nav-mobile" href="javaScript:void(0);">
                <i className="far fa-bars" />
              </a>
            </div>
            <div className="header-contact d-none d-md-block">
              <Link
                href="/contact"
                className="thm-btn thm-btn--aso thm-btn--header-black"
              >
                Let’s talk
                <img src="assets/front/img/icon/sms-white-icon01.svg" alt="Expert Code Lab" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );}
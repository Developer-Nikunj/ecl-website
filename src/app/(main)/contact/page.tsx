"use client"
import { useState,useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [entry,setEntry] = useState({
    name:"",
    email:"",
    phone:"",
    message:""
  })

  const handleSubmit = async ()=>{
    try {
      if (!entry.name || !entry.email || !entry.phone) {
        toast.error("Please fill all required fields");
        return;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/contactForm`,
        entry
      );
      console.log("res",res);
      toast.success("Form Submitted");
      setEntry({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log("error",error);
    }
  }
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
                    <img
                      src="assets/front/img/icon/music-icon.svg"
                      alt="Expert Code Lab"
                    />{" "}
                    Contact us
                  </span>
                  <h2 className="title">
                    Connect with our team for <br /> innovative solutions and{" "}
                    <br /> your digital success
                  </h2>
                </div>
              </div>
              <div className="col-lg-3 mt-30">
                <div className="sd-right-img pos-rel">
                  <img
                    src="assets/front/img/hero/contact-img.png"
                    alt="Expert Code Lab"
                  />
                  <div className="sd-arrow-shape style-3">
                    <img
                      className="xbzoominzoomup"
                      src="assets/front/img/shape/brd_shape.png"
                      alt="Expert Code Lab"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page title end  */}
      {/* contact start  */}
      <div className="contact pt-85">
        <div className="container">
          <div className="row pb-130 mt-none-30">
            <div className="col-lg-8 mt-30">
              <div className="cs-contact-wrap cs-contact-form cd-contact-form item-contact_form">
                <h2 className="xb-title">Send us a message</h2>
                <p className="xb-content">
                  Give us a chance to serve and bring magic to your brand.
                </p>
                <form
                  action="#!"
                  className="contact-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-field">
                        <label htmlFor="text1">Name*</label>
                        <div className="input-box">
                          <input
                            type="text"
                            name="text"
                            id="text1"
                            value={entry.name}
                            onChange={(e) => {
                              setEntry({
                                ...entry,
                                name: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-field">
                        <label htmlFor="text2">Email*</label>
                        <div className="input-box">
                          <input
                            type="email"
                            name="email"
                            id="text2"
                            value={entry.email}
                            onChange={(e) => {
                              setEntry({ ...entry, email: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-field">
                        <label htmlFor="text3">Phone*</label>
                        <div className="input-box">
                          <input
                            type="tel"
                            name="number"
                            id="text3"
                            value={entry.phone}
                            onChange={(e) => {
                              setEntry({ ...entry, phone: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-field text-field">
                        <label htmlFor="text5">Message</label>
                        <div className="input-box">
                          <textarea
                            name="message"
                            id="text5"
                            value={entry.message}
                            onChange={(e) => {
                              setEntry({ ...entry, message: e.target.value });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cp-det-btn mt-20 d-grid">
                    <button className="cp-btn">
                      Send us a message <i className="fal fa-arrow-right" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4 mt-30">
              <div className="item-contact_info">
                <div className="xb-item--inner">
                  <div className="xb-item--top">
                    <h3 className="xb-item--title">Contact Info</h3>
                    <span className="xb-item--hotline">
                      <img
                        src="assets/front/img/icon/call-calling.svg"
                        alt="Expert Code Lab"
                      />{" "}
                      +(91) 7303798986
                    </span>
                    <span className="xb-item--email">
                      <img
                        src="assets/front/img/icon/icon-sms.svg"
                        alt="Expert Code Lab"
                      />{" "}
                      info@expertcodelab.com
                    </span>
                    <ul className="social_icons_block list-unstyled ul_li">
                      <li>
                        <a
                          aria-label="Facebook"
                          href="https://www.facebook.com/expertcodelab/"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a
                          aria-label="Instagram"
                          href="https://www.instagram.com/expertscodelab/"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a
                          aria-label="Linkedin"
                          href="https://www.linkedin.com/company/expert-code-lab/"
                        >
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="contact-info_widget">
                    <h3 className="xb-title">INDIA HEAD OFFICE:</h3>
                    <span className="xb-location">
                      G 694/14, 1st Floor, Back Side Jaitpur Extn. Part-II,
                      Badarpur, South Delhi -110044 (India)
                    </span>
                  </div>
                  <div className="contact-info_widget">
                    <h3 className="xb-title">INDIA NOIDA CORP OFFICE:</h3>
                    <span className="xb-location">
                      C-50, Sector 2, Noida 201301 (India)
                    </span>
                  </div>

                  <hr className="breack-line" />
                  <div className="contact-info_widget">
                    <h3 className="xb-title">USA HEAD OFFICE:</h3>
                    <span className="xb-location">
                      3513 Leanne Drive, Flower Mound,
                      <br />
                      Texas 75022 (USA)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* contact end  */}
      {/* google map start  */}
      <div className="gmap_canvas bg-light">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14014.256894189444!2d77.3146636!3d28.5828457!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd85f432e4264b535!2sExpert%20Code%20Lab%20Private%20Limited!5e0!3m2!1sen!2sin!4v1607224581182!5m2!1sen!2sin"
          frameBorder={0}
          style={{ border: 0 }}
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      {/* google map end  */}
      {/* cta section start  */}
      <section className="cta">
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
                  alt="Expert Code Lab"
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

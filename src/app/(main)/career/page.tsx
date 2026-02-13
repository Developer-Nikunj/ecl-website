import Image from "next/image";
import HiringProcess from "@/app/(main)/components/HirinhProcess"
import Link from "next/link";

export default function Career() {
  return (
   
   <main>
  {/* page title start  */}
  <section
    className="page-title cp-page-title pt-200 pos-rel bg_img"
    data-background="assets/front/img/bg/page_bg01.jpg"
  >
    <div className="container">
      <div className="page-title-wrap">
        <div className="row mt-none-30 align-items-center">
          <div className="col-lg-8 mt-30">
            <div className="page-title-box">
              <span className="sub-title">
                <img src="assets/front/img/icon/magic.svg" alt="Hire Experts" />
                Careers
              </span>
              <h2 className="title">
                Be a part of shaping the <br /> future &amp; career
                opportunities <br /> at ECL today.
              </h2>
            </div>
          </div>
          <div className="col-lg-4 mt-30">
            <div className="cp-img-slide">
              <div className="cp-img-inner ul_li">
                <div className="cp-item marquee-first">
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img01.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img02.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img03.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img01.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img02.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img03.jpg" alt="Hire Experts" />
                  </div>
                </div>
                <div className="cp-item marquee-2">
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img04.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img05.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img06.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img04.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img05.jpg" alt="Hire Experts" />
                  </div>
                  <div className="xb-img">
                    <img src="assets/front/img/gallery/cp-img06.jpg" alt="Hire Experts" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* page title end  */}
  {/* process title start  */}
  <section className="process process-bg pt-115 pb-130">
    <div className="container">
      <div className="row align-items-center mt-none-30">
        <div className="col-lg-6 mt-30">
          <div className="sec-title--two mb-50">
            <div className="sub-title">
              <img src="assets/front/img/icon/eye-icon.svg" alt="Hire Experts" /> Hiring process
            </div>
            <h2 className="title">Our hiring process</h2>
          </div>
          <div className="xb-faq cp-faq">
            <ul className="accordion_box clearfix list-unstyled">
              <HiringProcess/>
              
              
            </ul>
          </div>
        </div>
        <div className="col-lg-6 mt-30">
          <div className="cp-process-right">
            <div className="xb-img">
              <img src="assets/front/img/process/cp-img.png" alt="Hire Experts" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* process title end  */}
  {/* team title start  */}
  <section className="team pt-130 pb-130">
    <div className="container">
      <div className="sec-title--two text-center mb-50">
        <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
          <img src="assets/front/img/icon/cp-icon.svg" alt="Hire Experts" />
          Open Positions
        </div>
        <h2
          className="title wow fadeInDown"
          data-wow-delay="150ms"
          data-wow-duration="600ms"
        >
          Join our team
        </h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-12 text-center">
          <div className="team-menu mb-50">
            <button className="active" data-filter="*">
              View all
            </button>
            <button data-filter=".cat1" className="">
              Development
            </button>
            <button data-filter=".cat2">Design</button>
            <button data-filter=".cat3">Marketing</button>
            <button data-filter=".cat4">Customer services</button>
            <button data-filter=".cat5">Management</button>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="cp-team-wrap grid">
            <div className="cp-team-item grid-item cat1 cat3 cat5">
              <div className="xb-item--inner ul_li_between">
                <div className="xb-item--content">
                  <h3 className="xb-item--title">
                    <a href="#!">Enterprise SEO Consultant</a>
                  </h3>
                  <div className="xb-item--holder ul_li">
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/loc-icon.svg" alt="Hire Experts" />
                      Remote, (USA)
                    </span>
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/clock-icon.svg" alt="Hire Experts" />
                      Full time
                    </span>
                  </div>
                </div>
                <div className="cp-team-btn">
                  <a href="#" className="cp-btn">
                    View job <i className="fal fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="cp-team-item grid-item cat2 cat4">
              <div className="xb-item--inner ul_li_between">
                <div className="xb-item--content">
                  <h3 className="xb-item--title">
                    <a href="#!">IT Infrastructure Manager</a>
                  </h3>
                  <div className="xb-item--holder ul_li">
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/loc-icon.svg" alt="Hire Experts" />
                      Remote, Colombia
                    </span>
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/clock-icon.svg" alt="Hire Experts" />
                      Full time
                    </span>
                  </div>
                </div>
                <div className="cp-team-btn">
                  <a href="#" className="cp-btn">
                    View job <i className="fal fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="cp-team-item grid-item cat1 cat5">
              <div className="xb-item--inner ul_li_between">
                <div className="xb-item--content">
                  <h3 className="xb-item--title">
                    <a href="#!">Technical Project Manager</a>
                  </h3>
                  <div className="xb-item--holder ul_li">
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/loc-icon.svg" alt="Hire Experts" />
                      Warsaw, Poland{" "}
                    </span>
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/clock-icon.svg" alt="Hire Experts" />
                      Full time
                    </span>
                  </div>
                </div>
                <div className="cp-team-btn">
                  <a href="#" className="cp-btn">
                    View job <i className="fal fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="cp-team-item grid-item cat2 cat3">
              <div className="xb-item--inner ul_li_between">
                <div className="xb-item--content">
                  <h3 className="xb-item--title">
                    <a href="#!">Cloud Solutions Architect</a>
                  </h3>
                  <div className="xb-item--holder ul_li">
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/loc-icon.svg" alt="Hire Experts" />
                      Bangalore (Hybrid)
                    </span>
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/clock-icon.svg" alt="Hire Experts" />
                      Full time
                    </span>
                  </div>
                </div>
                <div className="cp-team-btn">
                  <a href="#" className="cp-btn">
                    View job <i className="fal fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="cp-team-item grid-item cat1 cat4">
              <div className="xb-item--inner ul_li_between">
                <div className="xb-item--content">
                  <h3 className="xb-item--title">
                    <a href="#!">IT Support Engineer</a>
                  </h3>
                  <div className="xb-item--holder ul_li">
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/loc-icon.svg" alt="Hire Experts" />
                      Remote, Argentina
                    </span>
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/clock-icon.svg" alt="Hire Experts" />
                      Full time
                    </span>
                  </div>
                </div>
                <div className="cp-team-btn">
                  <a href="#" className="cp-btn">
                    View job <i className="fal fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="cp-team-item grid-item cat2 cat3 cat5">
              <div className="xb-item--inner ul_li_between">
                <div className="xb-item--content">
                  <h3 className="xb-item--title">
                    <a href="#!">Global Benefits Manager</a>
                  </h3>
                  <div className="xb-item--holder ul_li">
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/loc-icon.svg" alt="Hire Experts" />
                      Remote, Canada
                    </span>
                    <span className="xb-item--meta">
                      <img src="assets/front/img/icon/clock-icon.svg" alt="Hire Experts" />
                      Full time
                    </span>
                  </div>
                </div>
                <div className="cp-team-btn">
                  <a href="#" className="cp-btn">
                    View job <i className="fal fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* team title end */}
  {/* work section start */}
  <section className="work pt-130 pb-130" data-bg-color="#f6f6f8">
    <div className="container">
      <div className="sec-title--two text-center mb-60">
        <div className="sub-title">
          <img src="assets/front/img/icon/eye-icon.svg" alt="Hire Experts" /> Why work with us
        </div>
        <h2 className="title">Why people work with us</h2>
      </div>
      <div className="tp-work-wrapp">
        <div className="row mt-none-30">
          <div className="col-lg-6 mt-30">
            <div className="tp-work-item">
              <div className="xb-item--inner ul_li">
                <div className="xb-item--icon">
                  <img src="assets/front/img/icon/tp-work-icon01.svg" alt="Hire Experts" />
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Endless career growth</h3>
                  <p className="xb-item--content">
                    We provide lots of career growth opportunities to our
                    employees, which is reflected both financially and
                    reputably.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-30">
            <div className="tp-work-item">
              <div className="xb-item--inner ul_li">
                <div className="xb-item--icon">
                  <img src="assets/front/img/icon/tp-work-icon02.svg" alt="Hire Experts" />
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Mentorship &amp; learning</h3>
                  <p className="xb-item--content">
                    We support peer assistance and offer mentorship programs
                    like IT Talks and in-house courses for different roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-30">
            <div className="tp-work-item">
              <div className="xb-item--inner ul_li">
                <div className="xb-item--icon">
                  <img src="assets/front/img/icon/tp-work-icon03.svg" alt="Hire Experts" />
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Cozy &amp; fun offices</h3>
                  <p className="xb-item--content">
                    Our four R&amp;D offices offer a gym, yoga mats, snacks,
                    foosball, a VR set, and more for a comfortable workspace.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-30">
            <div className="tp-work-item">
              <div className="xb-item--inner ul_li">
                <div className="xb-item--icon">
                  <img src="assets/front/img/icon/tp-work-icon04.svg" alt="Hire Experts" />
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Competitive salary</h3>
                  <p className="xb-item--content">
                    Our projects belong to a wide variety of industries, which
                    will make your professional background more diverse.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-30">
            <div className="tp-work-item">
              <div className="xb-item--inner ul_li">
                <div className="xb-item--icon">
                  <img src="assets/front/img/icon/tp-work-icon05.svg" alt="Hire Experts" />
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Career change option</h3>
                  <p className="xb-item--content">
                    No need to job hunt to learn new tech or switch roles—we’ll
                    support your transition within ECL.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-30">
            <div className="tp-work-item">
              <div className="xb-item--inner ul_li">
                <div className="xb-item--icon">
                  <img src="assets/front/img/icon/tp-work-icon06.svg" alt="Hire Experts" />
                </div>
                <div className="xb-item--holder">
                  <h3 className="xb-item--title">Friendly atmosphere</h3>
                  <p className="xb-item--content">
                    We value people as ECL greatest asset and ensure
                    hierarchy never works against our employees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-contact text-center mt-60">
          <Link
            href="/contact"
            className="thm-btn thm-btn--aso thm-btn--header-black"
          >
            Let’s talk
            <img src="assets/front/img/icon/sms-white-icon01.svg" alt="Hire Experts" />
          </Link>
        </div>
      </div>
    </div>
  </section>
  {/* work section end  */}
  {/* video section start  */}
  <div className="cp-video pb-130">
    <div className="container">
      <div className="xb-img pos-rel d-block">
        <div className="career_video">
          <video
            className="responsive-video"
           loop={true}
  muted={true}
  playsInline={true}
  autoPlay={true}
            poster="assets/front/img/video/img02.jpg"
          >
            <source
              src="https://videos.pexels.com/video-files/4629766/4629766-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <h2 className="title">ECL</h2>
      </div>
    </div>
  </div>
  {/* video section end  */}
  {/* gallery start  */}
  <section className="gallery pb-130">
    <div className="container">
      <div className="sec-title--two text-center mb-60">
        <div className="sub-title">
          <img src="assets/front/img/icon/eye-icon.svg" alt="Hire Experts" />
          Our gallery
        </div>
        <h2 className="title">Explore stunning moments</h2>
      </div>
      <div className="gallery-wrap ul_li">
        <div className="gallery-item gallery-item--one">
          <div className="img img--1">
            <img src="assets/front/img/gallery/img01.jpg" alt="Hire Experts" />
          </div>
          <div className="img img--2">
            <img src="assets/front/img/gallery/img02.jpg" alt="Hire Experts" />
          </div>
          <div className="img img--1">
            <img src="assets/front/img/gallery/img03.jpg" alt="Hire Experts" />
          </div>
        </div>
        <div className="gallery-item gallery-item--two">
          <div className="img img--2">
            <img src="assets/front/img/gallery/img04.jpg" alt="Hire Experts" />
          </div>
          <div className="img img--1">
            <img src="assets/front/img/gallery/img05.jpg" alt="Hire Experts" />
          </div>
        </div>
        <div className="gallery-item gallery-item--three">
          <div className="ul_li_between">
            <div className="img img--3">
              <img src="assets/front/img/gallery/img06.jpg" alt="Hire Experts" />
            </div>
            <div className="img img--4">
              <img src="assets/front/img/gallery/img07.jpg" alt="Hire Experts" />
            </div>
          </div>
          <div className="img img--4">
            <img src="assets/front/img/gallery/img08.jpg" alt="Hire Experts" />
          </div>
        </div>
        <div className="gallery-item gallery-item--four">
          <div className="img img--1">
            <img src="assets/front/img/gallery/img09.jpg" alt="Hire Experts" />
          </div>
          <div className="img img--2">
            <img src="assets/front/img/gallery/img10.jpg" alt="Hire Experts" />
          </div>
          <div className="img img--5">
            <img src="assets/front/img/gallery/img11.jpg" alt="Hire Experts" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* gallery end  */}
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
            <h2 className="xb-item--title">Stop wasting money on bad SEO.</h2>
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
            <img className="updown" src="assets/front/img/cta/clip-bord.png" alt="Hire Experts" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* cta section end  */}
</main>


  );
}

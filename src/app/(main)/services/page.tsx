import Image from "next/image";


async function getServices() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/service`,
    {
      cache: "no-store", // forces SSR
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  return res.json();
}


export default async function Services() {

  const data = await getServices();

  return (
    <main>
      {/* page title start  */}
      <section
        className="page-title pt-200 pos-rel bg_img"
        data-background="assets/front/img/bg/page_bg01.jpg"
      >
        <div className="container">
          <div className="page-title-wrap">
            <div className="row mt-none-30 align-items-end">
              <div className="col-lg-9 mt-30">
                <div className="page-title-box">
                  <span className="sub-title">
                    <img
                      src="assets/front/img/icon/ser-01.svg"
                      alt="Expert Code Lab Services"
                    />{" "}
                    Main Services
                  </span>
                  <h2 className="title">
                    Discover our comprehensive <br /> SEO services to boost your{" "}
                    <br /> online presence
                  </h2>
                </div>
              </div>
              <div className="col-lg-3 mt-30">
                <div className="count-box">
                  <h2 className="number">09</h2>
                  <span className="text">
                    Professional top <br /> services
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page title end  */}
      {/* service start  */}
      <section className="service pt-65 pb-130">
        <div className="container">
          <div className="row mt-none-30">
            {data.data.map((i) => (
              <div className="col-lg-4 col-md-6 mt-30 d-flex" key={i.id}>
                <div className="service-box w-100">
                  <div className="service-item h-100 d-flex flex-column justify-content-between">
                    <div className="xb-item--holder mb-85">
                      <h3 className="xb-item--title">{i.name}</h3>
                      <span className="xb-item--contact text-truncate d-block">
                        {i.description}
                      </span>
                    </div>

                    <div className="xb-item--icon d-flex justify-content-between align-items-center">
                      <div className="xb-item--img">
                        <img src={i.image} alt={i.name} />
                      </div>
                      <a href={`/service/${i.slug}`} className="xb-item--arrow">
                        <img
                          src="assets/front/img/icon/arrow-black.svg"
                          alt="Arrow"
                        />
                      </a>
                    </div>
                  </div>

                  <a href={`/service/${i.id}`} className="xb-overlay" />
                </div>
              </div>
            ))}
          </div>

          <div
            className="xb-btn text-center mt-60 wow fadeInUp"
            data-wow-delay="450ms"
            data-wow-duration="600ms"
          >
            <a
              href="service.html"
              className="thm-btn thm-btn--aso thm-btn--aso_yellow"
            >
              Book a free consultation
            </a>
          </div>
        </div>
      </section>
      {/* service end  */}
      {/* process section start  */}
      <section
        className="process z-1 pt-130 pb-100 pos-rel"
        data-bg-color="#0F55DC"
      >
        <div className="container">
          <div className="sec-title--two text-center mb-90">
            <div
              className="sub-title sub-title--strock wow fadeInDown"
              data-wow-duration="600ms"
            >
              <img
                src="assets/front/img/icon/process-icon.svg"
                alt="Expert Code Lab Services"
              />
              Our working process
            </div>
            <h2
              className="title clr-white wow fadeInDown"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
              Our SEO workflow
            </h2>
          </div>
          <div className="row mt-none-30">
            <div className="col-lg-6 mt-30">
              <div className="sa-process_left">
                <div className="process-item process-item--one">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/search01.svg"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <h4 className="xb-item--title">Research niche </h4>
                  <span className="xb-item--contact">
                    Identify your target market and understand customer needs to
                    find competitive.
                  </span>
                  <span className="xb-item--number">01</span>
                </div>
                <div className="process-item process-item--two">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/user-icon.png"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <h4 className="xb-item--title">Set up your team</h4>
                  <span className="xb-item--contact">
                    Assemble a skilled team aligned with your business goals and
                    objectives.
                  </span>
                  <span className="xb-item--number">02</span>
                </div>
                <div className="process-item process-item--three">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/clipboar02.svg"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <h4 className="xb-item--title">Create a game plan</h4>
                  <span className="xb-item--contact">
                    Develop a detailed strategy objectives, audiences, and
                    marketing approaches.
                  </span>
                  <span className="xb-item--number">03</span>
                </div>
                <div className="process-item process-item--four">
                  <div className="xb-item--icon">
                    <img
                      src="assets/front/img/icon/medal-star.svg"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <h4 className="xb-item--title">Review and scale</h4>
                  <span className="xb-item--contact">
                    Analyze performance metrics regularly to optimize and grow
                    your strategy effectively.
                  </span>
                  <span className="xb-item--number">04</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-30">
              <div
                className="sa-process_right wow fadeInRight"
                data-wow-duration="600ms"
              >
                <img
                  className="updown"
                  src="assets/front/img/process/illistration.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sa-process_shape">
          <div className="shape shape--one">
            <img
              src="assets/front/img/shape/trangle-shape02.png"
              alt="Expert Code Lab Services"
            />
          </div>
          <div className="shape shape--two">
            <img
              src="assets/front/img/shape/trangle-shape03.png"
              alt="Expert Code Lab Services"
            />
          </div>
          <div className="shape shape--three">
            <img
              src="assets/front/img/shape/pattern.png"
              alt="Expert Code Lab Services"
            />
          </div>
        </div>
      </section>
      {/* process section end  */}
      {/* testimonial section start */}
      <section className="testimonial o-hidden pb-130 pt-130">
        <div className="container">
          <div className="sa-tes_top pos-rel mb-60">
            <div className="sec-title--two">
              <div
                className="sub-title wow fadeInDown"
                data-wow-duration="600ms"
              >
                <img
                  src="assets/front/img/icon/like-icon.svg"
                  alt="Expert Code Lab Services"
                />
                99% positive feedback
              </div>
              <h2
                className="title wow skewIn"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                Feedback That Speaks
              </h2>
            </div>
            <div className="sa-tes_button">
              <div className="sa-swiper-btn swiper-button-prev">
                <i className="fal fa-angle-left" />
              </div>
              <div className="sa-swiper-btn active swiper-button-next">
                <i className="fal fa-angle-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="sa-testimonial-slider">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="sa-testimonial-item">
                <div className="xb-item--inner">
                  <div className="xb-item--quta">
                    <img
                      src="assets/front/img/icon/quta.png"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <p className="xb-item--content">
                    "Working with Innomax was fantastic! Their strategies <br />{" "}
                    improved our rankings and increased leads."
                  </p>
                  <div className="xb-item--holder ul_li">
                    <div className="xb-item--avatar">
                      <img
                        src="assets/front/img/testimonial/sa-tas05.png"
                        alt="Expert Code Lab Services"
                      />
                    </div>
                    <div className="xb-item--author">
                      <h3 className="xb-item--name">Christopher Smith</h3>
                      <span className="xb-item--desig">
                        Brand Strat at near{" "}
                      </span>
                      <div className="xb-item--logo">
                        <img
                          src="assets/front/img/testimonial/tes-logo02.png"
                          alt="Expert Code Lab Services"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="sa-testimonial-item">
                <div className="xb-item--inner">
                  <div className="xb-item--quta">
                    <img
                      src="assets/front/img/icon/quta.png"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <p className="xb-item--content">
                    "Innomax exceeded all our expectations! Their expertise in
                    SEO helped us achieve a remarkable 150% "
                  </p>
                  <div className="xb-item--holder ul_li">
                    <div className="xb-item--avatar">
                      <img
                        src="assets/front/img/testimonial/sa-tas01.png"
                        alt="Expert Code Lab Services"
                      />
                    </div>
                    <div className="xb-item--author">
                      <h3 className="xb-item--name">Sarah Davis</h3>
                      <span className="xb-item--desig">
                        Branding at spinlet{" "}
                      </span>
                      <div className="xb-item--logo">
                        <img
                          src="assets/front/img/testimonial/tes-logo01.png"
                          alt="Expert Code Lab Services"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="sa-testimonial-item">
                <div className="xb-item--inner">
                  <div className="xb-item--quta">
                    <img
                      src="assets/front/img/icon/quta.png"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <p className="xb-item--content">
                    "Choosing Innomax was a great decision. Their focus on
                    trends helped us rank for competitive keywords, our
                    success!"
                  </p>
                  <div className="xb-item--holder ul_li">
                    <div className="xb-item--avatar">
                      <img
                        src="assets/front/img/testimonial/sa-tas02.png"
                        alt="Expert Code Lab Services"
                      />
                    </div>
                    <div className="xb-item--author">
                      <h3 className="xb-item--name">Robert Miller</h3>
                      <span className="xb-item--desig">
                        Marketing Dir. at BUSD
                      </span>
                      <div className="xb-item--logo">
                        <img
                          src="assets/front/img/testimonial/tes-logo03.png"
                          alt="Expert Code Lab Services"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="sa-testimonial-item">
                <div className="xb-item--inner">
                  <div className="xb-item--quta">
                    <img
                      src="assets/front/img/icon/quta.png"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <p className="xb-item--content">
                    "Since partnering with Innomax, our website's performance
                    has improved remarkably. Their data-driven approach and
                    top-notch!"
                  </p>
                  <div className="xb-item--holder ul_li">
                    <div className="xb-item--avatar">
                      <img
                        src="assets/front/img/testimonial/sa-tas03.png"
                        alt="Expert Code Lab Services"
                      />
                    </div>
                    <div className="xb-item--author">
                      <h3 className="xb-item--name">Jessica Martinez</h3>
                      <span className="xb-item--desig">
                        Project Manager at Kuda
                      </span>
                      <div className="xb-item--logo">
                        <img
                          src="assets/front/img/testimonial/tes-logo04.png"
                          alt="Expert Code Lab Services"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="sa-testimonial-item">
                <div className="xb-item--inner">
                  <div className="xb-item--quta">
                    <img
                      src="assets/front/img/icon/quta.png"
                      alt="Expert Code Lab Services"
                    />
                  </div>
                  <p className="xb-item--content">
                    "Thanks to Innomax, our organic search traffic has
                    skyrocketed! Their comprehensive SEO solutions are and
                    customized."
                  </p>
                  <div className="xb-item--holder ul_li">
                    <div className="xb-item--avatar">
                      <img
                        src="assets/front/img/testimonial/sa-tas04.png"
                        alt="Expert Code Lab Services"
                      />
                    </div>
                    <div className="xb-item--author">
                      <h3 className="xb-item--name">Kevin Johnson</h3>
                      <span className="xb-item--desig">Social Coordinator</span>
                      <div className="xb-item--logo">
                        <img
                          src="assets/front/img/testimonial/tes-logo05.png"
                          alt="Expert Code Lab Services"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial section end  */}
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
                  alt="Expert Code Lab Services"
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

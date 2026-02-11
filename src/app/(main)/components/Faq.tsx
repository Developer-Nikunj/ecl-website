"use client";

import { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container">
      

      <div className="row">
        <div className="col-lg-12">
          <div className="xb-faq">
            <ul className="accordion_box list-unstyled">
              <li
                className={`accordion block ${activeIndex === 0 ? "active-block" : ""}`}
              >
                <div
                  className={`acc-btn ${activeIndex === 0 ? "active" : ""}`}
                  onClick={() => toggleFaq(0)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="number">01</span>
                  _ How long does it take to get results from SEO?
                  <span className="arrow" />
                </div>

                {activeIndex === 0 && (
                  <div className="acc_body current">
                    <div className="content">
                      <p>
                        On average, our clients start to see initial results
                        from SEO in 4-6 months. But heads up: If the niche is
                        very competitive, it can take up to 1-2 years. Every
                        website and strategy is different so the timeline will
                        depend on a number of factors. Like:
                      </p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="far fa-check" />
                          The age and authority of your site.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Your on-page and off-page optimization.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Any penalties pulling your ranking down.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li
                className={`accordion block ${activeIndex === 1 ? "active-block" : ""}`}
              >
                <div
                  className={`acc-btn ${activeIndex === 1 ? "active" : ""}`}
                  onClick={() => toggleFaq(1)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="number">02</span>
                  _What SEO strategies do you implement for optimal results?
                  <span className="arrow" />
                </div>

                {activeIndex === 1 && (
                  <div className="acc_body current">
                    <div className="content">
                      <p>
                        On average, our clients start to see initial results
                        from SEO in 4-6 months. But heads up: If the niche is
                        very competitive, it can take up to 1-2 years. Every
                        website and strategy is different so the timeline will
                        depend on a number of factors. Like:
                      </p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="far fa-check" />
                          The age and authority of your site.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Your on-page and off-page optimization.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Any penalties pulling your ranking down.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li
                className={`accordion block ${activeIndex === 2 ? "active-block" : ""}`}
              >
                <div
                  className={`acc-btn ${activeIndex === 2 ? "active" : ""}`}
                  onClick={() => toggleFaq(2)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="number">03</span>
                  _What part of the SEO process do you outsource?
                  <span className="arrow" />
                </div>

                {activeIndex === 2 && (
                  <div className="acc_body current">
                    <div className="content">
                      <p>
                        On average, our clients start to see initial results
                        from SEO in 4-6 months. But heads up: If the niche is
                        very competitive, it can take up to 1-2 years. Every
                        website and strategy is different so the timeline will
                        depend on a number of factors. Like:
                      </p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="far fa-check" />
                          The age and authority of your site.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Your on-page and off-page optimization.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Any penalties pulling your ranking down.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li
                className={`accordion block ${activeIndex === 3 ? "active-block" : ""}`}
              >
                <div
                  className={`acc-btn ${activeIndex === 3 ? "active" : ""}`}
                  onClick={() => toggleFaq(3)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="number">04</span>
                  _Can you handle SEO for an enterprise-size company?
                  <span className="arrow" />
                </div>

                {activeIndex === 3 && (
                  <div className="acc_body current">
                    <div className="content">
                      <p>
                        On average, our clients start to see initial results
                        from SEO in 4-6 months. But heads up: If the niche is
                        very competitive, it can take up to 1-2 years. Every
                        website and strategy is different so the timeline will
                        depend on a number of factors. Like:
                      </p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="far fa-check" />
                          The age and authority of your site.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Your on-page and off-page optimization.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Any penalties pulling your ranking down.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li
                className={`accordion block ${activeIndex === 4 ? "active-block" : ""}`}
              >
                <div
                  className={`acc-btn ${activeIndex === 4 ? "active" : ""}`}
                  onClick={() => toggleFaq(4)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="number">05</span>
                  _ Do you offer professional link-building services?
                  <span className="arrow" />
                </div>

                {activeIndex === 4 && (
                  <div className="acc_body current">
                    <div className="content">
                      <p>
                        On average, our clients start to see initial results
                        from SEO in 4-6 months. But heads up: If the niche is
                        very competitive, it can take up to 1-2 years. Every
                        website and strategy is different so the timeline will
                        depend on a number of factors. Like:
                      </p>
                      <ul className="list-unstyled">
                        <li>
                          <i className="far fa-check" />
                          The age and authority of your site.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Your on-page and off-page optimization.
                        </li>
                        <li>
                          <i className="far fa-check" />
                          Any penalties pulling your ranking down.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

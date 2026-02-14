import { error } from "console";
import Image from "next/image";

export const getJobDetail = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/career/${id}`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  console.log("data", data);
  return data.data;
};
export default async function Home({ params }) {
  const { slug } = await params;
  const data = await getJobDetail(slug);
  return (
    <main>
      {/* hero section start  */}
      <section className="py-5 bg-white text-dark">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            {/* LEFT — Job Details */}
            <div className="col-lg-7">
              <h1 className="display-5 fw-bold mb-3">{data.title}</h1>

              {/* Job Meta */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <span className="badge bg-warning text-dark px-3 py-2">
                  {data.type}
                </span>

                <span className="badge bg-secondary px-3 py-2">
                  {data.location}
                </span>

                <span className="badge bg-info text-dark px-3 py-2">
                  {data.category}
                </span>
              </div>

              {/* Description */}
              <p className="lead text-dark">{data.description}</p>

              {/* Highlights */}
              <ul className="list-unstyled fs-5 mt-4">
                <li className="mb-2">✔ Work with global clients</li>
                <li className="mb-2">✔ High-impact growth projects</li>
                <li className="mb-2">✔ Fully remote flexibility</li>
              </ul>

              {/* Buttons */}
              <div className="mt-4 d-flex gap-3">
                <a
                  href={`mailto:expertcodelab@gmail.com?subject=Job Application for ${data.title} , ${data.type} &body=Hello,%20I%20would%20like%20to%20apply%20for%20this%20position.`}
                  className="btn btn-warning btn-lg fw-semibold"
                >
                  Apply Now
                </a>

                {/* <button className="btn btn-outline-dark btn-lg">
                  Save Job
                </button> */}
              </div>
            </div>

            {/* RIGHT — Image */}
            <div className="col-lg-5 text-center">
              <img
                src="/assets/front/img/hero/hero-img02.png"
                alt="Job Illustration"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      {/* faq section end  */}
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

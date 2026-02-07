import Link from "next/link";

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

const Services = async() => {

    const data = await getServices();
    // console.log("data",data.data)
  return (
    <>
      <section className="service pt-140 pb-140">
        <div className="container">
          <div className="row mt-none-30">
            <div className="col-lg-4 mt-30">
              <div className="service-info">
                <div className="sec-title--two">
                  <span
                    className="sub-title wow fadeInDown"
                    data-wow-duration="600ms"
                  >
                    <img
                      src="assets/front/img/icon/ser-01.svg"
                      alt="Expert Code Lab"
                    />
                    Feature-services
                  </span>
                  <h2
                    className="title wow skewIn"
                    data-wow-delay="100ms"
                    data-wow-duration="600ms"
                  >
                    Growth with <br /> SEO services
                  </h2>
                  <p
                    className="content wow fadeInUp"
                    data-wow-delay="300ms"
                    data-wow-duration="600ms"
                  >
                    SEO services boost visibility and organic traffic, driving
                    leads and growth.
                  </p>
                </div>
                <div
                  className="xb-btn mt-50 wow fadeInUp"
                  data-wow-delay="450ms"
                  data-wow-duration="600ms"
                >
                  <Link
                    href="/services"
                    className="thm-btn thm-btn--aso thm-btn--aso_yellow"
                  >
                    View more services
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 mt-30">
              <div className="row mt-30">
                {data.data.map((i) => (
                  <div className="col-12 col-md-6 d-flex" key={i.id}>
                    <div className="service-box w-100">
                      <div className="service-item h-100 d-flex flex-column justify-content-between">
                        <div className="xb-item--holder mb-85">
                          <h3 className="xb-item--title">{i.name}</h3>
                          <span className="xb-item--contact d-block text-truncate">
                            {i.description}
                          </span>
                        </div>

                        <div className="xb-item--icon d-flex justify-content-between align-items-center">
                          <div className="xb-item--img">
                            <img src={i.image} alt={i.name} />
                          </div>

                          <Link
                            href={`/service-one/${i.id}`}
                            className="xb-item--arrow"
                          >
                            <img
                              src="assets/front/img/icon/arrow-black.svg"
                              alt="Arrow"
                            />
                          </Link>
                        </div>
                      </div>

                      <Link
                        href={`/service-one/${i.id}`}
                        className="xb-overlay"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

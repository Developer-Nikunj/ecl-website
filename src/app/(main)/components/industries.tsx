import React from 'react'
import Link from 'next/link';

export const getData = async()=>{
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/industries`,
          {
            cache: "no-store",
          },
        );
        if(!response.ok){
            return null;
        }
        const data = response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}

const Industries = async() => {

    const data = await getData();
    console.log("data",data.data);
  return (
    <>
      <div className="industrie-wrap sec-bg pos-rel pt-130 pb-130">
        <div className="container">
          <div className="sec-title--two text-center mb-30">
            <div className="sub-title wow fadeInDown" data-wow-duration="600ms">
              <img
                src="assets/front/img/icon/building.svg"
                alt="Expert Code Lab"
              />
              Industries we work
            </div>
            <h2
              className="title wow fadeInDown"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
              Serving diverse industries
            </h2>
          </div>
          <div className="row row-cols-xl-5 row-cols-md-3 row-cols-sm-2 row-cols-2">
            {data.data.map((i) => (
              <div key={i.id} className="col">
                <div
                  className="indus-item wow fadeInUp"
                  data-wow-duration="600ms"
                >
                  <div className="xb-img">
                    <img src={i.img} alt={i.name} />
                  </div>
                  <h3 className="xb-title">{i.name}</h3>
                </div>
              </div>
            ))}
            {/* <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img02.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Lawyers</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="300ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img03.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Real estate</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="450ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img04.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Insurance</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="600ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img05.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Crypto</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img06.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Private equity</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img07.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Education</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="300ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img08.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Finance</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="450ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img09.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Healthcare</h3>
              </div>
            </div>
            <div className="col">
              <div
                className="indus-item wow fadeInUp"
                data-wow-delay="600ms"
                data-wow-duration="600ms"
              >
                <div className="xb-img">
                  <img
                    src="assets/front/img/industrie/img10.png"
                    alt="Expert Code Lab"
                  />
                </div>
                <h3 className="xb-title">Automotive</h3>
              </div>
            </div> */}
          </div>
          <div className="xb-btn text-center mt-60">
            <Link href="/contact" className="thm-btn thm-btn--aso">
              Book a free consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Industries

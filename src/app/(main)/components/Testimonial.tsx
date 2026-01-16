"use client";
import React,{useState,useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import axios from "axios";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "CEO, Company A",
    message:
      "This service exceeded all our expectations. Truly a professional team!",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    role: "Developer, Company B",
    message:
      "Working with this company was seamless. They understood our needs perfectly.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Alice Johnson",
    role: "Designer, Company C",
    message:
      "A premium experience! Every step of the process was smooth and delightful.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Michael Brown",
    role: "Product Manager, Company D",
    message:
      "Fantastic communication and delivery. I highly recommend their services!",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    name: "Emily Davis",
    role: "Marketing Head, Company E",
    message:
      "They understood our brand perfectly and delivered beyond our expectations.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "David Wilson",
    role: "CTO, Company F",
    message:
      "The team is highly skilled, responsive, and professional. Great experience!",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
  {
    name: "Sophia Taylor",
    role: "UX Designer, Company G",
    message:
      "Creative solutions and excellent execution. I would work with them again!",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
];

const Testimonials = () => {

  const [data,setData] = useState([]);

  const fetchTestimonial = async()=>{
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/testimonial`
      );
      // console.log("res",res);
      setData(res.data.data);
    } catch (error) {
      console.error("testimonial error:", error);
    } finally {
    }
  }

  useEffect(()=>{
    fetchTestimonial();
  },[])
  return (
    <section className="testimonial py-5 bg-light">
      <div className="container">
        {/* Top Section */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center mb-2 text-primary fw-semibold">
            <img
              src="/assets/front/img/icon/like-icon.svg"
              alt="Expert Code Lab"
              className="me-2"
              style={{ width: "24px" }}
            />
            99% positive feedback
          </div>
          <h2 className="fw-bold display-5">Feedback That Speaks</h2>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="coverflow"
          grabCursor={true}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="card border-0 shadow-lg rounded-4 text-center p-4 mx-2">
                <div className="avatar mx-auto mb-3">
                  <img
                    src={`${t.img}`}
                    alt={t.name || "image"}
                    className="rounded-circle border border-primary"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p className="fst-italic text-secondary mb-3">
                  &quot;{t.description}&quot;
                </p>
                <h5 className="fw-bold text-dark mb-1">{t.name}</h5>
                <small className="text-primary">
                  {new Date(t?.createdAt).getFullYear()}
                </small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

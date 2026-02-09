import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";
import Link from "next/link";
import { relativeTimeRounding } from '../../../../public/assets/backend/libs/moment/moment';


export const getAllEmployees = cache(async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/common/employee/get-all`,{cache:"no-store"});

    if(!res.ok) return null;
    return res.json();
})



export default async function TeamPage() {
  const teamMembers = await getAllEmployees();

  console.log("teamMembers", teamMembers.data);

  return (
    <section className="team-page section-padding">
      <div className="container">
        {/* Page Header */}
        <div className="row mb-60">
          <div className="col-12 text-center">
            <h2 className="xb-section-title">Our Team</h2>
            <p className="xb-section-subtitle">
              Meet the people who make everything possible
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="row">
          {teamMembers.data.map((member) => (
            <div className="col-lg-6 col-6 col-sm-12 mt-30" key={member.id}>
              <div className="service-all_item team-card">
                <div className="service-box text-center">
                  <div className="service-item">
                    {/* Image */}
                    <div className="xb-item--img mb-20">
                      <img
                        src={member.employeeImg}
                        alt={member.employeeName}
                        className="img-fluid rounded-circle"
                      />
                    </div>

                    {/* Content */}
                    <div className="xb-item--holder">
                      <h4 className="xb-item--title">{member.employeeName}</h4>
                      <span className="xb-item--role">{member.Designation} ({member.Experience} years of Experience)</span>
                      <p className="xb-item--contact">{member.relativeTimeRounding}</p>
                    </div>

                    {/* Socials */}
                    <div className="xb-team-social ul_li_center mt-15">
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-github"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

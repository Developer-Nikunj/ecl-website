"use client";

import { useState } from "react";

const steps = [
  {
    title: "Send your CV",
    content:
      "Apply for a position by sending us your CV or providing a link to your LinkedIn profile, and take the first step toward joining our team.",
  },
  {
    title: "Initial screening results?",
    content:
      "Our recruiter will get back to you if your resume meets our requirements in order to introduce you to the role.",
  },
  {
    title: "Job interview",
    content:
      "You will meet a few of your potential colleagues to talk about your skills, background, and expectations in detail.",
  },
  {
    title: "Test task",
    content:
      "If needed, we’ll arrange a small test task. Depending on the project and role, this may be followed by a client interview.",
  },
  {
    title: "You’re hired!",
    content:
      "By deciding we are a good match for each other, we’ll agree the terms of you starting your career at ECL.",
  },
];

export default function HiringProcess() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ul className="accordion_box clearfix list-unstyled">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`accordion block ${
            activeIndex === index ? "active-block" : ""
          }`}
        >
          <div
            className={`acc-btn ${activeIndex === index ? "active" : ""}`}
            onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
            style={{ cursor: "pointer" }}
          >
            <span className="number">
              {String(index + 1).padStart(2, "0")}-
            </span>
            {step.title}
            <span className="arrow" />
          </div>

          <div
            className={`acc_body ${activeIndex === index ? "current" : ""}`}
            style={{
              display: activeIndex === index ? "block" : "none",
            }}
          >
            <div className="content">
              <p>{step.content}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyUser } from "@/store/slices/module1/auth/auth.thunk";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async () => {
   if (!password || !confirmPassword) {
     toast.warn("All fields required");
     return;
   }

   if (password.length < 6) {
     toast.warn("Password must be at least 6 characters");
     return;
   }

   if (password !== confirmPassword) {
     toast.warn("Passwords do not match");
     return;
   }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/new-password`,
        { email, password }
      );
      if (res.data.status == 0) {
        toast.warn(res.data.message);
        return;
      }
      router.replace("/signin");
    } catch (error) {
      console.error("SignIn failed", error);
    }
  };

  return (
    <div>
      <>
        {/* App favicon */}
        <link rel="shortcut icon" href="assets/backend/images/favicon.ico" />
        {/* Layout config Js */}
        {/* Bootstrap Css */}
        <link
          href="assets/backend/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* Icons Css */}
        <link
          href="assets/backend/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* App Css*/}
        <link
          href="assets/backend/css/app.min.css"
          rel="stylesheet"
          type="text/css"
        />
        {/* custom Css*/}
        <link
          href="assets/backend/css/custom.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <div className="auth-page-wrapper pt-5">
          {/* auth page bg */}
          <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
            <div className="bg-overlay" />
            <div className="shape">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1440 120"
              >
                <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
              </svg>
            </div>
          </div>
          {/* auth page content */}
          <div className="auth-page-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center mt-sm-5 mb-4 text-white-50">
                    <div>
                      <a href="index.html" className="d-inline-block auth-logo">
                        <img
                          src="assets/backend/images/logo-ecl.png"
                          alt="logo-ecl"
                          height={60}
                        />
                      </a>
                    </div>
                    <p className="mt-3 fs-15 fw-medium">
                      {/* Premium Admin &amp; Dashboard Template */}
                    </p>
                  </div>
                </div>
              </div>
              {/* end row */}
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                  <div className="card mt-4">
                    <div className="card-body p-4">
                      <div className="mb-4">
                        <div className="avatar-lg mx-auto">
                          <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                            <i className="ri-mail-line" />
                          </div>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <div className="text-muted text-center mb-4 mx-lg-3">
                          <h4 className="">Make New Password</h4>
                          <p>
                            <span className="fw-semibold">{email}</span>
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="mb-3">
                            <input
                              type="password"
                              className="form-control form-control-lg bg-light"
                              placeholder="Enter new password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control form-control-lg bg-light"
                              placeholder="Confirm password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>

                          <button
                            className="btn btn-success w-100"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>

                        {/* end form */}
                      </div>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Didn't receive a code ?{" "}
                      <a
                        href="auth-pass-reset-basic.html"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        Resend
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* end row */}
            </div>
            {/* end container */}
          </div>
          {/* end auth page content */}
          {/* footer */}
          <footer className="footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      © Expert code lab. Crafted with{" "}
                      <i className="mdi mdi-heart text-danger" /> by Expert code
                      lab
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          {/* end Footer */}
        </div>
        {/* end auth-page-wrapper */}
        {/* JAVASCRIPT */}
        {/* particles js */}
        {/* particles app js */}

        <Script
          src="/assets/backend/js/pages/particles.app.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log("particles app loaded");
          }}
        />

        {/* two-step-verification js */}
      </>
    </div>
  );
};

export default page;

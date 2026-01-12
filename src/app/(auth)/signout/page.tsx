"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logoutUser,
  registerUser,
} from "@/store/slices/module1/auth/auth.thunk";
import { toast } from "react-toastify";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    console.log("called");
    await dispatch(logoutUser()).unwrap();
    router.replace("/signin");
  };
  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title>
          Sign Up | Expert code lab - Admin &amp; Dashboard Template
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          content="Premium Multipurpose Admin & Dashboard Template"
          name="description"
        />
        <meta content="Expert code lab" name="author" />
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
                          src="assets/backend/images/logo-light.png"
                          alt=""
                          height={20}
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
                      <div className="text-center mt-2">
                        <h5 className="text-primary">SignOut From Account</h5>
                        <p className="text-muted">
                          {/* Get your free Expert code lab account now */}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="dropdown-item d-flex align-items-center text-danger"
                        onClick={handleSubmit}
                      >
                        <i className="mdi mdi-logout fs-16 me-2" />
                        Logout
                      </button>
                    </div>
                    {/* end card body */}
                  </div>
                  {/* end card */}
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
        {/* validation init */}
        {/* password create init */}
      </>
    </div>
  );
};

export default Page;

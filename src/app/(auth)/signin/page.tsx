"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/module1/auth/auth.thunk";
import { toast } from "react-toastify";
import Link from "next/link";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      router.replace("/dev"); // ✅ redirect after login
    } catch (err) {
      console.error("SignIn failed", err);
    }
  };
  return (
    <>
      <meta charSet="utf-8" />
      <title>Sign In | Velzon - Admin &amp; Dashboard Template</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        content="Premium Multipurpose Admin & Dashboard Template"
        name="description"
      />
      <meta content="Themesbrand" name="author" />
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
                    <Link href="/dev" className="d-inline-block auth-logo">
                      <img
                        src="/assets/backend/images/logo-light.png"
                        alt="Logo"
                        height={20}
                      />
                    </Link>
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
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Expert code Lab.
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="float-end">
                            <a
                              href="auth-pass-reset-basic.html"
                              className="text-muted"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              type="password"
                              className="form-control pe-5 password-input"
                              placeholder="Enter password"
                              id="password-input"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle" />
                            </button>
                          </div>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultValue=""
                            id="auth-remember-check"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign In
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary btn-icon waves-effect waves-light"
                            >
                              <i className="ri-facebook-fill fs-16" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-icon waves-effect waves-light"
                            >
                              <i className="ri-google-fill fs-16" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-dark btn-icon waves-effect waves-light"
                            >
                              <i className="ri-github-fill fs-16" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-info btn-icon waves-effect waves-light"
                            >
                              <i className="ri-twitter-fill fs-16" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* end card body */}
                </div>
                {/* end card */}
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account ?{" "}
                    <a
                      href="/signup"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signup{" "}
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
      {/* password-addon init */}
      <Script
        src="/assets/backend/js/particles.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/assets/backend/js/particles.app.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default Page;

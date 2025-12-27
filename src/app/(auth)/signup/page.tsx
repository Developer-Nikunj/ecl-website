import React from 'react'

const page = () => {
  return (
    <div>
      <>
        <meta charSet="utf-8" />
        <title>Sign Up | Expert code lab - Admin &amp; Dashboard Template</title>
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
        <link href="assets/backend/css/app.min.css" rel="stylesheet" type="text/css" />
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
                        <h5 className="text-primary">Create New Account</h5>
                        <p className="text-muted">
                          {/* Get your free Expert code lab account now */}
                        </p>
                      </div>
                      <div className="p-2 mt-4">
                        <form
                          className="needs-validation"
                          noValidate=""
                          action="index.html"
                        >
                          <div className="mb-3">
                            <label htmlFor="useremail" className="form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="useremail"
                              placeholder="Enter email address"
                              required=""
                            />
                            <div className="invalid-feedback">
                              Please enter email
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                              Username <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Enter username"
                              required=""
                            />
                            <div className="invalid-feedback">
                              Please enter username
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="password-input"
                            >
                              Password
                            </label>
                            <div className="position-relative auth-pass-inputgroup">
                              <input
                                type="password"
                                className="form-control pe-5 password-input"
                                onpaste="return false"
                                placeholder="Enter password"
                                id="password-input"
                                aria-describedby="passwordInput"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                required=""
                              />
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                type="button"
                                id="password-addon"
                              >
                                <i className="ri-eye-fill align-middle" />
                              </button>
                              <div className="invalid-feedback">
                                Please enter password
                              </div>
                            </div>
                          </div>
                          <div className="mb-4">
                            <p className="mb-0 fs-12 text-muted fst-italic">
                              By registering you agree to the Expert code lab{" "}
                              <a
                                href="#"
                                className="text-primary text-decoration-underline fst-normal fw-medium"
                              >
                                Terms of Use
                              </a>
                            </p>
                          </div>
                          <div
                            id="password-contain"
                            className="p-3 bg-light mb-2 rounded"
                          >
                            <h5 className="fs-13">Password must contain:</h5>
                            <p id="pass-length" className="invalid fs-12 mb-2">
                              Minimum <b>8 characters</b>
                            </p>
                            <p id="pass-lower" className="invalid fs-12 mb-2">
                              At <b>lowercase</b> letter (a-z)
                            </p>
                            <p id="pass-upper" className="invalid fs-12 mb-2">
                              At least <b>uppercase</b> letter (A-Z)
                            </p>
                            <p id="pass-number" className="invalid fs-12 mb-0">
                              A least <b>number</b> (0-9)
                            </p>
                          </div>
                          <div className="mt-4">
                            <button
                              className="btn btn-success w-100"
                              type="submit"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="mt-4 text-center">
                            <div className="signin-other-title">
                              <h5 className="fs-13 mb-4 title text-muted">
                                Create account with
                              </h5>
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
                      Already have an account ?{" "}
                      <a
                        href="auth-signin-basic.html"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        {" "}
                        Signin{" "}
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
                      <i className="mdi mdi-heart text-danger" /> by Themesbrand
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
}

export default page

"use client"

import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();

    const handleSubmit = async () => {
        router.push("/login");
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
            }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div
                            className="row shadow-lg rounded-4 overflow-hidden"
                            style={{
                                backdropFilter: "blur(12px)",
                                background: "rgba(255,255,255,0.15)",
                            }}
                        >
                            {/* LEFT SECTION */}
                            <div className="col-md-6 p-5 text-white d-flex flex-column justify-content-center">
                                <h1 className="fw-bold mb-3">Join the Journey 🚀</h1>
                                <p className="opacity-75">
                                    Build skills. Ship faster. Grow every day.
                                    This platform is designed for people who want to turn
                                    effort into impact.
                                </p>

                                <p className="mt-3 fst-italic">
                                    “Consistency beats motivation.”
                                </p>

                                <button className="btn btn-outline-light mt-4 w-75">
                                    Already have an account?
                                </button>
                            </div>

                            {/* RIGHT SECTION */}
                            <div className="col-md-6 bg-white p-5">
                                <h2 className="fw-bold mb-4 text-center">Create Account</h2>

                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="nikunj kumar"
                                            required
                                        />
                                        <label>Enter Name</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            required
                                        />
                                        <label>Enter Email</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                            required
                                        />
                                        <label>Enter Password</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="password"
                                            required
                                        />
                                        <label>Confirm Password</label>
                                    </div>

                                    <button className="btn btn-primary w-100 py-2 fw-semibold" onClick={() => handleSubmit()}>
                                        Register Now
                                    </button>
                                </form>

                                <p className="text-center text-muted mt-3 small">
                                    Start your journey in less than a minute
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;

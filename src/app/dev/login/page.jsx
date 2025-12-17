"use client"
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {

    const router = useRouter();

    const handleSubmit = async () => {
        router.push("/dev/dashboard");
    };

    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background:
                    "radial-gradient(circle at top, #1b2735 0%, #090a0f 100%)",
            }}
        >
            {/* Gradient Border Wrapper */}
            <div
                style={{
                    padding: "2px",
                    borderRadius: "20px",
                    background:
                        "linear-gradient(135deg, #00c6ff, #0072ff, #00ffcc)",
                }}
            >
                {/* Glass Card */}
                <div
                    className="d-flex flex-column flex-md-row shadow-lg"
                    style={{
                        width: "900px",
                        minHeight: "420px",
                        borderRadius: "18px",
                        background: "rgba(255, 255, 255, 0.12)",
                        backdropFilter: "blur(18px)",
                        WebkitBackdropFilter: "blur(18px)",
                        overflow: "hidden",
                    }}
                >
                    {/* Left Branding */}
                    <div
                        className="w-50 d-none d-md-flex flex-column justify-content-center p-5 text-white"
                        style={{
                            background:
                                "linear-gradient(160deg, rgba(0,114,255,0.85), rgba(0,198,255,0.85))",
                        }}
                    >
                        <h2 className="fw-bold mb-2">Expert Code Lab</h2>
                        <p className="opacity-75">
                            Building scalable & modern applications
                        </p>
                    </div>

                    {/* Right Login */}
                    <div className="w-50 p-5 text-white d-flex flex-column justify-content-center">
                        <h3 className="fw-bold mb-1">Welcome Back 👋</h3>
                        <p className="text-light opacity-75 mb-4">
                            Login to continue
                        </p>

                        <input
                            type="email"
                            className="form-control mb-3 bg-transparent text-white border-light"
                            placeholder="Email address"
                        />

                        <input
                            type="password"
                            className="form-control mb-4 bg-transparent text-white border-light"
                            placeholder="Password"
                        />

                        <button
                            className="btn btn-info fw-semibold"
                            onClick={()=>handleSubmit()}
                        >
                            Login
                        </button>

                        <small className="mt-3 text-center opacity-75">
                            © 2025 Expert Code Lab
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;

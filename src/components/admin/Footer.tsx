import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer w-100 h-10"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "8px 0",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #e9ecef",
        height:"30px"
      }}
    >
      <div className="container-fluid px-0">
        <div className="row mx-0 align-items-center">
          <div className="col-12 text-center">
            <span
              style={{
                fontSize: "13px",
                color: "#6c757d",
                fontWeight: "200",
              }}
            >
              © {new Date().getFullYear()}{" "}
              <span style={{ color: "#0d6efd", fontWeight: "200" }}>
                Expert Code Lab
              </span>{" "}
              - All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

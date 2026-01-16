"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Footer() {
  const [data, setData] = useState();

  const fetchFooter = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/footer`
      );
      console.log("res", res.data.data);
      setData(res.data.data.name || "");
    } catch (error) {
      console.error("Footer error:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);
  return (
    <footer
      style={{
        background: "#f8f9fa",
        paddingTop: "250px", // top spacing you wanted
        paddingBottom: "40px",
        paddingLeft: "20px",
        paddingRight: "20px",
        color: "#000",
        borderTop: "1px solid #dee2e6",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "41px",
          overflowX: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: data || "" }}
      />
    </footer>
  );
}

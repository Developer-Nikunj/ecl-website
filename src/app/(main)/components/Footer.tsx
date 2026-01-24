"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Footer() {
  const [data, setData] = useState("");

  const fetchFooter = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/footer`,
      );
      setData(res.data.data.name || "");
    } catch (error) {
      console.error("Footer error:", error);
    } finally {}
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return (
    <footer
      className="bg-gradient-to-b from-gray-900 to-black text-white pt-60 pb-5 px-3 border-t border-gray-800"
      style={{ paddingTop: "250px" }}
    >
      <div
        className="container mx-auto px-3"
        dangerouslySetInnerHTML={{ __html: data || "" }}
      />
    </footer>
  );
}

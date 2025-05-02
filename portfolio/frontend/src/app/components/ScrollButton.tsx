import Link from "next/link";
import React from "react";

interface ScrollButtonProps {
  label: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ label }) => {
  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        bottom: "100px",
        right: "5%",
        width: "70px",
        height: "70px",
        background: "#777777",
        color: "#fff",
        display: "flex",
        borderRadius: "34% 66% 35% 65% / 64% 52% 48% 36%",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        cursor: "pointer",
        zIndex: 1000,
        textDecoration: "none",
      }}
    >
      { label }
    </Link>
  );
};

export default ScrollButton;

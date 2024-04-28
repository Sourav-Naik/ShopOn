import React from "react";
import { Link } from "react-router-dom";
export default function Title(props) {
  return (
    <Link
      to="/"
      className={`navbar-brand text-center pt-1 text-${
        props.mode === "light" ? "white" : "info"
      } fw-semibold m-0 me-1 fs-4`}
    >
      ShopOn
    </Link>
  );
}

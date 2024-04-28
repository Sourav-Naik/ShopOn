import React, { memo } from "react";

import Title from "../../Title/Title";
import { Link } from "react-router-dom";
function Navbar(props) {
  return (
    <>
      <nav
        className={`navbar navbar-expand-md p-0 mb-2 ${
          props.mode === "light" ? "bg-info" : "bg-dark"
        }`}
      >
        <div className="container-md flex flex-nowrap">
          <Title mode={props.mode} />

          {/* search bar */}
          <div className="w-75 m-1 rounded-pill bg-white ">
            <form className="d-flex" role="search">
              <input
                className="form-control rounded-start-pill border-0 p-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div
                className={`btn btn-outline-${
                  props.mode === "light" ? "info" : "dark"
                } rounded-end-pill border-0`}
                type="submit"
              >
                <i className="fa-solid fa-magnifying-glass py-1 px-0 m-0 fs-4 align-middle "></i>
              </div>
            </form>
          </div>

          {/* products */}
          <div className="d-flex flex-nowrap m-1">
            <Link
              to="/products"
              className={`btn btn-outline-light fw-bolder border-3 d-flex flex-nowrap align-items-center p-2`}
              type="submit"
            >
              <i className="fa-solid fa-bag-shopping fs-5 me-1"></i>
              <sub className="fs-6 ">Products</sub>
            </Link>
          </div>

          {/* profile */}
          <div className="d-flex flex-nowrap m-1">
            <Link
              to="/login"
              className={`btn btn-outline-light fw-bolder border-3 d-flex flex-nowrap align-items-center p-2`}
              type="submit"
            >
              <i className="fa-solid fa-user fs-5 me-1"></i>
              <sub className="fs-6 ">Login</sub>
            </Link>
          </div>

          {/* cart  */}
          <div className="d-flex flex-nowrap m-1">
            <Link
              to="/cart"
              className={`btn btn-outline-light fw-bolder border-3 d-flex flex-nowrap align-items-center p-2`}
              type="submit"
            >
              <i className="fa-solid fa-cart-arrow-down fs-5 me-1"></i>
              <sub className="fs-6">Cart</sub>
            </Link>
          </div>

          {/* darkmode toggler */}
          <span
            className={`border rounded border-3 border-light d-flex align-items-center m-1 py-1`}
          >
            <label
              className={`text-light fw-bolder px-1 py-1 lh-sm`}
              role="button"
              htmlFor="toogleSwitch"
            >
              Darkmode
            </label>
            <span className="form-switch">
              <input
                className={`form-check-input ${
                  props.mode === "dark" ? "bg-dark" : ""
                }`}
                type="checkbox"
                role="switch"
                id="toogleSwitch"
                onClick={props.toggleMode}
              />
            </span>
          </span>
        </div>
      </nav>
    </>
  );
}
export default memo(Navbar);

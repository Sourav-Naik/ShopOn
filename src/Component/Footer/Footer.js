import React from "react";

export default function Footer(props) {
  return (
    <div
      className={`container-fluid text-white border-top border-white mt-4 ${
        props.mode === "light" && "bg-info"
      } text-start p-0 mt-1`}
    >
      <div className="row pt-4 px-4 m-0">
        <div className="col-4 p-2">
          <div className="text-secondary fs-6">Registered Office Address :</div>
          <div className="lh-sm">We don't have any Registered Office.</div>
        </div>
        <div className="col-4 p-2">
          <div className="text-secondary fs-6">Group Companies :</div>
          <div className="lh-sm">No Grouped Comapnies available.</div>
        </div>
        <div className="col-4 p-2">
          <div className="text-secondary fs-6">Help :</div>
          <div className="lh-sm">
            Sorry for the inconvenience, please contact Mr.Sourav for help.
          </div>
        </div>
        <div className="col-4 p-2">
          <div className="text-secondary fs-6">Consumer Policy :</div>
          <div className="lh-sm">
            Please Read Consumer Policy before using the service.
          </div>
        </div>
        <div className="col-4 p-2">
          <div className="text-secondary fs-6">Contact Us :</div>
          <div className="lh-sm">
            <span className="semibold">E-Mail : </span>
            naiksourav66@gmail.com
          </div>
        </div>
        <div className="col-4 p-2">
          <div className="text-secondary fs-6">Social :</div>
          <div className="lh-sm fs-5">
            <i className="fa-brands fa-facebook pe-2" />
            <i className="fa-brands fa-x-twitter pe-2" />
            <i className="fa-brands fa-youtube pe-2" />
          </div>
        </div>
      </div>
      <div className="text-center fs-6 border-top p-3">
        <i className="fa-regular fa-heart"></i> This react project was created
        by{" "}
        <span className="fw-semibold">
          Sourav Naik <i className="fa-regular fa-heart"></i>
        </span>
      </div>
    </div>
  );
}

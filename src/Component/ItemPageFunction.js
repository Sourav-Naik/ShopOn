import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ItemPageFunction(props) {
  const location = useLocation();
  let progress = props.setProgress;
  useEffect(() => {
    progress(33);
    setTimeout(progress(66), 500);
    setTimeout(progress(100), 1000);
  }, [progress]);
  let item = location.state.product;
  const handelQuantity = (event) => {
    let quantity = document.getElementById("quantity").innerText;
    if (event === "decrease") {
      if (quantity > 1) {
        document.getElementById("quantity").innerText = --quantity;
      }
    } else {
      document.getElementById("quantity").innerText = ++quantity;
    }
  };
  return (
    <div style={{ cursor: "default" }}>
      <div className="row container-md mx-auto p-0">
        <div className="col p-0 bg-white border rounded-start d-flex justify-content-center p-2">
          <img
            src={item.image}
            alt={item.title}
            className="rounded-start"
            style={{
              cursor: "zoom-in",
              maxHeight: "650px",
              backgroundSize: "contain",
            }}
            onClick={(e) => {
              const lastChildClassList =
                e.target.parentNode.parentNode.parentNode.lastChild.lastChild
                  .classList;
              lastChildClassList.remove("d-none");
              lastChildClassList.add("d-flex");
            }}
          />
        </div>

        <div
          className={`col ${
            props.mode === "light" ? "bg-info" : "bg-dark"
          } rounded-end text-white rounded-end`}
        >
          <p className="fs-5 fw-semibold lh-sm mt-3">{item.title}</p>
          <hr />
          <div className="d-flex flex-nowrap align-items-center">
            <div className="d-flex flex-nowrap">
              <div className="d-flex flex-nowrap align-items-center fs-5 me-1">
                {item.rating.rate}
              </div>
              {item.rating.rate <= 1 ? (
                <div className="d-flex flex-nowrap align-items-center">
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                </div>
              ) : item.rating.rate <= 2 ? (
                <div className="d-flex flex-nowrap align-items-center">
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                </div>
              ) : item.rating.rate <= 3 ? (
                <div className="d-flex flex-nowrap align-items-center">
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                </div>
              ) : item.rating.rate <= 4 ? (
                <div className="d-flex flex-nowrap align-items-center">
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-regular fa-star fs-6" />
                </div>
              ) : (
                <div className="d-flex flex-nowrap align-items-center">
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-solid fa-star fs-6" />
                  <i className="star fa-regular fa-star-half-stroke fs-6" />
                </div>
              )}
            </div>
            <div className="d-flex flex-nowrap align-items-center fs-6 ms-2">
              Total Reviews : {item.rating.count}
            </div>
          </div>
          <hr />

          <div className="d-flex flex-nowrap align-items-center justify-content-between w-100">
            <div className="fs-5 fw-semibold lh-base m-0 badge text-bg-primary text-wrap">
              Price : ${item.price}
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex flex-nowrap d-inline-flex align-items-center m-1">
                <button
                  type="button"
                  className="fa-solid fa-minus badge text-bg-primary text-wrap px-1 py-2 d-inline-flex align-items-center"
                  onClick={(event) => handelQuantity("decrease")}
                />

                <div id="quantity" className="p-1 mx-2 fs-6 border rounded">
                  1
                </div>
                <button
                  type="button"
                  className="fa-solid fa-plus badge text-bg-primary text-wrap px-1 py-2 d-inline-flex align-items-center"
                  onClick={(event) => handelQuantity("increase")}
                />
              </div>
              <button className="btn btn-outline-light fa-solid fa-cart-plus fs-2 border-0 p-1" />
            </div>
          </div>

          <hr className="mb-1" />
          <p className="m-0 px-2 fs-5 fw-semibold text-decoration-underline">
            About Item
          </p>
          <p className="m-0 px-2" style={{ textAlign: "justify" }}>
            {item.description}
          </p>
        </div>
      </div>
      <div className="position-absolute bg-light top-0 start-0 container-fluid d-flex justify-content-center p-0 m-0 min-vw-100">
        <img
          src={item.image}
          alt={item.title}
          className="d-none min-vh-100"
          style={{ cursor: "zoom-out" }}
          onClick={(e) => {
            e.target.classList.remove("d-flex");
            e.target.classList.add("d-none");
          }}
        />
      </div>
    </div>
  );
}

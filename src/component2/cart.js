import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItems from "./cartItems";
import WishlistItem from "./wishlistItem";
import { Link } from "react-router-dom";
import "./style.css";
import { addToCart, removeFromCart } from "../redux/cart/cartReducer";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistReducer";
import { Tooltip } from "bootstrap";

export default function Cart(props) {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const [paymentMode, setpaymentMode] = useState({
    type: "Card",
    mode: "Credit",
  });
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const tooltips = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltips.forEach((tooltip) => new Tooltip(tooltip));
  }, []);

  const handleRemoveAllCart = () => {
    cartItems.map((item) => {
      dispatch(removeFromCart(item));
    });
  };

  const handleRemoveAllWishlist = () => {
    wishlistItems.map((item) => {
      dispatch(removeFromWishlist(item));
    });
  };

  const handleAddAllWishlist = () => {
    cartItems.map((item) => {
      dispatch(removeFromCart(item));
      dispatch(addToWishlist(item));
    });
  };

  const handleAddAllCart = () => {
    wishlistItems.map((item) => {
      dispatch(removeFromWishlist(item));
      dispatch(addToCart(item));
    });
  };

  const summaryStatus = () => {
    let totalItems = cartItems.length;
    let finalAmount = 0;
    let totalProfit = 0;
    let totalQuantity = 0;
    let totalAmount = 0;
    let i = 0;
    cartItems.map((item) => {
      finalAmount = item.amount + finalAmount;
      totalQuantity = totalQuantity + parseInt(item.quantity);
      totalAmount = totalAmount + item.price * item.quantity;
      totalAmount = totalAmount.toFixed(3);
      totalAmount = parseFloat(totalAmount);
      let profit =
        item.price * item.quantity - item.discountedPrice * item.quantity;
      profit = (profit * 100) / (item.price * item.quantity);
      profit = profit.toFixed(3);
      profit = parseFloat(profit);
      totalProfit = totalProfit + profit;
      profit > 0 && i++;
    });
    if (i > 0) {
      totalProfit = (totalProfit / i).toFixed(3);
    }
    let saving = (totalAmount - finalAmount).toFixed(3);
    return {
      totalItems,
      totalQuantity,
      finalAmount,
      totalProfit,
      totalAmount,
      saving,
    };
  };

  let summary = summaryStatus();
  return (
    <div className="container-xl align-self-start px-4 min-vh-60 d-flex flex-column justify-content-between">
      <div id="CartBox" className=" position-relative">
        {/* cart nav */}
        <div className={`bg-transparent`}>
          <ul
            className={`nav nav-tabs rounded-start  ${
              props.mode === "light" && "border-info"
            }`}
          >
            <li className="nav-item">
              <span
                className={`nav-link active fw-semibold px-4 ${
                  props.mode === "light" && "bg-info border-info"
                }`}
                aria-current="page"
              >
                My Cart
              </span>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link cat-nav-btn ${
                  props.mode === "light"
                    ? "text-dark border-info"
                    : "text-light border-light"
                } `}
                onClick={handleAddAllWishlist}
              >
                Add all to Wishlist
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link cat-nav-btn ${
                  props.mode === "light"
                    ? "text-dark border-info"
                    : "text-light border-light"
                } `}
                onClick={handleRemoveAllCart}
              >
                Remove All
              </button>
            </li>
          </ul>
        </div>
        {/* cart items */}
        <div
          className={`border border-top-0 position-relative z-1
        ${props.mode === "light" ? "text-dark border-info" : "text-light"}`}
          id="cartItems"
        >
          {/* empty cart */}
          {cartItems.length <= 0 ? (
            <div className="py-5 d-flex fs-5 align-items-center w-100 justify-content-center">
              <span>Currently no item in Cart.....</span>
              <Link
                to="/"
                className="ms-3 btn btn-outline-info fs-5 fw-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-start">
              {/* cartItems */}
              <div className="col-6 col-lg-8">
                <div className="p-3">
                  <div
                    className={`border rounded-4 pt-3 ${
                      props.mode === "light" && "border-info"
                    }`}
                  >
                    {cartItems.map((item) => {
                      let last =
                        Array.isArray(cartItems) &&
                        cartItems.indexOf(item) === cartItems.length - 1;

                      return (
                        <CartItems
                          key={`cart${item.id}`}
                          mode={props.mode}
                          item={item}
                          last={last}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* checkout */}
              <div className="col-6 col-lg-4">
                <div className="w-100 p-3 flex flex-col">
                  <div className="d-flex flex-column bg-dark bg-gradient text-white rounded-4">
                    <div className="bg-dark bg-gradient fs-4 rounded-top-4 p-3 border-bottom border-secondary border-2">
                      Summary
                    </div>
                    <div className="p-3 fs-5">
                      <div>Total Articles - {summary.totalItems}</div>
                      <div>Total Quantity - {summary.totalQuantity}</div>
                      <div>Total Amount - ${summary.totalAmount}</div>
                      <div>Final Amount - ${summary.finalAmount}</div>
                      <div>
                        Total Saving - ${summary.saving}{" "}
                        <span className="text-secondary">
                          ({summary.totalProfit}%)
                        </span>
                      </div>
                      <hr />
                      <div>
                        Delivery Charges -$
                        {paymentMode.type === "COD"
                          ? summary.finalAmount * 0.025
                          : "0.00"}
                      </div>
                      <div>
                        Payable Amount -$
                        {paymentMode.type === "COD"
                          ? (
                              summary.finalAmount +
                              summary.finalAmount * 0.025
                            ).toFixed(3)
                          : summary.finalAmount}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-column bg-dark bg-gradient text-white rounded-4  mt-4">
                    <div className="bg-dark bg-gradient fs-4 rounded-top-4 p-3 border-bottom border-secondary border-2">
                      Payment mode
                    </div>

                    <div className="px-3 py-2 fs-5 flex border-bottom border-secondary border-2">
                      <button
                        type="button"
                        className="btn btn-secondary p-0 me-2 px-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="Use Credit Card"
                        onClick={() =>
                          setpaymentMode({ type: "Card", mode: "Credit" })
                        }
                      >
                        <i className="fa-regular fa-credit-card"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary p-0 me-2 px-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="Use Master Card"
                        onClick={() =>
                          setpaymentMode({ type: "Card", mode: "Master" })
                        }
                      >
                        <i className="fa-brands fa-cc-mastercard"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary p-0 me-2 px-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="Use Paypal"
                        onClick={() =>
                          setpaymentMode({ type: "Online", mode: "Paypal" })
                        }
                      >
                        <i className="fa-brands fa-paypal"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary p-0 me-2 px-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="Use GooglePay"
                        onClick={() =>
                          setpaymentMode({ type: "Online", mode: "Google Pay" })
                        }
                      >
                        <i className="fa-brands fa-google-pay"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary p-0 me-2 px-1"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="Cash On Delivery"
                        onClick={() =>
                          setpaymentMode({ type: "COD", mode: "By Cash" })
                        }
                      >
                        <i className="fa-regular fa-money-bill-1"></i>
                      </button>
                    </div>

                    <div>
                      {paymentMode.type === "Card" && (
                        <div className="p-2 border-bottom border-secondary border-2">
                          <div className="ms-1 ps-1 fs-5 lh-1 mb-1 pb-1">
                            Enter {paymentMode.type} Details
                          </div>
                          <div className="ms-1 d-flex align-items-center">
                            <label
                              htmlFor="user"
                              className="ms-1 d-flex align-items-center"
                            >
                              <i className="fa-solid fa-user me-1"></i>
                              <span className="d-none d-xl-inline  me-3">
                                Name*
                              </span>
                            </label>
                            <input
                              type="text"
                              id="user"
                              className="rounded bg-transparent text-white border-white mx-1 mt-1 w-100 px-1"
                              style={{ outline: "none" }}
                              placeholder={`${paymentMode.mode} Card Holder*`}
                            />
                          </div>
                          <div className="ms-1 d-flex align-items-center">
                            <label
                              htmlFor="number"
                              className="d-flex align-items-center"
                            >
                              <i className="fa-solid fa-credit-card me-1"></i>
                              <span className="d-none d-xl-inline">
                                Number*
                              </span>
                            </label>
                            <input
                              type="text"
                              id="number"
                              className="rounded bg-transparent text-white border-white mx-1 mt-1 w-100 px-1"
                              style={{ outline: "none" }}
                              placeholder={`${paymentMode.mode} Card Number*`}
                            />
                          </div>
                          <div className="d-flex mt-1 align-items-center">
                            <label
                              htmlFor="date"
                              className="d-flex align-items-center ms-1 me-2 ps-1 pe-2 d-none d-xl-inline"
                            >
                              Exp. Date*
                            </label>
                            <div className="ms-4 ps-2 mt-1 d-flex d-xl-none"></div>
                            <input
                              type="date"
                              className="rounded bg-transparent text-white border-white ps-1"
                              style={{ outline: "none" }}
                              placeholder="Expiry Date*"
                            />
                            <label
                              htmlFor="cvv"
                              className="d-none d-xxl-inline ms-4 lh-1"
                            >
                              CVV*
                            </label>
                            <input
                              id="cvv"
                              type="password"
                              className="rounded bg-transparent text-white border-white mx-2"
                              style={{ outline: "none", maxWidth: "45px" }}
                              placeholder="CVV*"
                            />
                          </div>
                        </div>
                      )}
                      {paymentMode.type === "Online" && (
                        <div className="relative">
                          <div className="fs-5 lh-1 ps-3 pt-2">
                            Enter{" "}
                            {paymentMode.mode === "Google Pay"
                              ? "G-Pay"
                              : "Paypal"}{" "}
                            Details
                          </div>
                          <div className="px-3 d-flex flex-wrap align-items-center border-bottom border-2 border-secondary pb-3">
                            <input
                              type="text"
                              className="rounded bg-transparent text-white border-white px-1 me-2 mt-3"
                              style={{ minWidth: "220px" }}
                              placeholder={`${
                                paymentMode.mode === "Google Pay"
                                  ? "Enter G-Pay Number or Id*"
                                  : "Enter Paypal Number Or Id*"
                              }`}
                              onChange={(e) => {
                                const trimmedValue = e.target.value.trim();
                                if (
                                  trimmedValue !== "" &&
                                  trimmedValue.length > 9
                                ) {
                                  e.target.nextElementSibling.disabled = false;
                                } else {
                                  e.target.nextElementSibling.disabled = true;
                                }
                              }}
                            />
                            <button
                              className="btn btn-success lh-1 mt-3"
                              onClick={(e) => {
                                const trimmedValue =
                                  e.target.previousSibling.value.trim(); // Trim spaces
                                if (
                                  trimmedValue === "" ||
                                  trimmedValue.length < 9
                                ) {
                                  e.target.disabled = true;
                                } else {
                                  console.log(trimmedValue);
                                }
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                      {paymentMode.type === "COD" && (
                        <div className="p-3">
                          Due to handling costs extra $
                          <strong> {summary.finalAmount * 0.025} </strong>will
                          be added to delievery charges.
                        </div>
                      )}
                    </div>

                    <div className="d-flex flex-wrap align-items-end p-2 justify-content-end justify-content-xl-between">
                      <Link className="btn btn-secondary m-1" to="/">
                        <i className="fa-solid fa-arrow-left" /> Continue
                        Shopping
                      </Link>
                      <button
                        className="btn btn-secondary m-1"
                        onClick={() => {
                          setCheckout(true);
                        }}
                      >
                        Checkout <i className="fa-solid fa-arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {checkout === true && (
                <div id="checkout" className="cus-bg">
                  <div
                    className={`text-capitalize text-center fs-4 fw-medium text-white bg-secondary p-5 rounded-4`}
                  >
                    sorry for the inconvenience, currently we have no active
                    store, your order can not be placed.
                    <br />
                    <button
                      className="mt-4 btn btn-outline-light fs-4 border-3 fw-medium"
                      onClick={() => setCheckout(false)}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div id="wishlistbox">
        {/* wishlist nav */}
        <div className={`bg-transparent mt-4`}>
          <ul
            className={`nav nav-tabs rounded-start  ${
              props.mode === "light" && "border-info"
            }`}
          >
            <li className="nav-item">
              <span
                className={`nav-link active fw-semibold px-4 ${
                  props.mode === "light" && "bg-info border-info"
                }`}
                aria-current="page"
              >
                Wishlist
              </span>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link cat-nav-btn ${
                  props.mode === "light"
                    ? "text-dark border-info"
                    : "text-light border-light"
                } `}
                onClick={handleAddAllCart}
              >
                Add all to Cart
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link cat-nav-btn ${
                  props.mode === "light"
                    ? "text-dark border-info"
                    : "text-light border-light"
                } `}
                onClick={handleRemoveAllWishlist}
              >
                Remove All
              </button>
            </li>
          </ul>
        </div>

        <div
          className={`border border-top-0  position-relative z-1
      ${props.mode === "light" ? "text-dark border-info" : "text-light"}`}
          id="wishlist"
        >
          {wishlistItems.length <= 0 ? (
            <div className="py-5 d-flex fs-5 align-items-center w-100 justify-content-center border-2">
              <span>Currently no item in Whislist.....</span>
              <Link
                to="/"
                className="ms-3 btn btn-outline-info fs-5 fw-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="w-100 d-flex flex-wrap">
              {wishlistItems.map((item) => {
                return <WishlistItem key={`wish${item.id}`} element={item} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

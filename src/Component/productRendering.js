import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./rating";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cart/cartReducer";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistReducer";

export default function WishlistItem(props) {
  const dispatch = useDispatch();

  let { element } = props;
  if (!element.quantity) {
    element = {
      ...element,
      discountedPrice: Math.floor(element.price),
      quantity: 1,
      amount: Math.floor(element.price),
    };
  }
  const [state, setState] = useState(1);
  const [amount, setAmount] = useState(element.amount);
  const [quantity, setQuantity] = useState(element.quantity);

  const handelAddToWishlist = () => {
    dispatch(removeFromWishlist(element));
    dispatch(removeFromCart(element));
    dispatch(addToWishlist(element));
  };

  const handelAddToCart = () => {
    dispatch(removeFromWishlist(element));
    dispatch(removeFromCart(element));
    const updatedElement = {
      ...element,
      quantity: quantity,
      amount: amount,
    };
    dispatch(addToCart(updatedElement));
  };

  const changeQuantity = (action) => {
    action === "increase"
      ? setQuantity(quantity + 1)
      : quantity > 1 && setQuantity(quantity - 1);
    action === "increase"
      ? setAmount(Math.ceil(element.discountedPrice * (quantity + 1)))
      : quantity > 1 &&
        setAmount(Math.ceil(element.discountedPrice * (quantity - 1)));
    setState(state);
  };

  return (
    <div key={element.id} className={`col-lg-2 col-3 p-0`}>
      <div className={`p-2 h-100`}>
        <div
          className={`d-flex flex-column justify-content-evenly border rounded p-2 h-100 bg-white text-dark`}
        >
          <Link
            to="/ItemPageFunction"
            state={{ product: element }}
            className="h-100 d-flex"
          >
            <img
              src={element.image}
              alt={`...`}
              className="w-100 border rounded p-2"
            />
          </Link>
          <div className="d-flex align-item-center justify-content-center justify-content-lg-between">
            <Link
              to="/ItemPageFunction"
              state={{ product: element }}
              className="w-100 title"
            >{`${element.title}`}</Link>
            <div className="d-lg-flex d-none">
              <Rating element={element} />
            </div>
          </div>

          <div className="d-flex d-lg-none">
            <Rating element={element} />
          </div>
          <hr className="my-1" />

          <div className="d-flex flex-nowrap d-inline-flex align-items-center justify-content-between">
            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-primary p-0 px-1"
                onClick={() => changeQuantity("decrease")}
              >
                <i className="fa-solid fa-minus" />
              </button>

              <input
                type="number"
                id={element.id}
                value={quantity}
                style={{ maxWidth: "40px", outline: "none" }}
                className="border-start-0 border-end-0 border-top border-bottom border-primary ps-1"
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setAmount(
                    Math.ceil(e.target.value * element.discountedPrice)
                  );
                }}
              />

              <button
                type="button"
                className="btn btn-outline-primary p-0 px-1"
                onClick={() => changeQuantity("increase")}
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>
            <button
              className="btn btn-outline-danger py-0"
              style={{ paddingLeft: "5px", paddingRight: "5px" }}
              onClick={() => handelAddToWishlist()}
            >
              <i className="fa-solid fa-heart" />
            </button>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <span className="lh-1">${amount}</span>

            <button
              className="btn btn-outline-success p-0 px-1"
              onClick={() => {
                handelAddToCart();
              }}
            >
              <i className="fa-solid fa-cart-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

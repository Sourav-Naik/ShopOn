import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Component/rating";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cart/cartReducer";
import {
  removeFromWishlist,
  updateWishlistItem,
} from "../redux/wishlist/wishlistReducer";

export default function WishlistItem(props) {
  const dispatch = useDispatch();
  let { element } = props;
  if (!element.discountedPrice) {
    element = {
      ...element,
      discountedPrice: Math.floor(element.price),
    };
  }

  const handelRemoveFromWishlist = () => {
    dispatch(removeFromWishlist(element));
  };

  let array = Object.values(element);

  const handelAddToCart = () => {
    dispatch(removeFromWishlist(element));
    dispatch(removeFromCart(element));
    const updatedElement = {
      ...element,
      quantity: array[8],
      amount: array[9],
    };
    dispatch(addToCart(updatedElement));
  };

  const quantity = (action) => {
    action === "increase"
      ? (array[8] = ++array[8])
      : array[8] > 1 && (array[8] = --array[8]);
    array[9] = Math.floor(array[7] * array[8]);
    const updatedProperties = {
      quantity: array[8],
      amount: array[9],
    };
    dispatch(
      updateWishlistItem({
        id: element.id,
        updatedProperties,
      })
    );
  };
  return (
    <div key={array[1]} className={`col-lg-2 col-3 p-0 `}>
      <div className={`p-2 h-100`}>
        <div
          className={`d-flex flex-column justify-content-evenly border rounded p-2 h-100 bg-white text-dark`}
        >
          <div className="position-relative d-flex h-100">
            <Link
              to="/ItemPageFunction"
              state={{ product: element }}
              className="h-100 d-flex"
            >
              <img
                src={array[5]}
                alt={`...`}
                className="w-100 border rounded p-2"
              />
            </Link>
            <span className="position-absolute top-0 start-100 translate-middle fa-solid fa-heart text-white bg-danger border border-danger rounded-circle p-1" />
          </div>
          <div className="d-flex align-item-center justify-content-center justify-content-lg-between">
            <Link
              to="/ItemPageFunction"
              state={{ product: element }}
              className="w-100 title"
            >{`${array[1]}`}</Link>
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
                onClick={() => quantity("decrease")}
              >
                <i className="fa-solid fa-minus" />
              </button>
              <input
                type="number"
                id={array[1]}
                value={element.quantity}
                style={{ maxWidth: "40px", outline: "none" }}
                className="border-start-0 border-end-0 border-top border-bottom border-primary ps-1"
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    let b = Math.ceil(element.discountedPrice * e.target.value);
                    array[8] = e.target.value;
                    const updatedProperties = {
                      quantity: e.target.value,
                      amount: b,
                    };
                    dispatch(
                      updateWishlistItem({
                        id: element.id,
                        updatedProperties,
                      })
                    );
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-outline-primary p-0 px-1"
                onClick={() => quantity("increase")}
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>

            <button
              className="btn btn-outline-success p-0 px-1"
              onClick={() => {
                handelAddToCart();
              }}
            >
              <i className="fa-solid fa-cart-plus" />
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <span className="lh-1">${array[9]}</span>

            <button
              className="btn btn-outline-danger py-0"
              style={{ paddingLeft: "6px", paddingRight: "6px" }}
              onClick={() => handelRemoveFromWishlist()}
            >
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

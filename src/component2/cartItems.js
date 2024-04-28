import React from "react";
import Rating from "../Component/rating";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../redux/cart/cartReducer";
import { addToWishlist } from "../redux/wishlist/wishlistReducer";
import { Link } from "react-router-dom";

export default function CartItems(props) {
  const { mode, item, last } = props;
  const dispatch = useDispatch();

  const handelAddtoWishlist = (item) => {
    dispatch(removeFromCart(item));
    dispatch(addToWishlist(item));
  };

  function calculateProfit(item) {
    let sp = item.discountedPrice * item.quantity;
    let cp = item.price * item.quantity;
    let profit = cp - sp;
    if (cp > sp) {
      profit = (profit / cp) * 100;
      return profit.toFixed(3);
    } else {
      return 0;
    }
  }

  const handelRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="flex flex-column">
      <Link to="/ItemPageFunction" className="text-decoration-none">
        <div
          state={{ product: item }}
          className={`fw-semibold title text-break w-full mx-2 ${
            mode === "light" ? "text-dark" : "text-white"
          }`}
        >
          {item.title}
        </div>
      </Link>
      <div
        className={`d-flex justify-content-between p-3 pt-2 ${
          last === false && "border-bottom mb-2"
        } ${mode === "light" && "border-info"}`}
        style={{ maxHeight: "510px" }}
      >
        <div className="d-flex flex-wrap min-width-100 me-2">
          <div className="d-flex flex-column align-items-start">
            <Link to="/ItemPageFunction" state={{ product: item }}>
              <img
                src={item.image}
                alt="."
                width="100"
                height="120"
                className="rounded border min-width-100 me-2"
              />
            </Link>
            <div className="mt-1 d-flex">
              <span className="me-2 lh-1">Rating</span>{" "}
              <Rating element={item} />
            </div>
            <div className="text-capitalize">{item.category}</div>
          </div>
        </div>

        <div className="d-none d-xl-inline p-2 px-3 text-break text-justify">
          <span className="fw-semibold">Description </span>
          <span className="text-capitalize">
            {item.description.substring(0, 150)}........
          </span>
        </div>

        <div className="d-flex flex-column justify-content-start align-items-end">
          <div className="d-flex justify-content-evenly">
            <button
              className="btn btn-outline-danger p-0 px-1 m-1 w-100"
              onClick={() => handelRemoveFromCart(item)}
            >
              <i className="fa-solid fa-trash" />
            </button>
            <button
              className="btn btn-outline-info p-0 px-1 m-1 w-100"
              onClick={() => handelAddtoWishlist(item)}
            >
              <i className="fa-regular fa-heart" />
            </button>
          </div>

          <div
            className="ms-2 d-flex flex-column align-items-end"
            style={{ minWidth: "102px" }}
          >
            <div className="d-flex">
              <div className="form-group-quantity position-relative text-dark">
                <label className="bg-white lh-1">Quantity</label>
                <span className="span bg-dark">.</span>
                <input
                  type="number"
                  className="form-control lh-1 rounded-none border-dark p-0 ps-2 py-1"
                  value={item.quantity}
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      let b = item.discountedPrice * e.target.value;
                      const updatedProperties = {
                        quantity: e.target.value,
                        amount: b,
                      };
                      dispatch(
                        updateCartItem({
                          id: item.id,
                          updatedProperties,
                        })
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="text-decoration-line-through text-secondary lh-1 mt-2">
              ${item.price * item.quantity}
            </div>
            <div className="fs-5 lh-1">${item.amount}</div>
            <div className="text-success fw-semibold text-end">{`You Saved ${
              item.quantity > 0 ? calculateProfit(item) : 0
            }%`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

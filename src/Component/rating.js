import React from "react";

export default function Rating(props) {
  const { element } = props;
  return (
    <div className="d-flex flex-nowrap align-items-center">
      {element.rating.rate <= 1 ? (
        <div className="d-flex flex-nowrap align-items-center">
          <i className="star fa-solid fa-star" />
          <i className="star fa-regular fa-star" />
          <i className="star fa-regular fa-star" />
          <i className="star fa-regular fa-star" />
          <i className="star fa-regular fa-star" />
        </div>
      ) : element.rating.rate <= 2 ? (
        <div className="d-flex flex-nowrap align-items-center">
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-regular fa-star" />
          <i className="star fa-regular fa-star" />
          <i className="star fa-regular fa-star" />
        </div>
      ) : element.rating.rate <= 3 ? (
        <div className="d-flex flex-nowrap align-items-center">
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-regular fa-star" />
          <i className="star fa-regular fa-star" />
        </div>
      ) : element.rating.rate <= 4 ? (
        <div className="d-flex flex-nowrap align-items-center">
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-regular fa-star" />
        </div>
      ) : (
        <div className="d-flex flex-nowrap align-items-center">
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-solid fa-star" />
          <i className="star fa-regular fa-star-half-stroke" />
        </div>
      )}
    </div>
  );
}

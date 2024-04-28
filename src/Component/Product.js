import React, { useEffect, useState } from "react";
import "./Style.css";
import Rendering from "./productRendering";
export default function Product(props) {
  document.title = "ShopOn - All Product";
  let progress = props.setProgress;
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    progress(25);
    const itemsUrl = "https://fakestoreapi.com/products";
    fetch(itemsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((itemsData) => {
        progress(50);
        setProducts(
          itemsData.map((element) => {
            return <Rendering key={element.id} element={element} />;
          })
        );
        setLoading(false);
        progress(100);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [progress]);
  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="d-flex flex-column container-md align-items-center">
          <div className="row mx-3">{products}</div>
        </div>
      )}
    </>
  );
}

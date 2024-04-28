import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Rendering from "./productRendering";
import "./Style.css";
export default function Home(props) {
  document.title = "ShopOn";
  const [categories, setCategories] = useState();
  const [catFilter, setCatFilter] = useState(false);
  const [categoryItem, setCategoryItem] = useState();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [productList, setProductList] = useState();

  const ref = useRef();

  let progress = props.setProgress;

  useMemo(async () => {
    try {
      let itemsData = await fetch("https://fakestoreapi.com/products");
      itemsData = await itemsData.json();
      setProductList(itemsData);
      return itemsData;
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const allProducts = useMemo(() => productList, [productList]);

  const filter = useCallback((products, selectedCategory) => {
    const filteredArray = products.filter(
      (obj) => obj.category === selectedCategory
    );
    setCatFilter(true);
    setCategoryItem(
      filteredArray.map((element) => {
        return <Rendering element={element} key={element.id} />;
      })
    );
  }, []);

  useEffect(() => {
    progress(30);
    const fetchCat = async () => {
      try {
        let catData = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        catData = await catData.json();
        setCategories(
          catData.map((element) => {
            return (
              <span
                key={element}
                className="position-relative d-flex align-items-center"
              >
                <input
                  type="radio"
                  className="btn-check position-absolute bottom-0"
                  id={element}
                  name="category"
                  autoComplete="off"
                  onClick={(e) => {
                    filter(allProducts, e.target.id);
                  }}
                />
                <label
                  className="btn btn-outline-light border-2 mx-1 p-0 px-2"
                  htmlFor={element}
                >
                  <span className="lh-1 fs-6">{element.toUpperCase()}</span>
                </label>
              </span>
            );
          })
        );
      } catch (error) {
        console.log("error", error);
      }
    };

    allProducts &&
      setProducts(
        // eslint-disable-next-line
        allProducts.map((element) => {
          if (element.rating.rate >= 4) {
            return <Rendering element={element} key={element.id} />;
          }
        })
      );
    allProducts && setLoading(false);
    progress(60);
    fetchCat();
    progress(90);
    progress(100);
    // eslint-disable-next-line
  }, [progress, allProducts]);

  const visibility = useCallback((action) => {
    if (
      ref.current.scrollWidth === ref.current.offsetWidth ||
      action === "hide"
    ) {
      document.getElementById("leftScrollBtn").style.visibility = "hidden";
      document.getElementById("rightScrollBtn").style.visibility = "hidden";
    } else {
      document.getElementById("leftScrollBtn").style.visibility = "visible";
      document.getElementById("rightScrollBtn").style.visibility = "visible";
    }
  }, []);

  const handelScroll = (side) => {
    let scrollNumber = ref.current.scrollWidth / ref.current.offsetWidth;
    scrollNumber = Math.floor(scrollNumber);
    let scrollAmount = ref.current.scrollWidth / scrollNumber;

    if (scrollPosition <= 0 && side === "left") {
      setScrollPosition(ref.current.scrollWidth);
      ref.current.scrollLeft = ref.current.scrollWidth;
    } else if (scrollPosition >= ref.current.scrollWidth && side === "right") {
      setScrollPosition(0);
      ref.current.scrollLeft = 0;
    } else if (scrollPosition >= 0 && side === "left") {
      setScrollPosition(scrollPosition - scrollAmount);
      ref.current.scrollLeft = scrollPosition - scrollAmount;
    } else if (scrollPosition < ref.current.scrollWidth && side === "right") {
      setScrollPosition(scrollPosition + scrollAmount);
      ref.current.scrollLeft = scrollPosition + scrollAmount;
    }
  };

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
        <div className="container-md mt-2">
          <div className={`mt-2 text-white py-2 border rounded w-100`}>
            <div
              className={`d-flex align-items-center rounded p-2 fs-4 mx-2 ${
                props.mode === "dark" ? "bg-dark" : "bg-info"
              } `}
            >
              <span className="lh-1 me-2">Filter</span> {categories}
            </div>
            <div
              className="scrollContainer"
              onMouseEnter={() => visibility("show")}
              onMouseLeave={() => visibility("hide")}
            >
              <button
                id="leftScrollBtn"
                type="button"
                className="scrollButton rounded-end fa-solid fa-angle-left fa-xl"
                onClick={(event) => handelScroll("left")}
              />
              <div id="products" ref={ref}>
                {catFilter ? categoryItem : products}
              </div>
              <button
                id="rightScrollBtn"
                type="button"
                className="scrollButton rounded-start fa-solid fa-angle-right fa-xl"
                onClick={(event) => handelScroll("right")}
              />
            </div>
          </div>

          <div className={`mt-3 text-white p-2 border rounded`}>
            <div
              className={`rounded p-2 fw-semibold fs-4 w-100 lh-1 ${
                props.mode === "dark" ? "bg-dark" : "bg-info"
              } `}
            >
              Best on ShopOn
            </div>
            <div className="row mx-2 justify-content-evenly">{products}</div>
          </div>
        </div>
      )}
    </>
    // <div></div>
  );
}

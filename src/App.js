import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Header/Navbar/Navbar";
import Cart from "./component2/cart";
import Login from "./Component/Login";
import Footer from "./Component/Footer/Footer";
import Signup from "./Component/Signup";
import Product from "./Component/Product";
import Home from "./Component/home";
import ItemPageFunction from "./Component/ItemPageFunction";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [mode, setMode] = useState("light");
  const [progress, setProgress] = useState(100);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.classList.remove("bg-dark");
    } else {
      setMode("dark");
      document.body.classList.add("bg-dark");
      document.body.classList.add("bg-gradient");
    }
  };

  return (
    <div className="App d-flex flex-column min-vh-100 justify-content-between">
      <Router>
        <div className="d-flex flex-column position-relative">
          <div id="navbar" className="">
            <Navbar mode={mode} toggleMode={toggleMode} />
            <LoadingBar
              color="#f11946"
              progress={progress}
              height={3}
              onLoaderFinished={() => setProgress(0)}
            />
          </div>
          <div id="main">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home mode={mode} setProgress={setProgress} />}
              />

              <Route
                exact
                path="/login"
                element={<Login mode={mode} setProgress={setProgress} />}
              />
              <Route
                exact
                path="/login/signup"
                element={<Signup mode={mode} setProgress={setProgress} />}
              />
              <Route
                exact
                path="/cart"
                element={<Cart mode={mode} setProgress={setProgress} />}
              />
              <Route
                exact
                path="/products"
                element={<Product mode={mode} setProgress={setProgress} />}
              />
              <Route
                exact
                path="/ItemPageFunction"
                element={
                  <ItemPageFunction mode={mode} setProgress={setProgress} />
                }
              />
            </Routes>
          </div>
        </div>

        <div id="footer">
          <Footer mode={mode} />
        </div>
      </Router>
    </div>
  );
}
export default App;

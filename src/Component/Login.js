import React, { useState, useEffect } from "react";
import cart from "../Image/cart.gif";
import "./Style.css";
import { Link } from "react-router-dom";

export default function Login(props) {
  let progress = props.setProgress;
  useEffect(() => {
    progress(33);
    setTimeout(progress(66), 500);
    setTimeout(progress(100), 1000);
  }, [progress]);
  document.title = "ShopOn - Login";

  const [credential, setCredentail] = useState({
    name: "",
    password: "",
    type: "Buyer",
  });
  const [statement, setStatement] = useState("Get access to your Orders");
  const [alert, setAlert] = useState(true);

  const handleLogin = () => {
    console.log(credential);
    setStatement(
      "Sorry we ahve no end point to get you logged in.\n You can check console for credentail"
    );
  };

  return (
    <>
      {alert && (
        <div
          className="alert alert-danger alert-dismissible fade show m-0 position-fixed top-0 min-vw-100"
          role="alert"
        >
          <strong>No API</strong> Currently No API for sign in.
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setTimeout(() => {
                setAlert(false);
              }, 100);
            }}
          />
        </div>
      )}
      <div
        className={`container-xl mt-1 d-flex align-self-start justify-content-center`}
      >
        <div
          id="box"
          className={`col bg-${props.mode === "light" ? "info" : "dark"} p-0`}
        >
          <div className="fs-3 mt-3 px-3 text-white fw-semibold">
            Login as {credential.type}
          </div>
          <div className="fs-5 mt-2 px-3 text-secondary lh-1">{statement}</div>
          <div className="align-items-center d-inline-flex" id="moving">
            <img src={cart} alt="" />
          </div>
        </div>
        {/* login form */}
        <div
          className={` col-5 m-0 ms-1 p-3 bg-${
            props.mode === "light" ? "info" : "dark"
          } text-white `}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="inputUser" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUser"
                placeholder="Enter User Name"
                onChange={(e) => {
                  setCredentail({ ...credential, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Enter Password"
                onChange={(e) => {
                  setCredentail({ ...credential, password: e.target.value });
                }}
              />
            </div>
            Login As:
            <div className="mb-2">
              <div
                className="btn-group mt-1"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                  onChange={() => {
                    setCredentail({ ...credential, type: "seller" });
                  }}
                />
                <label
                  className="btn btn-outline-light border-3 m-1 rounded fw-semibold px-3"
                  htmlFor="btnradio2"
                >
                  Seller
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  defaultChecked={true}
                  onChange={() => {
                    setCredentail({ ...credential, type: "buyer" });
                  }}
                />
                <label
                  className="btn btn-outline-light border-3 m-1 rounded fw-semibold px-3"
                  htmlFor="btnradio1"
                >
                  Buyer
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <Link
                to="/login/signup"
                className="me-3 lh-1 pt-3 text-white fw-semibold algine-self-end"
              >
                Sign Up for New User
              </Link>
              <div
                className="btn btn-light fw-semibold px-3"
                onClick={handleLogin}
              >
                Login
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

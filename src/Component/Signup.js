import React, { useState, useEffect } from "react";
import cart from "../Image/cart.gif";
import "./Style.css";
export default function Signup(props) {
  let progress = props.setProgress;
  useEffect(() => {
    progress(33);
    setTimeout(progress(66), 500);
    setTimeout(progress(100), 1000);
  }, [progress]);
  document.title = "ShopOn - SignUp";

  const [credentails, setCredentails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    type: "buyer",
  });
  const [msg, setMsg] = useState(`Sign up as buyer`),
    [statement, setStatement] = useState("Get access to your Orders"),
    [conPassMsg, setConPassMsg] = useState(""),
    [alert, setAlert] = useState(true);

  const handleOnChangeEmail = (event) => {
    setCredentails({ ...credentails, email: event.target.value });
    let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    let a = event.target.value.toLowerCase();
    !pattern.test(a) && console.log("Invalid Email");
  };

  /*------------password--------------*/
  const display = (action) => {
    let element = document.getElementById("message");
    element && (element.style.display = action);
  };

  const handelOnChangePass = (event) => {
    const cond = event.target.parentNode.nextSibling.children;
    if (event.target.value.match(/[a-z]/g)) {
      cond[1].style.color = "green";
    } else {
      cond[1].style.color = "red";
    }
    if (event.target.value.match(/[A-Z]/g)) {
      cond[2].style.color = "green";
    } else {
      cond[2].style.color = "red";
    }
    if (event.target.value.match(/[0-9]/g)) {
      cond[3].style.color = "green";
    } else {
      cond[3].style.color = "red";
    }
    if (event.target.value.length >= 8) {
      cond[4].style.color = "green";
    } else {
      cond[4].style.color = "red";
    }
    setConPassMsg("");
    event.target.parentNode.nextSibling.nextSibling.lastChild.value = "";
    setCredentails({ ...credentails, password: event.target.value });
  };

  const handleConPass = (event) => {
    let pass = document.querySelector("#inputPassword").value;
    let conPass = document.querySelector("#inputConPass").value;
    if (pass === conPass) {
      setConPassMsg("Confirmed");
    } else {
      setConPassMsg("Invalid");
    }
    setCredentails({ ...credentails, confirmPass: event.target.value });
  };

  const signup = () => {
    console.log(credentails);
    setMsg("Sorry" + credentails.name);
    setStatement("Sorry presently we are not active " + credentails.name);
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
        className={`container-xl mt-1 align-self-start d-flex justify-content-center`}
      >
        {/* -------------------------msg-box----------------------- */}
        <div
          id="box"
          className={`col bg-${props.mode === "light" ? "info" : "dark"} p-0`}
        >
          <div className="fs-3 mt-3 px-3 text-white fw-semibold" id="msg">
            {msg}
          </div>
          <div className="fs-5 mt-2 px-3 text-secondary lh-1">{statement}</div>
          <div className="align-items-center d-inline-flex" id="moving1">
            <img src={cart} alt="" />
          </div>
        </div>
        {/* Signup form */}
        <form
          className={` col-5 m-0 ms-1 p-3 text-white bg-${
            props.mode === "light" ? "info" : "dark"
          } `}
        >
          <div className="mb-2">
            <label htmlFor="inputEmail" className="form-label mb-1">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="example@mail.com"
              onChange={(e) => handleOnChangeEmail(e)}
            />
          </div>
          {/* ------------------username--------------------- */}
          <div>
            <label htmlFor="inputUserName" className="form-label mb-1">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUserName"
              onChange={(e) => {
                setCredentails({ ...credentails, name: e.target.value });
              }}
            />
          </div>
          {/*-------------------            password           --------------- */}
          <div className="mb-2">
            <label htmlFor="inputPassword" className="form-label mb-1">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              onChange={(event) => handelOnChangePass(event)}
              onFocus={() => display("block")}
              onBlur={() => display("none")}
            />
          </div>
          <div className="bg-white text-dark py-2 px-4 rounded" id="message">
            <p className="fs7 fw-bolder">
              Password must contain the following:
            </p>
            <p id="letter" className="invalid fs7">
              A <b>lowercase</b> letter
            </p>
            <p id="capital" className="invalid fs7">
              A <b>Uppercase</b> letter
            </p>
            <p id="number" className="invalid fs7">
              A <b>Number</b>
            </p>
            <p id="length" className="invalid fs7">
              Minimum <b>8 characters</b>
            </p>
          </div>
          {/* -----------------Confirm pass---------------------- */}
          <div className="mb-2">
            <label htmlFor="inputConPass" className="form-label mb-1">
              Confirm Password
              <sup
                className={`${
                  conPassMsg === "Confirmed" ? "text-success" : "text-danger"
                } ms-1`}
                style={{ fontSize: 11 }}
              >
                {conPassMsg}
              </sup>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputConPass"
              onChange={(event) => handleConPass(event)}
            />
          </div>
          {/* -------------------signup as------------------- */}
          SignUp As:
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
                id="btnradio1"
                autoComplete="off"
                defaultChecked={true}
                onChange={() => {
                  setCredentails({ ...credentails, type: "buyer" });
                  setMsg("Sign up as buyer");
                }}
              />
              <label
                className="btn btn-outline-light border-3 m-1 rounded fw-semibold px-3"
                htmlFor="btnradio1"
              >
                Buyer
              </label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                onChange={() => {
                  setCredentails({ ...credentails, type: "seller" });
                  setMsg("Sign up as seller");
                }}
              />
              <label
                className="btn btn-outline-light border-3 m-1 rounded fw-semibold px-3"
                htmlFor="btnradio2"
              >
                Seller
              </label>
            </div>
          </div>
          {/* ----------------------signup------------------------ */}
          <div className="d-flex justify-content-end mt-4">
            <div className="btn btn-light fw-semibold px-3" onClick={signup}>
              SignUp
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

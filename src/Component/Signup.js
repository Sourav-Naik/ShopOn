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
    [conPassMsg, setConPassMsg] = useState(0),
    [emailMsg, setEmailMsg] = useState(0),
    [nameMsg, setNameMsg] = useState(0),
    [passMsg, setPassMsg] = useState(0),
    [alert, setAlert] = useState({
      state: true,
      msg: "No API ",
      des: "Currently No API for sign in",
    });

  const handleOnChangeEmail = (event) => {
    setCredentails({ ...credentails, email: event.target.value });
    let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    let a = event.target.value.toLowerCase();
    pattern.test(a) ? setEmailMsg(1) : setEmailMsg(2);
  };

  /*------------password--------------*/
  const display = (action, e) => {
    let element = e.target.parentNode.nextSibling;
    element && (element.style.display = action);
  };

  const handelOnChangePass = (event) => {
    const cond = event.target.parentNode.nextSibling.children;
    let value = event.target.value;
    if (value.match(/[a-z]/g)) {
      cond[1].style.color = "green";
    } else {
      cond[1].style.color = "red";
    }
    if (value.match(/[A-Z]/g)) {
      cond[2].style.color = "green";
    } else {
      cond[2].style.color = "red";
    }
    if (value.match(/[0-9]/g)) {
      cond[3].style.color = "green";
    } else {
      cond[3].style.color = "red";
    }
    if (event.target.value.length >= 8) {
      cond[4].style.color = "green";
    } else {
      cond[4].style.color = "red";
    }
    if (
      value.match(/[a-z]/g) &&
      value.match(/[A-Z]/g) &&
      value.match(/[0-9]/g) &&
      event.target.value.length >= 8
    ) {
      setPassMsg(1);
    } else if (event.target.value.length >= 8) {
      setPassMsg(2);
    }

    setConPassMsg("");
    event.target.parentNode.nextSibling.nextSibling.lastChild.value = "";
    setCredentails({ ...credentails, password: event.target.value });
  };

  const handleConPass = (event) => {
    let pass = document.querySelector("#inputPassword").value;
    let conPass = event.target.value;
    if (pass === conPass) {
      setConPassMsg(1);
    } else {
      setConPassMsg(2);
    }
    setCredentails({ ...credentails, confirmPass: event.target.value });
  };

  const signup = () => {
    if (emailMsg === 1 && nameMsg === 1 && passMsg === 1 && conPassMsg === 1) {
      console.log(credentails);
      setMsg("Sorry" + credentails.name);
      setStatement("Sorry presently we are not active " + credentails.name);
    } else {
      console.log(emailMsg, nameMsg, passMsg, conPassMsg);
      setAlert({
        state: true,
        msg: "Invalid Credentails",
        des: "Please Check and change the credentials",
      });
    }
  };

  return (
    <>
      {alert.state && (
        <div
          className="alert alert-danger alert-dismissible fade show m-0 position-fixed top-0 min-vw-100"
          role="alert"
        >
          <strong>{alert.msg}</strong> {alert.des}.
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
          {/* ------------------email--------------------- */}
          <div className="mb-2">
            <label
              htmlFor="inputEmail"
              className="form-label mb-1 d-flex align-items-center"
            >
              Email address{" "}
              <span
                className={`${
                  emailMsg === 1 ? "text-success" : "text-danger"
                } ms-1 lh-1 fs-5`}
                style={{ fontSize: 11 }}
              >
                {emailMsg === 1 && <i className="fa-solid fa-circle-check" />}
                {emailMsg === 2 && <i className="fa-solid fa-circle-xmark" />}
              </span>
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
          <div className="mb-2">
            <label
              htmlFor="inputUserName"
              className="form-label mb-1 d-flex align-items-center"
            >
              User Name{" "}
              <span
                className={`${
                  nameMsg === 1 ? "text-success" : "text-danger"
                } ms-1 lh-1 fs-5`}
                style={{ fontSize: 11 }}
              >
                {nameMsg === 1 && <i className="fa-solid fa-circle-check" />}
                {nameMsg === 2 && <i className="fa-solid fa-circle-xmark" />}
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUserName"
              onChange={(e) => {
                setCredentails({ ...credentails, name: e.target.value });
                e.target.value.length > 7 ? setNameMsg(1) : setNameMsg(2);
              }}
            />
          </div>
          {/*-------------------password--------------------- */}
          <div className="mb-2">
            <label
              htmlFor="inputPassword"
              className="form-label mb-1 d-flex align-items-center"
            >
              Password{" "}
              <span
                className={`${
                  passMsg === 1 ? "text-success" : "text-danger"
                } ms-1 lh-1 fs-5`}
                style={{ fontSize: 11 }}
              >
                {passMsg === 1 && <i className="fa-solid fa-circle-check" />}
                {passMsg === 2 && <i className="fa-solid fa-circle-xmark" />}
              </span>
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              onChange={(event) => handelOnChangePass(event)}
              onFocus={(e) => display("block", e)}
              onBlur={(e) => display("none", e)}
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
          {/* -----------------Confirm pass------------------ */}
          <div className="mb-2">
            <label
              htmlFor="inputConPass"
              className="form-label mb-1 d-flex align-items-center"
            >
              Confirm Password
              <span
                className={`${
                  conPassMsg === 1 ? "text-success" : "text-danger"
                } ms-1 lh-1 fs-5`}
                style={{ fontSize: 11 }}
              >
                {conPassMsg === 1 && <i className="fa-solid fa-circle-check" />}
                {conPassMsg === 2 && <i className="fa-solid fa-circle-xmark" />}
              </span>
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
          {/* ------------------signup----------------------- */}
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

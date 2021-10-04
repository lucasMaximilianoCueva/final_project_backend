import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCartContext } from "../../context/cartContext";
import CartWidget from "../CartWidget/CartWidget";
import pino from "pino";
import "./Nav.css";

const logger = pino({
  prettyPrint: { colorize: true },
});

function Nav() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((res) => setDataUser(res))
      .catch((err) => {
        logger.info(`error: ${err}`);
      });
  }, []);

  const { totalItemCount } = useCartContext();
  const styles = {
    display: totalItemCount > 0 ? "block" : "none",
  };

  const logOut = () => {
    fetch("/user/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      window.location = "/";
    });
  };

  return (
    <nav className="navbar navbar-light border border-bottom-1 nav-horizontal">
      <div>
        <Link to="/" className="navbar-brand">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwd3NfxM88PXPunpAXXcHFx43vGoWYU1Fnh6xM7Jp1OZh2Hu83unIeSjOPiF0ebj-x6w0&usqp=CAU"
            width="40"
            alt="brandimage"
          ></img>
          <span style={{color:"#42bb83"}}>Mongo</span> Cars
        </Link>
        {dataUser.name && (
          <Link to="/profile" className="navbar-brand">
            <button type="button" className="btn btn-login btn-primary">
            {dataUser.name || "Username"}
            </button>
          </Link>
        )}
      </div>
      
      <div className="right-side-nav">
      <div style={styles} className="cart">
        <Link to="/cart">
          <CartWidget />
        </Link>
        <span>{totalItemCount}</span>
      </div>
        {!dataUser.name && (
          <Link to="/register" className="navbar-brand">
            <button type="button" className="btn btn-login">
              Sign Up
            </button>
          </Link>
        )}
        {dataUser.name && (
          <button type="button" className="btn btn-login" onClick={logOut}>
          Logout
        </button>
        )}
      </div>
    </nav>
  );
}

export default Nav;

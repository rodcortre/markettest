import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartUpdate } from "../hooks/useCartUpdate";
import { useLogin } from "../hooks/useLogin";

export const Nav = () => {
  const { cartUpdate } = useCartUpdate();
  const navigate = useNavigate();
  const [showAlertProduct, setShowAlertProduct] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const { height } = window.screen;
  const { isAuth } = useLogin();
  const handleCart = () => {
    if (showAlertProduct) {
      navigate("/cart");
    }
  };

  const handleClose = () => {
    localStorage.removeItem("session");
    isAuth(false);
  };
  useEffect(() => {
    const getHistoryProducts = localStorage.getItem("products");
    if (getHistoryProducts) {
      const products = JSON.parse(getHistoryProducts);
      if (products.length > 0) {
        let sum = 0;
        for (let i = 0; i < products.length; i++) {
          const getKeys = Object.keys(products[i]);
          sum += Number(products[i][getKeys[0]]);
        }
        if (sum !== 0) {
          setTotalItems(sum);
          setShowAlertProduct(true);
        } else {
          setShowAlertProduct(false);
        }
      } else {
        setShowAlertProduct(false);
      }
    } else {
      setShowAlertProduct(false);
    }
  }, [JSON.stringify(localStorage), cartUpdate]);
  return (
    <div
      className="w-full flex items-center"
      style={{ height: height * 0.15, background: "#121F2B" }}
    >
      <div
        onClick={() => navigate("/")}
        className="flex items-center justify-center rounded"
        style={{
          background: "white",
          color: "red",
          width: 50,
          height: 50,
          margin: 5,
          cursor: "pointer",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        <img
          style={{ width: 40, height: 40 }}
          src={
            "https://i.pinimg.com/originals/f7/05/39/f70539facf4b0da693296061c293e3e2.png"
          }
        ></img>
      </div>
      <div className="flex flex-1"></div>
      <div
        onClick={handleCart}
        className="flex items-center justify-center rounded"
        style={{
          background: "white",
          color: "red",
          width: 50,
          height: 50,
          margin: 5,
          cursor: showAlertProduct ? "pointer" : "none",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        <img
          style={{ width: 40, height: 40 }}
          src={
            "https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg"
          }
        ></img>
        {showAlertProduct ? (
          <div
            style={{
              background: "red",
              border: "1px solid black",
              borderRadius: 100,
              width: 30,
              height: 30,
              position: "absolute",
              top: 10,
              right: 60,
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {totalItems}
          </div>
        ) : null}
      </div>
      <div
        onClick={handleClose}
        className="flex items-center justify-center rounded"
        style={{
          background: "white",
          color: "red",
          width: 50,
          height: 50,
          margin: 5,
          cursor: "pointer",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        X
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { Layout } from "../layout/Layout";
import { Cart } from "../pages/Cart";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

export default function Validator() {
  const [withSession, setWithSession] = useState(false);
  const { auth } = useLogin();

  useEffect(() => {
    const getSession = localStorage.getItem("session");
    if (getSession) {
      setWithSession(true);
    } else {
      setWithSession(false);
    }
  }, [auth, JSON.stringify(localStorage)]);

  if (auth || withSession) {
    return (
      <Router>
        <div>
          <Layout></Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLogin } from "../hooks/useLogin";

export const FormLogin = () => {
  const { isAuth } = useLogin();
  const requestLogin = async () => {
    try {
      const response = await fetch(
        `https://serversalinas.herokuapp.com/login`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            cellPhone: values.cellPhone,
            password: values.password,
          }),
        }
      );

      const parsedResponse = await response.json();
      if (parsedResponse.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Datos no validos",
        });
      } else {
        isAuth(true);
        localStorage.setItem("session", "ok");
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Datos no validos",
      });
    } finally {
    }
  };
  const [values, setValues] = useState({
    cellPhone: "",
    password: "",
  });
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const getValues = Object.values(values);
    if (getValues.includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ambos campos son necesarios",
      });
    } else {
      requestLogin();
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <div
        className="rounded border border-neutral-500 h-1/3 w-1/2"
        style={{
          boxShadow: "1px 2px 9px #121F2B",

          padding: "30px",
        }}
      >
        <h1 className="text-4xl my-1" style={{ position: "relative" }}>
          INICIAR SESION
        </h1>
        <div className="flex flex-col gap-2 mt-4">
          <input
            onChange={onHandleChange}
            name="cellPhone"
            value={values.cellPhone}
            style={{ textAlign: "center" }}
            type={"text"}
            autoComplete="off"
            className="rounded border border-neutral-500"
          />
          <input
            onChange={onHandleChange}
            name="password"
            value={values.password}
            style={{ textAlign: "center" }}
            type={"password"}
            autoComplete="off"
            className="rounded border border-neutral-500"
          />

          <button
            type="button"
            onClick={handleSubmit}
            style={{ background: "#121F2B", color: "white", padding: "5px" }}
            className="rounded"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { FormLogin } from "../components/FormLogin";

export const Login = () => {
  return (
    <div className="flex">
      <div
        style={{
          backgroundImage:
            "url('https://activagasbeta-files.s3.amazonaws.com/loginclient.jpg')",
        }}
        className="
            bg-center-center 
            bg-no-repeat 
            bg-fixed 
            bg-cover
            h-screen 
            flex-1 
            "
      ></div>
      <div className="h-screen flex-1">
        <FormLogin />
      </div>
    </div>
  );
};

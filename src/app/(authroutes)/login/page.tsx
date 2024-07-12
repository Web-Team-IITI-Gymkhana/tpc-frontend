//this will be used to create the login page.
import React from "react";
import LoginForm from "@/components/loginForms/loginForm";

const LoginPage = async () => {
  return (
    <div className="w-screen h-screen flex md:justify-end justify-center items-center bg-[url('/wave-bg-login.svg')] bg-no-repeat bg-center bg-cover">
      <div className="md:w-1/2 w-[90vw] h-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

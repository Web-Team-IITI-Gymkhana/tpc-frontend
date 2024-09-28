//this will be used to create the login page.
import React from "react";
import LoginForm from "@/components/loginForms/loginForm";

const LoginPage = async () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-1/4 w-[45vw]">
        <LoginForm />
      </div>
    </div>
  )
};

export default LoginPage;

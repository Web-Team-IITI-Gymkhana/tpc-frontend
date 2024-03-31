//this will be used to create the login modal.
"use client";

import React from "react";
import LoginForm from "@/components/loginForms/loginForm";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  return (
    <div
      onClick={(e) => {
        router.back();
      }}
      className="flex align-middle justify-center absolute h-full w-full z-40 bg-white/30 backdrop-blur-sm"
    >
      <div
        className="h-fit mt-5 sm:my-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginModal;

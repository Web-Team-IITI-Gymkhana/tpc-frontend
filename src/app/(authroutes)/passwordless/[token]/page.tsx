"use client";
import { PasswordlessLogin } from "@/helpers/api";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect } from "react";

interface Props {}

const LoginPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {

  useEffect(()=>{
    const login = async () => {
        const res = await PasswordlessLogin(params.token);

        if(res===201){
            toast.success("Logged in successfully")
        }
        else {
            toast.error("Some error occured")
        }
    }
  })  

  return (
    <>
      <div>Please Wait</div>
    </>
  );
};

export default LoginPage;

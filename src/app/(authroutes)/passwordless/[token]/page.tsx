"use client";
import { PasswordlessLogin } from "@/helpers/api";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface Props {}

const LoginPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {

  const router = useRouter();

  useEffect(()=>{
    const login = async () => {
        const res = await PasswordlessLogin(params.token);

        if(res.status===201){
          console.log(res);
          Cookies.set("accessToken", res.body.accessToken, {expires: 365});
          Cookies.set("user",JSON.stringify(jwtDecode(res.body.accessToken)),{ expires: 365 });
          toast.success("Logged in successfully")
          router.push("/recruiter")
        }
        else {
          toast.error("Some error occured")
          router.push("/login")
        }
    }

    login();
  })  

  return (
    <>
      <div>Please Wait</div>
    </>
  );
};

export default LoginPage;

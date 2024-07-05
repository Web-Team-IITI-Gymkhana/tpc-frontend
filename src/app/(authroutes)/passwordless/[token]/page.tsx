"use client";
import { PasswordlessLogin } from "@/helpers/api";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";

interface Props {}

const LoginPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const login = async () => {
        try {
          const res = await PasswordlessLogin(params.token);
          Cookies.set("accessToken", res.body.accessToken, {expires: 365});
          Cookies.set("user",JSON.stringify(jwtDecode(res.body.accessToken)),{ expires: 365 });
          toast.success("Logged in successfully")
          router.push("/recruiter")
        } catch (error) {
          toast.error("Some Error Occurred");
        } finally {
          setLoading(false);
        }
    }

    login();
  })  

  return (
    <>
      {loading && <img src={loadingImg.src} alt="Loading" className="mx-auto my-auto" />}
    </>
  );
};

export default LoginPage;

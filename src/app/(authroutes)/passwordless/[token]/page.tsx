"use client";
import { PasswordlessLogin } from "@/helpers/api";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Loader from "@/components/Loader/loader";

const LoginPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        const res = await PasswordlessLogin(params.token);
        Cookies.set("accessToken", res.body.accessToken, { expires: 6 });
        Cookies.set("user", JSON.stringify(jwtDecode(res.body.accessToken)), {
          expires: 6,
        });
        toast.success("Logged in successfully");
        router.push("/recruiter");
      } catch (error) {
        toast.error("Some Error Occurred");
        console.error("Error during passwordless login:", error);
      } finally {
        setLoading(false);
      }
    };

    login();
  }, [params.token, router]);

  return (
    <>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default LoginPage;

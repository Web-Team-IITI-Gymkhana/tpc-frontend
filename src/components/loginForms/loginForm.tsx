//this will be used to create the login page.
"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLogin from "./googleLogin";
import { LoginWithEmail } from "@/components/loginForms/loginWithEmail";
import { login } from "@/helpers/api";
import { googleLoginURL } from "@/helpers/googleAuth";

const LoginForm = () => {
  const [email, setemail] = useState<string | null>(null);
  const [role, setrole] = useState<string | null>("STUDENT");
  const router = useRouter();

  useEffect(() => {
    const loginURL = googleLoginURL();
    window.location.href = loginURL;
  })


  return (
    <>
      <div className="text-black">
        <div>
          <div className="p-4 px-4 md:p-8 rounded-md">
            <div className="w-full">
              <div className="lg:col-span-2 w-full">
                <div className="my-2 w-full h-max">
                  <div className="mb-4">
                    <div className="md:col-span-5">
                      {/* <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 max-w-full w-80 bg-gray-50"
                        placeholder="email@domain.com"
                        required={true}
                        onChange={(e) => {
                          setemail(e?.target?.value);
                        }}
                      /> */}
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="items-center flex justify-center flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        {/* <LoginWithEmail email={email} /> */}
                        {/* <GoogleLogin /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

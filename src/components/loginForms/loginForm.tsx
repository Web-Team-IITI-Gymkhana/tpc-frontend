//this will be used to create the login page.
"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLogin from "./googleLogin";
import { LoginWithEmail } from "@/components/loginForms/loginWithEmail";
import { login } from "@/helpers/api";

const LoginForm = () => {
  const [email, setemail] = useState<string | null>(null);
  const [role, setrole] = useState<string | null>("STUDENT");
  const router = useRouter();
  return (
    <>
      <div className="overflow-auto rounded-md max-h-[90vh] max-w-screen shadow-lg text-black">
        <div>
          <div className="bg-white p-4 px-4 md:p-12 rounded-md">
            <div className="w-full">
              <div className="lg:col-span-2 w-full">
                <div className="my-2 w-full h-max">
                  <div className="mb-4">
                    <div className="md:col-span-5">
                      <TextField
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email@domain.com"
                        required={true}
                        onChange={(e) => {
                          setemail(e?.target?.value);
                        }}
                        helperText="Only for Recruiters"
                        className="mt-1 rounded"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon />
                            </InputAdornment>
                          ),
                          className: "h-10 max-w-full w-80 overflow-hidden",
                        }}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="items-center flex justify-center flex-col gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => {
                          if (email == null || email.length == 0) {
                            toast.error("Email is required");
                            return;
                          }
                          try {
                            await login(email, role);
                          } catch (err) {
                            alert(err);
                            toast.error("Some error occurred");
                          }
                        }}
                      >
                        Request Access
                      </button>
                      <div className="flex flex-row gap-4">
                        <LoginWithEmail email={email} />
                        <GoogleLogin />
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

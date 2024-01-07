//this will be used to create the login page.
"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
  const [email, setemail] = useState<String | null>(null);
  const [role, setrole] = useState<String | null>(null);
  const router = useRouter();
  return (
    <>
      <div className="overflow-auto rounded-md max-h-[90vh] container max-w-screen shadow-lg text-black">
        <div>
          <div className="bg-white p-4 px-4 md:p-8 rounded-md">
            <div className="w-full">
              <div className="lg:col-span-2 w-full">
                <div className="my-2 w-full">
                  <div className="md:col-span-5">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@domain.com"
                      required={true}
                      onChange={(e) => {
                        setemail(e?.target?.value);
                      }}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <select
                      name="role"
                      id="role"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      required={true}
                      onChange={(e) => {
                        setrole(e?.target?.value);
                      }}
                    >
                      <option>Student</option>
                      <option>Faculty</option>
                      <option>Recruiter</option>
                      <option>Manager</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className=" items-center flex justify-center">
                      <button
                        className="bg-blue-500 my-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          if (email == null || email.length == 0) {
                            toast.error("Email is Required");
                            return;
                          }
                          axios
                            .post("http://tpc.iiti.ac.in/api/v1/auth/login/", {
                              email: email,
                              role: role?.toUpperCase(),
                            })
                            .then(
                              (response: { data: { accessToken: string } }) => {
                                Cookies.set(
                                  "accessToken",
                                  response.data.accessToken,
                                  { expires: 365 },
                                );
                                Cookies.set(
                                  "user",
                                  JSON.stringify(
                                    jwtDecode(response.data.accessToken),
                                  ),
                                  { expires: 365 },
                                );
                                toast.success("logged in");
                                window.location.href = "/";
                              },
                            )
                            .catch((err) => {
                              console.log(err);
                              toast.error("Some Error Occured");
                            });
                        }}
                      >
                        Request Access
                      </button>
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

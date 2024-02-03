//this will be used to create the login page.
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordlessLogin } from "./passwordlessLogin";
import { Button } from "../ui/button";

const LoginForm = () => {
  const [email, setemail] = useState<String | null>(null);
  const [role, setrole] = useState<String | null>(null);
  const router = useRouter();
  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] gap-2">
      {/* <div className="overflow-auto rounded-md max-h-[90vh] container max-w-screen shadow-lg text-black">
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
                                  { expires: 365 }
                                );
                                Cookies.set(
                                  "user",
                                  JSON.stringify(
                                    jwtDecode(response.data.accessToken)
                                  ),
                                  { expires: 365 }
                                );
                                toast.success("logged in");
                                window.location.href = "/";
                              }
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
      </div> */}
      <div className="grid grid-cols-12">
        <div className="text-center col-span-full font-extrabold text-2xl my-4">
          Welcome, Enter Your Credentials
        </div>
        <PasswordlessLogin />
        <Button className="col-start-3 col-end-11 md:col-start-4 md:col-end-10 text-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 min-w-fit">
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

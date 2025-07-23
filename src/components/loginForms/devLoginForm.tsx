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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <div className="overflow-auto rounded-md max-h-[90vh] container max-w-screen shadow-lg text-black">
        <div>
          <div className="bg-white p-4 px-4 md:p-8 rounded-md">
            <div className="w-full">
              <div className="lg:col-span-2 w-full">
                <div className="my-2 w-full h-max">
                  <div className="mb-4">
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
                  </div>

                  <div className="md:col-span-5 text-right">
                    <div className="items-center flex justify-center flex-col gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        disabled={loading}
                        onClick={async () => {
                          if (email == null || email.length == 0) {
                            toast.error("Email is required");
                            return;
                          }
                          setLoading(true);
                          try {
                            await login(email, role);
                          } catch (err) {
                            alert(err);
                            toast.error("Some error occurred");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        {loading ? "Requesting..." : "Request Access"}
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

import React from "react";
import { url } from "../../helpers/api";
import LockImg from "@/../public/icons/lock.svg";
import toast from "react-hot-toast";

export const LoginWithEmail = (params: { email: String }) => {
  const onClick = async () => {
    const res = await fetch(url("/auth/passwordless"), {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: params.email }),
    });
    console.log(res);
    const resOk = res.ok;
    if (resOk) toast.success("Email Has Been Sent");
    return resOk;
  };

  return (
    <>
      <div>
        <button
          className="bg-white h-2rem px-4 py-2 flex items-center border-2 border-gray-200 rounded-xl hover:shadow-inner transition-shadow"
          onClick={onClick}
        >
          <span>
            <img src={LockImg.src} className="h-8 mr-1" alt="" />
          </span>
          Login With Email
        </button>
      </div>
    </>
  );
};

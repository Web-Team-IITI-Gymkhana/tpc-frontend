import React from "react";
import LockImg from "@/../public/icons/lock.svg";
import toast from "react-hot-toast";
import { loginWithEmail } from "@/helpers/api";
export const LoginWithEmail = (params: { email: string }) => {
  const onClick = async () => {
    try {
      const { email } = params;
      const response = await loginWithEmail(email);

      if (response.ok) {
        toast.success("Email has been sent");
        // Optionally handle further actions upon successful response
      } else {
        toast.error("Cannot login");
      }

      return response.ok;
    } catch (error) {
      toast.error("An error occurred while sending the email");
      return false;
    }
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

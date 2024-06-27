import React from "react";
import GoogleButton from "react-google-button";
import { googleLoginURL } from "@/helpers/googleAuth";
import googleLogo from "@/../public/google_icon.svg";

const GoogleLoginButton = ({ onClick }) => {
  return (
    <button
      className="bg-white h-2rem pl-2 pr-4 flex items-center border-2 border-gray-200 rounded-xl hover:shadow-inner transition-shadow"
      onClick={onClick}
    >
      <img
        src={googleLogo.src}
        alt=""
        className="aspect-square h-12 float-left"
      />
      Login With google
    </button>
  );
};

const GoogleLogin = () => {
  const loginURL = googleLoginURL();
  return (
    <div>
      <GoogleLoginButton
        onClick={() => {
          window.location.href = loginURL;
        }}
      />
    </div>
  );
};

export default GoogleLogin;

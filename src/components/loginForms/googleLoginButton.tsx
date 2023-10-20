"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import GoogleButton from "react-google-button";

const GoogleLoginButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session && session?.user ? (
        <div>
          <button
            onClick={() => signOut()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <GoogleButton onClick={() => signIn("google")}>Sign In</GoogleButton>
        </div>
      )}
    </>
  );
};

export default GoogleLoginButton;

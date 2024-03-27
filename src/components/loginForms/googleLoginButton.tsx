"use client";

import React from "react";
import { signIn } from "next-auth/react";
import GoogleButton from "react-google-button";
import { useSearchParams } from "next/navigation";

const GoogleLoginButton = () => {
    const searchParams = useSearchParams();
    const callbackUrl = "/";

    return (
        <div>
            <GoogleButton onClick={() => signIn("google", { callbackUrl: callbackUrl })}>
                Sign In With Google
            </GoogleButton>
        </div>
    );
};

export default GoogleLoginButton;

"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { loginWithEmail } from "@/helpers/api";
import { handleApiError } from "@/utils/errorHandling";
import ReCAPTCHA from "react-google-recaptcha";

export const LoginWithEmail = ({ email }: { email: string }) => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const onClick = async () => {
    try {
      if (!email || !email.includes("@")) {
        toast.error("Please enter a valid email address");
        return;
      }

      if (!captchaToken) {
        toast.error("Please complete the captcha");
        return;
      }

      setLoading(true);
      const response = await loginWithEmail(email, captchaToken);

      console.log("Login response:", response);

      if (
        response?.statusCode === 429 ||
        response?.message?.includes("Too Many Requests")
      ) {
        toast.error("Too many requests. Please wait and try again.");
      } else if (response.success) {
        toast.success("Login link sent to your email!");
      } else {
        toast.error("Unable to send login link. Please try again.");
      }

      return response;
    } catch (error: any) {
      handleApiError(error, "An error occurred while sending the email");
      return false;
    } finally {
      setLoading(false);
      setCaptchaToken("");
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="space-y-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        onChange={(token) => setCaptchaToken(token || "")}
      />

      <Button
        onClick={onClick}
        disabled={!email || !email.includes("@") || !captchaToken || loading}
        className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors duration-200"
      >
        <Send className="mr-2 h-4 w-4" />
        {loading ? "Sending..." : "Send Login Link"}
      </Button>
    </div>
  );
};

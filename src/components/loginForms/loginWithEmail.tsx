import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import toast from "react-hot-toast";
import { loginWithEmail } from "@/helpers/api";

export const LoginWithEmail = (params: { email: string }) => {
  const onClick = async () => {
    try {
      const { email } = params;
      
      if (!email || !email.includes('@')) {
        toast.error("Please enter a valid email address");
        return;
      }

      console.log(email);
      const response = await loginWithEmail(email);
      
      if (response) {
        toast.success("Login link sent to your email!");
      } else {
        toast.error("Unable to send login link. Please try again.");
      }

      return response;
    } catch (error) {
      toast.error("An error occurred while sending the email");
      return false;
    }
  };

  return (
    <Button
      onClick={onClick}
      className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors duration-200"
      disabled={!params.email || !params.email.includes('@')}
    >
      <Send className="mr-2 h-4 w-4" />
      Send Login Link
    </Button>
  );
};

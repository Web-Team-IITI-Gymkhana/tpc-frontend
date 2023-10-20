//this will be used to create the login page.
import React from "react";
import LoginForm from "@/components/loginForms/loginForm";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <LoginForm />
    </SessionProvider>
  );
};

export default LoginPage;

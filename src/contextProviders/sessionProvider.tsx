"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider
    basePath="/portal/api/auth"
    >{children}</SessionProvider>;
};

export default NextAuthProvider;

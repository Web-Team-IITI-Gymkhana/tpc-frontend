import NextAuth, { NextAuthOptions } from "next-auth";
import { config } from "@/helpers/auth";

const authOptions: NextAuthOptions = {
  ...config,
  secret: process.env.NEXT_PUBLIC_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

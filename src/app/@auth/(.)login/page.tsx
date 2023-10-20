import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionProvider } from "next-auth/react";
import LoginModal from "@/components/loginForms/loginModal";

const LoginModalPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <LoginModal />
    </SessionProvider>
  );
};

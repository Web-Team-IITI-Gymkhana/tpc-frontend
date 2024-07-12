import "../globals.css";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import { Providers } from "@/store/provider";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  return (
    <div className="flex-auto flex h-[92vh] ">
      {/* sidebar and main content share this space */}
      <Suspense fallback={<>Loading...</>}>
        <Sidebar />
      </Suspense>
      <MainContent>
        <Providers>{children}</Providers>
      </MainContent>
    </div>
  );
};

export default AuthLayout;

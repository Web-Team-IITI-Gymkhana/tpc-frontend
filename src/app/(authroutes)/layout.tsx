import "../globals.css";
import { Providers } from "@/store/provider";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  return (
    <div className="flex-auto flex h-[92vh] ">
      <Providers>
        <div className="flex-auto flex h-[92vh] ">
          {/* sidebar and main content share this space */}
          <Suspense fallback={<>Loading...</>}></Suspense>
          <Providers>
            <div className="w-screen min-h-screen h-max bg-[url(/images/iiti_bg.JPG)] bg-cover bg-fixed bg-center bg-no-repeat absolute">
              <div className="w-full min-h-full h-max bg-gradient-to-b from-black/40 to-black/90 bg-opacity-50 absolute">
                {children}
              </div>
            </div>
          </Providers>
        </div>
      </Providers>
    </div>
  );
};

export default AuthLayout;

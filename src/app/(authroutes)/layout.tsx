import "../globals.css";
import { Providers } from "@/store/provider";
import { Suspense } from "react";
import { GraduationCap, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Providers>
        <div className="min-h-screen flex">
          {/* Left side - Brand/Info section - Fixed */}
          <div className="hidden lg:flex lg:w-[560px] lg:flex-col lg:justify-center lg:px-12 bg-gradient-to-br from-gray-800 to-gray-900 lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:z-10">
         
            <div className="space-y-12 opacity-80">
              {/* Logo/Brand Section */}
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Image
                    src="/portal/images/iiti.png"
                    alt="IIT Indore Logo"
                    width={140}
                    height={140}
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Training & Placement Cell
                  </h1>
                  <div className="flex items-center justify-center gap-2 text-slate-300">
                    <GraduationCap className="h-5 w-5" />
                    <p className="text-lg font-medium">Indian Institute of Technology, Indore</p>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
          
          {/* Right side - Form section - Scrollable */}
          <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-12 xl:px-16 bg-white lg:ml-[560px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>}>
                {children}
              </Suspense>
            </div>
          </div>
        </div>
      </Providers>
    </div>
  );
};

export default AuthLayout;

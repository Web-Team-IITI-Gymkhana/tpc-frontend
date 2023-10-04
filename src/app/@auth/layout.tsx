import React, { ReactNode } from "react";

const LoginModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex align-middle justify-center absolute h-fit top-[60px] w-full z-50 p-[20px]">
      <div className="flex-grow bg-blue-500 text-black">{children}</div>
    </div>
  );
};

export default LoginModalLayout;

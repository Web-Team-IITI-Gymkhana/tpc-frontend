import React from "react";

interface Props {
  children: React.ReactNode;
}

const LoginModalLayout = ({ children }: Props) => {
  return (
    <>
      <div className="h-[100%] overflow-y-auto">{children}</div>
    </>
  );
};

export default LoginModalLayout;

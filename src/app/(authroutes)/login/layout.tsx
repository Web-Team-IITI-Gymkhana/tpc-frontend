import React from "react";

interface Props {
  children: React.ReactNode;
}

async function getAuth() {
  const res = await fetch("/api/auth");
  const json = await res.json();
  return json;
}

const LoginModalLayout = ({ children }: Props) => {
  return (
    <>
      <div className="h-[100%] overflow-y-auto">{children}</div>
    </>
  );
};

export default LoginModalLayout;

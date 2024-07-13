import React from "react";
import { apiCall } from  '@/helpers/api';
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

async function getAuth() {
  try {
    const response = await apiCall("/auth");
    return response;
  } catch (error) {
    toast.error("Error Authenticating");
  }
}

const LoginModalLayout = ({ children }: Props) => {
  return (
    <>
      <div className="h-[100%] overflow-y-auto">{children}</div>
    </>
  );
};

export default LoginModalLayout;

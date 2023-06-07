import Loader from "@/components/loader";
import { FunctionComponent } from "react";

interface LoginLoadingProps {}

const LoginLoading: FunctionComponent<LoginLoadingProps> = () => {
  return (
    <>
      <Loader />
    </>
  );
};

export default LoginLoading;

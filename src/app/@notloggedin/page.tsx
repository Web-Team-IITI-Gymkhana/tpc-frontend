import { FunctionComponent, ReactNode } from "react";

interface LoginPageLayoutProps {
  children: ReactNode;
}

const LoginPageLayout: FunctionComponent<LoginPageLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default LoginPageLayout;

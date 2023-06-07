import { FunctionComponent, ReactNode } from "react";

interface LoginPageLayoutProps {
    children:ReactNode;
}
 
const LoginPageLayout: FunctionComponent<LoginPageLayoutProps> = ({children}:{
    children:ReactNode;
}) => {
    return ( <>{children}</> );
}
 
export default LoginPageLayout;
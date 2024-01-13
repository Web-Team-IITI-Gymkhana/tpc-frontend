import { JobFormProvider } from "@/contextProviders/jobFormProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AddJobLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default AddJobLayout;

import { JobFormProvider } from "@/contextProviders/jobFormProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AddJobLayout = ({ children }: Props) => {
  return <JobFormProvider>{children}</JobFormProvider>;
};

export default AddJobLayout;

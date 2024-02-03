import React, { Suspense } from "react";
import Loading from "@/components/common/loading";

interface Props {
  children: React.ReactNode;
}

const AdminJobsLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default AdminJobsLayout;

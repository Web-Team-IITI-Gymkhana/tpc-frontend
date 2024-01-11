import React, { Suspense } from "react";
import Loading from "@/components/common/loading";

interface Props {
  children: React.ReactNode;
}

const AdminJobsLayout = ({ children }: Props) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default AdminJobsLayout;

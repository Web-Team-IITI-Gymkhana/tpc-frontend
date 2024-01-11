import React, { Suspense } from "react";
import Loading from "@/components/common/loading";

interface RecruitersLayoutProps {
  children: React.ReactNode;
}

const RecruitersLayout = ({ children }: RecruitersLayoutProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default RecruitersLayout;

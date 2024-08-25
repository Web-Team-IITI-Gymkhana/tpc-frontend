import Loading from "@/components/common/loading";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const JAFLayout = ({ children }: Props) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default JAFLayout;

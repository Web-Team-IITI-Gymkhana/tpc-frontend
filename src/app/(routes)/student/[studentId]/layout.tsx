import { ReactNode } from "react";

const StudentProfileLayout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-2 mt-[2vh]">{children}</div>;
};

export default StudentProfileLayout;

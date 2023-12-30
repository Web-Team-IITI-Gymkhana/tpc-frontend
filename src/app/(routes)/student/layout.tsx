
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const StudentLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default StudentLayout;

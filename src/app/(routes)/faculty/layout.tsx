import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const FacultyLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default FacultyLayout;

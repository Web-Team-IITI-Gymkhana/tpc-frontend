interface Props {
  children: React.ReactNode;
}

const AdminStudentLayout = ({ children }: Props) => {
  return <div className="mx-2 py-4 rounded-md bg-white">{children}</div>;
};

export default AdminStudentLayout;

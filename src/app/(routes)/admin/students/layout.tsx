interface Props {
  children: React.ReactNode;
}

const AdminStudentLayout = ({ children }: Props) => {
  return (<div>
    {children}
    </div>);
};

export default AdminStudentLayout;

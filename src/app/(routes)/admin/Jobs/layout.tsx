interface Props {
  children: React.ReactNode;
}

const AdminJobsLayout = ({ children }: Props) => {
  return (<div>
    {children}
    </div>);
};

export default AdminJobsLayout;

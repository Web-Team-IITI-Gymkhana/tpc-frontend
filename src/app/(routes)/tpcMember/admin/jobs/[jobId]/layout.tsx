interface Props {
  children: React.ReactNode;
}

const AdminJobLayout = ({ children }: Props) => {
  return <div className="mx-2 my-4 py-4 rounded-md bg-white">{children}</div>;
};

export default AdminJobLayout;

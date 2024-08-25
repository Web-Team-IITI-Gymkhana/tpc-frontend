interface Props {
  children: React.ReactNode;
}

const AdminResumeLayout = ({ children }: Props) => {
  return <div className="mx-2 my-4 rounded-md bg-white">{children}</div>;
};

export default AdminResumeLayout;

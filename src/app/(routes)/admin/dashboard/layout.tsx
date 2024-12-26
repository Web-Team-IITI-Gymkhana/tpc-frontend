interface Props {
    children: React.ReactNode;
  }
  
  const DashboardLayout = ({ children }: Props) => {
    return (
      <div className="">
        <div className="mx-2 mt-4 rounded-md bg-white">{children}</div>
      </div>
    );
  };
  
  export default DashboardLayout;
  
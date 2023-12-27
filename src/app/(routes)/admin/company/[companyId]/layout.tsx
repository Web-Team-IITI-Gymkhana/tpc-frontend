interface Props {
    children: React.ReactNode;
  }
  
  const EachCompanyLayout = ({ children }: Props) => {
    return (<div className="">
      
      {children}
      </div>);
  };
  
  export default EachCompanyLayout;
  
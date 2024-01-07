interface Props {
  children: React.ReactNode;
  allcompanies: React.ReactNode;
}

const CompanyLayout = ({ children, allcompanies }: Props) => {
  return (
    <div className="">
      {/* {allcompanies} */}
      {children}
    </div>
  );
};

export default CompanyLayout;

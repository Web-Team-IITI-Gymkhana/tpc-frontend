interface Props {
  children: React.ReactNode;
  allcompanies: React.ReactNode;
}

const CompanyLayout = ({ children, allcompanies }: Props) => {
  return (
    <div className="grid grid-cols-[300px_auto]">
      {allcompanies}
      {children}
    </div>
  );
};

export default CompanyLayout;

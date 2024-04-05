interface Props {
  children: React.ReactNode;
  allcompanies: React.ReactNode;
}

const CompanyLayout = ({ children, allcompanies }: Props) => {
  return (
    <div className="">
      {/* {allcompanies} */}
      <div className="mx-2 my-4 rounded-md bg-white">{children}</div>
    </div>
  );
};

export default CompanyLayout;

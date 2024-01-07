interface Props {
  children: React.ReactNode;
}

const CompanyLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default CompanyLayout;

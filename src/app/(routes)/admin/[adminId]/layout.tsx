interface Props {
  children: React.ReactNode;
}

const EachAdminLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default EachAdminLayout;

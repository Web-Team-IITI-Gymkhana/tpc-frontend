interface Props {
  children: React.ReactNode;
}

const SeasonsLayout = ({ children }: Props) => {
  return <div className="mx-2 py-4 rounded-md bg-white">{children}</div>;
};

export default SeasonsLayout;

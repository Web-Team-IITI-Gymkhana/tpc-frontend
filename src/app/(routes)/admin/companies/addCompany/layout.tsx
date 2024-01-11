import React from "react";

interface Props {
  children: React.ReactNode;
}

const AddCompanyLayout = ({ children }: Props) => {
  return (
    <div className="mx-2 my-4 px-2 py-4 rounded-md bg-white">{children}</div>
  );
};

export default AddCompanyLayout;

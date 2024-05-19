"use client";
import React from "react";

interface Props {}

const SalaryPage = ({
  params,
}: {
  params: {
    salaryId: String;
  };
}) => {
  return (
    <div>
      <h1>Salary Page</h1>
      <p>Salary ID: {params.salaryId}</p>
    </div>
  );
};

export default SalaryPage;

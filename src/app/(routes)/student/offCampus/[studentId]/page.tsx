"use client";
import React from "react";

interface Props {}

const OffCampusPage = ({
  params,
}: {
  params: {
    studentId: String;
  };
}) => {
  return (
    <div>
      <h1>Off Campus Offers Page</h1>
      <p>Student ID: {params.studentId}</p>
    </div>
  );
};

export default OffCampusPage;

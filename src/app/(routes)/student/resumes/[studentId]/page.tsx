"use client";
import React from "react";

interface Props {}

const ResumePage = ({
  params,
}: {
  params: {
    studentId: String;
  };
}) => {
  return (
    <div>
      <h1>Resume Page</h1>
      <p>Student ID: {params.studentId}</p>
    </div>
  );
};

export default ResumePage;

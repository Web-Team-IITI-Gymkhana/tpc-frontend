//this is the page.tsx file that contains the page component for the recruiter/[recruiterId] route
"use client";
import React from "react";

interface Props {}

const RecruiterPage = ({
  params,
}: {
  params: {
    recruiterId: String;
  };
}) => {
  return (
    <div>
      <h1>Recruiter Page</h1>
      <p>Recruiter ID: {params.recruiterId}</p>
    </div>
  );
};

export default RecruiterPage;

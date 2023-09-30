//this is the page.tsx file that contains the page component for the recruiter/[recruiterId] route
"use client";
import { useParams } from "next/navigation";
import React from "react";

interface Props {}

const RecruiterPage = (props: Props) => {
  const searchParams = useParams();
  const recruiterId = searchParams.recruiterId;

  return (
    <div>
      <h1>Recruiter Page</h1>
      <p>Recruiter ID: {recruiterId}</p>
    </div>
  );
};

export default RecruiterPage;

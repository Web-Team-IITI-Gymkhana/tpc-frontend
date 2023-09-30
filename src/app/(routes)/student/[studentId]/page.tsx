//this is the page.tsx file that contains the page component for the student/[studentId] route
"use client";
import { useParams } from "next/navigation";
import React from "react";

interface Props {}

const StudentPage = (props: Props) => {
  const searchParams = useParams();
  const studentId = searchParams.studentId;

  return (
    <div>
      <h1>Student Page</h1>
      <p>Student ID: {studentId}</p>
    </div>
  );
};

export default StudentPage;

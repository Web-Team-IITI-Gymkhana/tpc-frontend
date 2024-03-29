"use client";
import React from "react";
import JobCard from "@/components/jobs/JobCard";
import { Jobs } from "@/dummyData/job";

interface Props {}

const salaryData = {
  salary: "Rs 40LPA",
};

const StudentPage = ({
  params,
}: {
  params: {
    studentId: String;
  };
}) => {
  return (
    <div>
      <div className="my-3 mx-5 font-bold text-xl">
        <h1>Apply</h1>
      </div>
      <div className="my-3">
        <JobCard jobItem={Jobs[0]} salary={salaryData}/>
      </div>
      <div className="my-3">
        <JobCard jobItem={Jobs[0]} salary={salaryData}/>
      </div>
      <div className="my-3">
        <JobCard jobItem={Jobs[0]} salary={salaryData}/>
      </div>
      <div className="my-3">
        <JobCard jobItem={Jobs[0]} salary={salaryData}/>
      </div>
      <div className="my-3">
        <JobCard jobItem={Jobs[0]} salary={salaryData}/>
      </div>
    </div>
  );
};

export default StudentPage;

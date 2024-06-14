"use client";
import React, { useEffect, useState } from "react";
import SalaryCard from "@/components/jobs/SalaryCard";
import Cookies from "js-cookie";
import { GetJobById, GetResumes } from "@/helpers/student/api";
import { Resume } from "@/helpers/student/types";


interface Salary {
  id: string;
  salaryPeriod: string;
  programs: string[];
  genders: string[];
  categories: string[];
  minCPI: number;
  tenthMarks: number;
  twelthMarks: number;
  facultyApprovals: string[];
  baseSalary: number;
  totalCTC: number;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
}

const SalaryPage = ({ params }: { params: { jobId: string } }) => {
  const [salaryData, setSalaryData] = useState<Salary[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchSalaryData = async () => {
      const data = await GetJobById(params.jobId);
      setSalaryData(data.salaries);

      const res = await GetResumes(Cookies.get("accessToken"));
      setResumes(res);
    };

    fetchSalaryData();
  }, [params.jobId]);

  return (
    <div>
      <div className="font-bold text-black text-lg ml-2 mb-4">Salaries</div>
      {salaryData.length===0? (
        <div>
          No Data
        </div>
      ): (salaryData.map((item,index)=>(
        <div key={index} className="my-3">
          <SalaryCard salaryId={item.id} resumes={resumes}/>
        </div>
      )))}
    </div>
  );
};

export default SalaryPage;

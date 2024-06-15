"use client";
import React, { useEffect, useState } from "react";
import SalaryCard from "@/components/jobs/SalaryCard";
import { GetJobById } from "@/helpers/student/api";
import Cookies from "js-cookie";

interface Props {}
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

  useEffect(() => {
    const fetchSalaryData = async () => {
      const data = await GetJobById(params.jobId, Cookies.get("accessToken"));
      setSalaryData(data.salaries);
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
          <SalaryCard salaryId={item.id}/>
        </div>
      )))}
    </div>
  );
};

export default SalaryPage;

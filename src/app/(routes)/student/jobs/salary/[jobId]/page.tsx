"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { SampleJobData } from "@/dummyData/job";
import { Separator } from "@/components/ui/separator";
import SalaryCard from "@/components/jobs/SalaryCard";
import { GetSalariesArrayByJobId } from "@/helpers/student/api";

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
      const data = await GetSalariesArrayByJobId(params.jobId);
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

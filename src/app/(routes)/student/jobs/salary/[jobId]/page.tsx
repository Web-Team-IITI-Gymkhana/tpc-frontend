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

const SalaryPage = ({ params }: { params: { jobId: String } }) => {
  const [salaryData, setSalaryData] = useState<Salary[]>([]);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/jobs/${params.jobId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch salary data");
        }
        const data = await response.json();
        console.log(data);
        setSalaryData(data.salaries);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
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

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
import { SampleJobData } from '@/dummyData/job';
interface Props {}
interface Salary {
  id: string;
  baseSalary: number;
  totalCTC: number;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
  salaryPeriod: string;
  job: {
    id: string;
    role: string;
    company: {
      id: string;
      name: string;
    };
    season: {
      id: string;
      year: string;
      type: string; // Assuming "INTERN" is a possible value, you might want to use a union type if there are more types.
    };
    salaries: {
      id: string;
      totalCTC: number;
      salaryPeriod: string;
      genders: string[]; // Assuming "MALE" is a possible value, you might want to use a union type if there are more genders.
      programs: string[];
      facultyApprovals: string[];
      categories: string[]; // Assuming "GENERAL" is a possible value, you might want to use a union type if there are more categories.
      minCPI: number;
      tenthMarks: number;
      twelthMarks: number;
    }[];
  };
  others: string;
  genders: string[]; // Assuming "MALE" is a possible value, you might want to use a union type if there are more genders.
  programs: string[];
  facultyApprovals: string[];
  categories: string[]; // Assuming "GENERAL" is a possible value, you might want to use a union type if there are more categories.
  minCPI: number;
  tenthMarks: number;
  twelthMarks: number;
  facultyApprovalRequests: {
    id: string;
    status: string; // Assuming "APPROVED" is a possible value, you might want to use a union type if there are more statuses.
    remarks: string;
    faculty: {
      id: string;
      department: string; // Assuming "Astronomy, Astrophysics and Space Engineering" is a possible value, you might want to use a union type if there are more departments.
      user: {
        id: string;
        name: string;
        email: string;
        contact: string;
      };
    };
  }[];
  onCampusOffers: {
    id: string;
    status: string;
    student: {
      id: string;
      rollNo: string;
      user: {
        id: string;
        name: string;
        email: string;
        contact: string;
      };
      program: {
        id: string;
        branch: string;
        course: string;
        year: string;
        department: string; 
      };
    };
  }[];
}



const SalaryPage = ({params}: { params: { salaryId: String }})=> {

  const [salaryData, setSalaryData] = useState<Salary | null>(null);

  useEffect(() =>{
    const fetchSalaryData = async () => {
      try {
        const response =  await fetch (`http://localhost:5000/api/v1/salaries/${params.salaryId}`);
        if (!response.ok) { 
          throw new Error('Failed to fetch salary data');
        }
        const data = await response.json();
        console.log(data);
        setSalaryData(data);
      }
      catch (error) {
        console.error('Error fetching salary data:', error);
      }
    }

    fetchSalaryData();

  },[params.salaryId]);



  return (
    <div>
      <h1>Salary Page</h1>
      <p>Salary ID: {salaryData?.baseSalary}</p>
    </div>
  );
};

export default SalaryPage;

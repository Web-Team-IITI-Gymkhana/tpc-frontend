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
import { Jobs } from '@/dummyData/job';
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



interface Job {
  id: string;
  seasonId: string;
  recruiterId: string;
  companyId: string;
  role: string;
  active: boolean;
  currentStatus: string;
  companyDetailsFilled: {
    name: string;
    size: number;
    address: {
      city: string;
      line1: string;
      line2: string;
      state: string;
      country: string;
      zipCode: string;
    };
    domains: string[];
    category: string;
    yearOfEstablishment: string;
  };
  recruiterDetailsFilled: {
    name: string;
    email: string;
    contact: string;
    landline: string | null;
    designation: string;
  };
  selectionProcedure: {
    tests: {
      type: string;
      duration: number;
    }[];
    interviews: {
      type: string;
      duration: number;
    }[];
    requirements: Record<string, unknown>; // Update the type as per actual requirements
    selectionMode: string;
    groupDiscussion: boolean;
    shortlistFromResume: boolean;
  };
  attachment: string;
  skills: string;
  location: string;
  noOfVacancies: number;
  offerLetterReleaseDate: string;
  joiningDate: string;
  duration: number;
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    id: string;
    name: string;
  };
  recruiter: {
    id: string;
    userId: string;
    companyId: string;
    designation: string;
    landline: string | null;
  };
  salaries: {
    id: string;
    jobId: string;
    salaryPeriod: string;
    others: string | null;
    criteria: {
      minCPI: number;
      genders: string[];
      programs: string[];
      categories: string[];
      tenthMarks: number;
      twelthMarks: number;
      facultyApprovals: string[];
    };
    baseSalary: number;
    totalCTC: number;
    takeHomeSalary: number;
    grossSalary: number;
    otherCompensations: number;
  }[];
  jobCoordinators: {
    id: string;
    tpcMemberId: string;
    role: string;
    tpcMember: {
      id: string;
      department: string;
      userId: string;
      role: string;
      user: {
        id: string;
        email: string;
        name: string;
        contact: string;
      };
    };
  }[];
}

interface Salaries {
    id: string;
    jobId: string;
    salaryPeriod: string;
    others: string | null;
    criteria: {
      minCPI: number;
      genders: string[];
      programs: string[];
      categories: string[];
      tenthMarks: number;
      twelthMarks: number;
      facultyApprovals: string[];
    };
    baseSalary: number;
    totalCTC: number;
    takeHomeSalary: number;
    grossSalary: number;
    otherCompensations: number;
}[];


const SalaryPage = ({params}: { params: { salaryId: String }})=> {

  const [salaryData, setSalaryData] = useState<Salaries | null>(null);

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
    // setSalaryData(Jobs[0]["salaries"]);

  },[params.salaryId]);



  return (
    <div>
      <h1>Salary Page</h1>
      <p>Salary ID: {salaryData?.baseSalary}</p>
    </div>
  );
};

export default SalaryPage;

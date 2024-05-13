"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {jafs} from "@/dummyData/jaf"
import JafCard from "@/components/JAF/JafCard";

interface Props {}

interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface CompanyDetailsFilled {
  name: string;
  website: string;
  domains: string[];
  category: string;
  address: Address;
  size: number;
  yearOfEstablishment: string;
  annualTurnover: string;
  socialMediaLink: string;
}

interface Test {
  type: string;
  duration: number;
}

interface Interview {
  type: string;
  duration: number;
}

interface Requirements {
  numberOfMembers: number;
  numberOfRooms: number;
  otherRequirements: string;
}

interface SelectionProcedure {
  selectionMode: string;
  shortlistFromResume: boolean;
  groupDiscussion: boolean;
  tests: Test[];
  interviews: Interview[];
  requirements: Requirements;
  others: string;
}

interface RecruiterDetailsFilled {
  name: string;
  designation: string;
  email: string;
  contact: string;
  landline: string;
}

interface Job {
  seasonId: string;
  role: string;
  others: string;
  companyDetailsFilled: CompanyDetailsFilled;
  recruiterDetailsFilled: RecruiterDetailsFilled;
  selectionProcedure: SelectionProcedure;
  description: string;
  skills: string;
  location: string;
  noOfVacancies: number;
  offerLetterReleaseDate: string;
  joiningDate: string;
  duration: number;
}

interface Criteria {
  programs: string[];
  genders: string[];
  categories: string[];
  minCPI: number;
  tenthMarks: number;
  twelthMarks: number;
}

interface Salary {
  salaryPeriod: string;
  criteria: Criteria;
  baseSalary: number;
  totalCTC: number;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
  others: string;
}

interface JAF {
  job: Job;
  salaries: Salary[];
}


const JAFPage = ({
  params,
}: {
  params: {
    recruiterId: String;
  };
}) => {
  return (
    <>
      {jafs.map((jaf,index) => (
        <div className="my-3">
          <JafCard JAF={jaf}/>
        </div>
      ))}
    </>
  );
};

export default JAFPage;

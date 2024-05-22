"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import { SampleJobData } from "@/dummyData/job";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { fetchEachJob } from "@/helpers/api";
import HorizontalTimeline from "@/components/HorizontalTimeline";

const testData = [
  { date: "16/01/2017", status:"older-event" },
  { date: "28/02/2017", status:"older-event" },
  { date: "20/04/2017", status:"older-event" },
  { date: "20/05/2017", status:"older-event" },
  { date: "09/07/2017", status:"selected" },
  { date: "30/08/2017", status:"" },
  // { date: "15/09/2017", status:"" },
  // { date: "01/11/2017", status:"" },
  // { date: "10/12/2017", status:"" },
  // { date: "19/01/2018", status:"" },
  // { date: "03/03/2018", status:"" }
];


interface Props {}

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

function formatNumber(num: number): string {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

const faculty = [
  { name: 'Emily Johnson', designation: 'Professor', email: 'emily.johnson@example.com', phoneNumber: '123-456-7890' },
  { name: 'Alex Smith', designation: 'Assistant Professor', email: 'alex.smith@example.com', phoneNumber: '987-654-3210' },
];

const JobPage = ({ params }: { params: { jobId: string } }) => {

  const [jobData, setJobData] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/jobs/${params.jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }
        const data = await response.json();
        console.log(data);
        setJobData(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
    // setJobData(fetchEachJob(params.jobId))
    // setJobData(Jobs[0]);

  }, [params.jobId]);


  return (
    <div className="m-10 bg-white p-5 border-2 rounded-xl">
        <div className="font-semibold text-xl">{jobData?.companyDetailsFilled.name}</div>
        <div className="text-gray-600 font-medium text-sm my-1">
          {jobData?.companyDetailsFilled.address.city}, {jobData?.companyDetailsFilled.address.state}, {jobData?.companyDetailsFilled.address.country}
        </div>
        <div className="my-4">
            <Separator />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
          <div>
            <div className="text-gray-500 font-semibold my-2">Website</div>{" "}
            <a className="text-blue-500" href={"https://www.goldmansachs.com/"} target="_blank" rel="noopener noreferrer">Link</a>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Domain</div>{" "}
            <div>
              {jobData?.companyDetailsFilled.domains.length === 0
                ? "Not Available"
                : jobData?.companyDetailsFilled.domains[0]}
            </div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
            <div>{jobData?.companyDetailsFilled.category}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Company Size</div>{" "}
            <div>{formatNumber(jobData?.companyDetailsFilled.size ?? 0)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Established</div>{" "}
            <div>{jobData?.companyDetailsFilled.yearOfEstablishment}</div>
          </div>
        </div>
        <div className="my-4">
            <Separator />
        </div>
        <h1 className="text-lg font-semibold my-2">Recruiter</h1>
        <Table className="overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{jobData?.recruiterDetailsFilled.name}</TableCell>
              <TableCell>{jobData?.recruiterDetailsFilled.designation}</TableCell>
              <TableCell>{jobData?.recruiterDetailsFilled.email}</TableCell>
              <TableCell>{jobData?.recruiterDetailsFilled.contact}</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
        <div className="my-4">
            <Separator />
        </div>
        <h1 className="text-lg font-semibold my-2">Job Coordinators</h1>
        <Table className="overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobData?.jobCoordinators.map((coordinator, index) => (
              <TableRow key={index}>
                <TableCell>{coordinator.tpcMember.user.name}</TableCell>
                <TableCell>{coordinator.role}</TableCell>
                <TableCell>{coordinator.tpcMember.department}</TableCell>
                <TableCell>{coordinator.tpcMember.user.email}</TableCell>
                <TableCell>{coordinator.tpcMember.user.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
        <div className="my-4">
            <Separator />
        </div>
        <h1 className="text-lg font-semibold my-2">Faculty Approval Requests</h1>
        <Table className="overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculty.map((faculty, index) => (
              <TableRow key={index}>
                <TableCell>{faculty.name}</TableCell>
                <TableCell>{faculty.designation}</TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
        <div className="my-7">
            <Separator />
        </div>
        <HorizontalTimeline events={testData} />
        <div className="my-7">
            <Separator />
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <Button>
                <a href={"http://localhost:3000/student/jobs/salary/714b4ea1-f3d5-408f-92b4-2f3698aaa656"} target="_blank" rel="noopener noreferrer">Salary</a>
              </Button>
            </div>
            <div>
                <Button>
                  <a href={""} target="_blank" rel="noopener noreferrer">Events</a>
                </Button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default JobPage;

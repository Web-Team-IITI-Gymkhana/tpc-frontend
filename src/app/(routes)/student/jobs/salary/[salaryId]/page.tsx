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

const SalaryPage = ({ params }: { params: { salaryId: String } }) => {
  const [salaryData, setSalaryData] = useState<Salary | null>(null);

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/salaries/${params.salaryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch salary data");
        }
        const data = await response.json();
        console.log(data);
        setSalaryData(data);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      }
    };

    fetchSalaryData();
  }, [params.salaryId]);

  const [isopen, setIsopen] = useState(false);
  const handleViewDetails = () => {
    setIsopen(!isopen);
  };

  const roundOff = (n: number) => {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  };

  const INR = (n: number) => {
    if (n < 100000) return `INR ${n}`;
    if (n < 10000000)
      return `INR ${roundOff((n + Number.EPSILON) / 100000)} Lakhs`;
    else return `INR ${roundOff((n + Number.EPSILON) / 10000000)} Crores`;
  };

  return (
    <div id="main-container" className="">
      <div className="font-bold text-black text-lg ml-2 mb-4">Salaries</div>
      <div className="bg-white text-black p-5 rounded-xl">
        <div
          className="font-semibold text-md"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        >
          {salaryData?.job.company.name}
          <div className="">
            <div className="text-gray-500 font-semibold my-2 text-sm">
              CTC Offered: {INR(salaryData?.totalCTC)}
            </div>
          </div>
        </div>

        <div className="my-4">
          <Separator />
        </div>

        <div
          className="grid md:grid-cols-3 lg:grid-cols-7 text-sm mx-2"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        >
          <div>
            <div className="text-gray-500 font-semibold my-2 pr-2">Role</div>
            <div className="">{salaryData?.job.role}</div>
          </div>
          <div className="md:ml-2 lg:ml-6">
            <div className="text-gray-500 font-semibold my-2">Base Salary</div>
            <div>{INR(salaryData?.baseSalary)}</div>
          </div>
          <div className="">
            <div className="text-gray-500 font-semibold my-2">CTC</div>{" "}
            <div>{INR(salaryData?.totalCTC)}</div>
          </div>
          <div className="">
            <div className="text-gray-500 font-semibold my-2">
              Take Home Salary
            </div>{" "}
            <div>{INR(salaryData?.takeHomeSalary)}</div>
          </div>
          <div className="">
            <div className="text-gray-500 font-semibold my-2">Gross Salary</div>{" "}
            <div>{INR(salaryData?.grossSalary)}</div>
          </div>
          <div className="">
            <div className="text-gray-500 font-semibold my-2">
              Other Compensations
            </div>{" "}
            <div>{INR(salaryData?.otherCompensations)}</div>
          </div>
          <div className="">
            <div className="text-gray-500 font-semibold my-2">Period</div>{" "}
            <div>Annual</div>
          </div>
        </div>

        {isopen && (
          <>
            <div id="criteria" className="my-4 mt-6">
              <div className="my-4">
                <Separator className=" bg-opacity-45" />
              </div>
              <div className="font-semibold text-md mx-2 my-2">Criteria</div>
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Minimum CPI</TableHead>
                    <TableHead>Class X Percentage</TableHead>
                    <TableHead>Class XII Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{roundOff(salaryData?.minCPI)}</TableCell>
                    <TableCell>{roundOff(salaryData?.tenthMarks)} %</TableCell>
                    <TableCell>{roundOff(salaryData?.twelthMarks)} %</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div id="gender" className="my-4 mb-8">
              <div className="font-semibold text-md mx-2 my-2">Gender</div>
              <div className="flex flex-wrap !text-sm">
                {salaryData?.genders.map((g, i) => (
                  <div
                    key={i}
                    className="border px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-full mx-2"
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>

            <div id="categories" className="my-4 mb-8">
              <div className="font-semibold text-md mx-2 my-3">Categories</div>
              <div className="flex flex-wrap !text-sm">
                {salaryData?.categories.map((c, i) => (
                  <div
                    key={i}
                    className="border px-4 py-1 bg-gray-100 text-gray-600 font-medium rounded-full mx-2"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div id="faculty-approval-req" className="">
              <div className="font-semibold text-md mx-2 my-3">
                Faculty Approval Requests
              </div>
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {salaryData?.facultyApprovalRequests.map((g, i) => (
                    <TableRow key={i}>
                      <TableCell>{g.faculty.user.name}</TableCell>
                      <TableCell>{g.faculty.department}</TableCell>
                      <TableCell>{g.faculty.user.email}</TableCell>
                      <TableCell>{g.faculty.user.contact}</TableCell>
                      <TableCell>{g.status}</TableCell>
                      <TableCell className="w-[12vw]">{g.remarks}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalaryPage;

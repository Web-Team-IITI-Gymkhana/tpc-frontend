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
import { Salary } from "@/helpers/student/types";
import { GetSalaryById } from "@/helpers/student/api";

interface Props{
    salaryId: string;
}

export default function SalaryCard({salaryId}: Props) {
    const [salaryData, setSalaryData] = useState<Salary | null>(null);

    useEffect(() => {
      const fetchSalaryData = async () => {
        const data = await GetSalaryById(salaryId);
        setSalaryData(data);
      };
  
      fetchSalaryData();
    }, [salaryId]);
  
    const [isopen, setIsopen] = useState(false);
    const handleViewDetails = () => {
      setIsopen(!isopen);
    };
  
    const roundOff = (n: number) => {
      return Math.round((n + Number.EPSILON) * 100) / 100;
    };
  
    function formatNumber(num: number): string {
      if (num >= 1e7) {
        // Convert to Crores
        const crores = num / 1e7;
        return `₹${crores.toFixed(2)} Crores`;
      } else if (num >= 1e5) {
        // Convert to Lakhs
        const lakhs = num / 1e5;
        return `₹${lakhs.toFixed(2)} Lakhs`;
      } else {
        return `₹${num.toString()}`;
      }
    }
  
    return (
      <div id="main-container" className="">        
        {salaryData===null? (
          <div>No Data</div>
        ): (
          <div className="bg-white text-black p-5 rounded-xl">
          <div
            className="font-semibold text-md"
            onClick={handleViewDetails}
            style={{ cursor: "pointer" }}
          >
            {salaryData?.job.company.name}
            <div className="">
              <div className="text-gray-500 font-semibold my-2 text-sm">
                CTC Offered: {formatNumber(salaryData?.totalCTC)}
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
              <div>{formatNumber(salaryData?.baseSalary)}</div>
            </div>
            <div className="">
              <div className="text-gray-500 font-semibold my-2">CTC</div>{" "}
              <div>{formatNumber(salaryData?.totalCTC)}</div>
            </div>
            <div className="">
              <div className="text-gray-500 font-semibold my-2">
                Take Home Salary
              </div>{" "}
              <div>{formatNumber(salaryData?.takeHomeSalary)}</div>
            </div>
            <div className="">
              <div className="text-gray-500 font-semibold my-2">Gross Salary</div>{" "}
              <div>{formatNumber(salaryData?.grossSalary)}</div>
            </div>
            <div className="">
              <div className="text-gray-500 font-semibold my-2">
                Other Compensations
              </div>{" "}
              <div>{formatNumber(salaryData?.otherCompensations)}</div>
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
        )}
      </div>
    );
}

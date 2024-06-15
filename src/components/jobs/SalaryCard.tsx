"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Resume, Salary } from "@/helpers/student/types";
import { ApplyJob, GetSalaryById } from "@/helpers/student/api";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Props{
    salaryId: string;
    resumes: Resume[];
}

export default function SalaryCard({salaryId, resumes}: Props) {
    const [salaryData, setSalaryData] = useState<Salary | null>(null);

    useEffect(() => {
      const fetchSalaryData = async () => {
        const data = await GetSalaryById(salaryId);
        setSalaryData(data);
      };
  
      fetchSalaryData();
    }, [salaryId]);

    const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const handleResumeChange = (value: string) => {
    setSelectedResume(value);
  };

  const handleApply = async () => {
    const data = await ApplyJob(Cookies.get("accessToken"),salaryId,selectedResume);
    if(data.status===201){
      toast.success("Applied Successfully");
    }
    else{
      toast.error("Cannot Apply");
    }
  }
  
    const [isopen, setIsopen] = useState(false);
    const handleViewDetails = () => {
      setIsopen(!isopen);
    };
  
    function formatNumber(num: number): string {
      if (num >= 1e7) {
        const crores = num / 1e7;
        return `₹${crores.toFixed(2)} Crores`;
      } else if (num >= 1e5) {
        const lakhs = num / 1e5;
        return `₹${lakhs.toFixed(2)} Lakhs`;
      } else if (num >= 1e3) {
        const lakhs = num / 1e3;
        return `₹${lakhs.toFixed(2)}K`;
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
                      <TableCell>{salaryData?.minCPI.toFixed(2)}</TableCell>
                      <TableCell>{(salaryData?.tenthMarks*10).toFixed(2)} %</TableCell>
                      <TableCell>{(salaryData?.twelthMarks*10).toFixed(2)} %</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
  
              <div id="programs" className="my-4 mb-8">
                <div className="font-semibold text-md mx-2 my-2">Programs</div>
                <div className="flex flex-wrap !text-sm">
                  {salaryData.programs?.length > 0 && (
                    <>
                      {salaryData?.programs.map((g, i) => (
                        <div
                          key={i}
                          className="border px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-full mx-2 my-2"
                        >
                          {g}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div id="gender" className="my-4 mb-8">
                <div className="font-semibold text-md mx-2 my-2">Gender</div>
                <div className="flex flex-wrap !text-sm">
                  {salaryData.genders?.length > 0 && (
                    <>
                      {salaryData?.genders.map((g, i) => (
                        <div
                          key={i}
                          className="border px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-full mx-2"
                        >
                          {g}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
  
              <div id="categories" className="my-4 mb-8">
                <div className="font-semibold text-md mx-2 my-3">Categories</div>
                <div className="flex flex-wrap !text-sm">
                {salaryData.categories?.length > 0 && (
                  <>
                    {salaryData?.categories.map((c, i) => (
                      <div
                        key={i}
                        className="border px-4 py-1 bg-gray-100 text-gray-600 font-medium rounded-full mx-2"
                      >
                        {c}
                      </div>
                    ))}
                  </>
                )}
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
              <div className="flex justify-between my-3">
              <Button disabled={!selectedResume} onClick={handleApply}>
                Apply
              </Button>
              <Select value={selectedResume || ''} onValueChange={handleResumeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Resume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {resumes && resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.verified ? (
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            {resume.filepath} 
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"
                                style={{ fill: '#40C057', marginLeft:5 }}>
                              <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path>
                            </svg>    
                          </span>
                        ) : resume.filepath}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            </>
          )}
        </div>
        )}
      </div>
    );
}

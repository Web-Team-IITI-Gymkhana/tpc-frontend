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
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

interface Props{
    salaryId: string;
    resumes: Resume[];
}

export default function SalaryCard({salaryId, resumes}: Props) {
    const [salaryData, setSalaryData] = useState<Salary | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSalaryData = async () => {      
      try {
        const data = await GetSalaryById(salaryId, Cookies.get("accessToken"));
        setSalaryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if(salaryData===null){
        fetchSalaryData();
      }
    });

    const [selectedResume, setSelectedResume] = useState<string | null>(null);

  const handleResumeChange = (value: string) => {
    setSelectedResume(value);
  };

  const handleApply = async () => {
    const data = await ApplyJob(Cookies.get("accessToken"),salaryId,selectedResume);
    if(data.status===201){
      toast.success("Applied Successfully");
      fetchSalaryData();
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
      console.log(num);
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
        {loading && <img src={loadingImg.src} alt="Loading" className="mx-auto my-auto" />}        
        {salaryData && (
          <div className="bg-white text-black p-5 rounded-xl">
          <div className="font-semibold text-md" onClick={handleViewDetails} style={{ cursor: "pointer" }}>
            <div className="flex justify-between">
              {salaryData?.job.company.name}
              {salaryData.job.applications.length > 0 && (
                <>
                  <div className=" text-green-500 font-semibold px-2 py-1 border rounded-3xl inline-block border-green-500 text-xs ">
                    {"Applied"}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="">
            <div className="text-gray-500 font-semibold my-2 text-sm">
              CTC Offered: {formatNumber(salaryData?.totalCTC)}
            </div>              
          </div>
  
          <div className="my-4">
            <Separator />
          </div>
  
          <div
            className="grid md:grid-cols-3 lg:grid-cols-6 text-sm mx-2"
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
              <div className="text-gray-500 font-semibold my-2">Duration</div>{" "}
              <div>{salaryData.salaryPeriod}</div>
            </div>
          </div>
  
          {isopen && (
            <>
              <div className="my-4">
                <Separator />
              </div>
              <div className="my-4 mt-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 text-sm mx-2">
                    <div>
                        <div className="text-gray-500 font-semibold my-2">Selection mode</div>{" "}
                        <div>{salaryData.job.selectionProcedure.selectionMode}</div>
                    </div>
                    <div>
                        <div className="text-gray-500 font-semibold my-2">Shortlist from Resume</div>{" "}
                        <div>{salaryData.job.selectionProcedure.shortlistFromResume? "YES":"NO"}</div>
                    </div>
                    <div>
                        <div className="text-gray-500 font-semibold my-2">Group Discussion</div>{" "}
                        <div>{salaryData.job.selectionProcedure.groupDiscussion? "YES":"NO"}</div>
                    </div>
                </div>
                <div className="my-4">
                  <Separator />
                </div>
                <div className="font-semibold text-md mx-2 my-2">Selection Procedure</div>
                <h2 className="text-md font-semibold mx-2 mt-8">Tests</h2>
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sr.</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryData.job.selectionProcedure.tests.map((test, index) => (
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{test.type}</TableCell>
                            <TableCell>{test.duration}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <h2 className="text-md font-semibold mx-2 mt-8">Interviews</h2>
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sr.</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryData.job.selectionProcedure.interviews.map((test, index) => (
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{test.type}</TableCell>
                            <TableCell>{test.duration}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="my-4">
                <Separator/>
              </div>

              <div className="font-semibold text-md mx-2 my-2">Events</div>
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Round</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salaryData.job.events.map((event, index) => (
                      <TableRow key={index}>
                          <TableCell>{event.roundNumber}</TableCell>
                          <TableCell>{event.type}</TableCell>
                          <TableCell>{event.startDateTime}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>

              {salaryData.job.applications.length > 0 && (
                <>
                  <div className="my-4">
                    <Separator/>
                  </div>

                  <div className="font-semibold text-md mx-2 my-2">Applications</div>
                  <Table className="overflow-hidden">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sr.</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {salaryData.job.applications.map((application, index) => (
                          <TableRow key={index}>
                              <TableCell>{index+1}</TableCell>
                              <TableCell>
                                <Link className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out" target="_blank" href={url(`/resumes/file/${application.resume.filepath}`)}>
                                  {application.resume.filepath}
                                </Link>
                              </TableCell>
                              <TableCell>{application.resume.verified? "Verified": "Not Verified"}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}


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

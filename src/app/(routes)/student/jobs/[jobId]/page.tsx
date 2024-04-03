"use client";
import React from "react";
import JobCard from "@/components/jobs/JobCard";
import { Jobs } from "@/dummyData/job";
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
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {}

const recruiters = [
  { name: 'John Doe', designation: 'HR Manager', email: 'john.doe@example.com', phoneNumber: '123-456-7890' },
  { name: 'Jane Smith', designation: 'Recruiter', email: 'jane.smith@example.com', phoneNumber: '987-654-3210' },
  { name: 'Alice Johnson', designation: 'Senior Recruiter', email: 'alice.johnson@example.com', phoneNumber: '456-789-0123' },
];

const jobCoordinators = [
  { name: 'Michael Brown', designation: 'TPC Manager', email: 'michael.brown@example.com', phoneNumber: '111-222-3333' },
  { name: 'Sarah Adams', designation: 'TPC Manager', email: 'sarah.adams@example.com', phoneNumber: '444-555-6666' },
  { name: 'David Clark', designation: 'TPC Coordinator', email: 'david.clark@example.com', phoneNumber: '777-888-9999' },
];

const faculty = [
  { name: 'Emily Johnson', designation: 'Professor', email: 'emily.johnson@example.com', phoneNumber: '123-456-7890' },
  { name: 'Alex Smith', designation: 'Assistant Professor', email: 'alex.smith@example.com', phoneNumber: '987-654-3210' },
];

const jobPage = ({
  params,
}: {
  params: {
    jobId: String;
  };
}) => {
  return (
    <div className="m-10 bg-white p-5 border-2 rounded-xl">
        <div className="font-semibold text-xl">Goldman Sachs</div>
        <div className="text-gray-600 font-medium text-sm my-1">
          {"Bangalore Sahakarnagar 560092 (India,Karnataka)"}
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
            <div>Finance</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
            <div>MNC</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Company Size</div>{" "}
            <div>45K+</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Established</div>{" "}
            <div>1869</div>
          </div>
        </div>
        <div className="my-4">
            <Separator />
        </div>
        <h1 className="text-lg font-semibold my-2">Recruiters</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recruiters.map((recruiter, index) => (
              <TableRow key={index}>
                <TableCell>{recruiter.name}</TableCell>
                <TableCell>{recruiter.designation}</TableCell>
                <TableCell>{recruiter.email}</TableCell>
                <TableCell>{recruiter.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
        <div className="my-4">
            <Separator />
        </div>
        <h1 className="text-lg font-semibold my-2">Job Coordinators</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobCoordinators.map((jobCoordinator, index) => (
              <TableRow key={index}>
                <TableCell>{jobCoordinator.name}</TableCell>
                <TableCell>{jobCoordinator.designation}</TableCell>
                <TableCell>{jobCoordinator.email}</TableCell>
                <TableCell>{jobCoordinator.phoneNumber}</TableCell>
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
        <Table style={{ overflowY: 'hidden' }}>
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
        <div className="my-4">
            <Separator />
        </div>
        <div>
          <div className="flex justify-between">
            <div>
              <Button>
                <a href={""} target="_blank" rel="noopener noreferrer">Salary</a>
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

export default jobPage;

import React from "react";
import Link from "next/link";
import { Card } from "../ui/card";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jafs } from "@/dummyData/jaf";

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

interface Props {
  JAF: {
    job: Job;
    salaries: Salary[];
  };
}

const JafCard = ({ JAF }: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const skillsArray: string[] = JAF.job.skills
    .split(", ")
    .map((skill) => skill.trim());
  const handleViewDetails = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="">
      <div className="rounded-xl bg-white text-black p-5">
        <div
          className="font-bold text-lg"
          onClick={handleViewDetails}
          style={{ cursor: "pointer" }}
        >
          {JAF.job.seasonId}
        </div>
        {showDescription && (
          <div className="mt-4">
            <div className="my-4">
              <Separator />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-6 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
                <div>{JAF.job.role}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Size</div>{" "}
                <div>{JAF.job.companyDetailsFilled.size}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Year</div>{" "}
                <div>{JAF.job.companyDetailsFilled.yearOfEstablishment}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Turnover</div>{" "}
                <div>{JAF.job.companyDetailsFilled.annualTurnover}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
                <div>{JAF.job.companyDetailsFilled.category}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Website</div>{" "}
                <a
                  className="text-blue-500"
                  href={JAF.job.companyDetailsFilled.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </div>
            </div>
            <div className="my-4">
              <Separator />
            </div>
            <h2 className="text-lg font-semibold my-2">Address</h2>
            <div className="w-full h-30 border-2 p-2 text-sm">
              {JAF.job.companyDetailsFilled.address.line1},{" "}
              {JAF.job.companyDetailsFilled.address.line2},{" "}
              {JAF.job.companyDetailsFilled.address.city}-
              {JAF.job.companyDetailsFilled.address.zipCode},{" "}
              {JAF.job.companyDetailsFilled.address.state},{" "}
              {JAF.job.companyDetailsFilled.address.country}
            </div>

            <div className="my-4">
              <Separator />
            </div>

            <div>
              <h1 className="text-lg font-semibold my-2">Domains</h1>
              <div className="flex flex-wrap !text-md">
                {JAF.job.companyDetailsFilled.domains.map((domain, index) => (
                  <div
                    key={index}
                    className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium"
                  >
                    {domain}
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4">
              <Separator />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">Location</div>{" "}
                <div>{JAF.job.location}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  No. of vacancies
                </div>{" "}
                <div>{JAF.job.noOfVacancies}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Offer letter release
                </div>{" "}
                <div>{JAF.job.offerLetterReleaseDate}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Joining Date
                </div>{" "}
                <div>{JAF.job.joiningDate}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">Duration</div>{" "}
                <div>{JAF.job.duration}</div>
              </div>
            </div>

            <div className="my-4">
              <Separator />
            </div>

            <div>
              <h1 className="text-lg font-semibold my-2">Skills</h1>
              <div className="flex flex-wrap !text-md">
                {skillsArray.map((skill, index) => (
                  <div
                    key={index}
                    className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4">
              <Separator />
            </div>

            <h2 className="text-lg font-semibold my-2">Description</h2>
            <div className="w-full h-30 border-2 p-2 text-sm">
              {JAF.job.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Et ipsum quaerat nulla totam hic est asperiores
              officia porro quis debitis placeat, perferendis sunt quas fugit
              error, quibusdam consectetur modi rem eligendi nobis dolore?
              Dolorem quas fugiat magni placeat iste aliquam rerum! Numquam,
              reiciendis expedita impedit beatae sunt tempore modi natus
              voluptatibus. Quisquam dicta delectus adipisci assumenda
              necessitatibus harum sequi nulla ut expedita incidunt culpa eos
              alias dolor quibusdam eligendi ad blanditiis nisi consequatur,
              deserunt tempore. Tempore, nihil! Doloribus, vero. Nesciunt ad
              eaque asperiores temporibus architecto suscipit. Quis, enim
              aspernatur ut possimus quia, molestias explicabo dolorum aliquid
              accusamus blanditiis ea nobis!
            </div>

            <div className="my-4">
              <Separator />
            </div>

            <h1 className="text-lg font-semibold my-2">Recruiter Details</h1>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Landline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{JAF.job.recruiterDetailsFilled.name}</TableCell>
                  <TableCell>
                    {JAF.job.recruiterDetailsFilled.designation}
                  </TableCell>
                  <TableCell>{JAF.job.recruiterDetailsFilled.email}</TableCell>
                  <TableCell>
                    {JAF.job.recruiterDetailsFilled.contact}
                  </TableCell>
                  <TableCell>
                    {JAF.job.recruiterDetailsFilled.landline}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
            <div className="my-4">
              <Separator />
            </div>

            <h1 className="text-lg font-semibold my-2">Selection Procedure</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Selection mode
                </div>{" "}
                <div>{JAF.job.selectionProcedure.selectionMode}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Shortlist from Resume
                </div>{" "}
                <div>
                  {JAF.job.selectionProcedure.shortlistFromResume
                    ? "YES"
                    : "NO"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Group Discussion
                </div>{" "}
                <div>
                  {JAF.job.selectionProcedure.groupDiscussion ? "YES" : "NO"}
                </div>
              </div>
            </div>

            <h2 className="text-md font-semibold mt-8">Tests</h2>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {JAF?.job.selectionProcedure.tests.map((test, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{test.type}</TableCell>
                    <TableCell>{test.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>

            <h2 className="text-md font-semibold mt-4">Interviews</h2>
            <Table className="overflow-hidden">
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {JAF?.job.selectionProcedure.interviews.map((test, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{test.type}</TableCell>
                    <TableCell>{test.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="my-4">
              <Separator />
            </div>

            <h1 className="text-lg font-semibold my-2">Salaries</h1>
            {JAF.salaries.map((salary, index) => (
              <div key={index} className="my-4 border-2">
                <h2 className="text-md font-semibold mt-4 mx-2">
                  Salary Distribution
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-6 text-sm mx-4">
                  <div>
                    <div className="text-gray-500 font-semibold my-2">
                      Period
                    </div>{" "}
                    <div>{salary.salaryPeriod}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold my-2">
                      Base Salary
                    </div>{" "}
                    <div>{salary.baseSalary}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold my-2">CTC</div>{" "}
                    <div>{salary.totalCTC}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold my-2">
                      Take Home Salary
                    </div>{" "}
                    <div>{salary.takeHomeSalary}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold my-2">
                      Gross Salary
                    </div>{" "}
                    <div>{salary.grossSalary}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 font-semibold my-2">
                      Other Compensations
                    </div>{" "}
                    <div>{salary.otherCompensations}</div>
                  </div>
                </div>
                <h2 className="text-md font-semibold mt-4 mx-2">Criteria</h2>
                <Table className="overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Minimum CPI</TableHead>
                      <TableHead>Tenth Marks</TableHead>
                      <TableHead>Twelth Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salary.criteria.programs.map((program, index) => (
                      <TableRow key={index}>
                        <TableCell>{program}</TableCell>
                        <TableCell>{salary.criteria.minCPI}</TableCell>
                        <TableCell>{salary.criteria.tenthMarks}</TableCell>
                        <TableCell>{salary.criteria.twelthMarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <h2 className="text-md font-semibold mt-4 mx-2">Genders</h2>
                <div className="flex flex-wrap !text-md">
                  {salary.criteria.genders.map((gender, index) => (
                    <div
                      key={index}
                      className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium"
                    >
                      {gender}
                    </div>
                  ))}
                </div>
                <h2 className="text-md font-semibold mt-4 mx-2">Categories</h2>
                <div className="flex flex-wrap !text-md">
                  {salary.criteria.categories.map((category, index) => (
                    <div
                      key={index}
                      className="mx-2 border-2 p-2 !text-md rounded-full my-2 bg-gray-100 text-gray-600 font-medium"
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JafCard;

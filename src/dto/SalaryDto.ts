import { CourseEnum, DepartmentEnum } from "@/dto/Programs";

interface Salary {
  id: string;
  totalCTC: number;
  salaryPeriod: string;
  genders: string[];
  programs: string[];
  facultyApprovals: string[];
  categories: string[];
}

interface Program {
  id: string;
  branch: string;
  course: CourseEnum;
  year: string;
  department: DepartmentEnum;
}

const salaryDto = {
  id: "string",
  baseSalary: 0,
  totalCTC: 0,
  takeHomeSalary: 0,
  grossSalary: 0,
  otherCompensations: 0,
  salaryPeriod: "string",
  job: {
    id: "string",
    role: "string",
    company: {
      id: "string",
      name: "string",
    },
    season: {
      id: "string",
      year: "string",
      type: "INTERN",
    },
    salaries: [
      {
        id: "string",
        totalCTC: 0,
        salaryPeriod: "string",
        genders: ["MALE"],
        programs: ["string"],
        facultyApprovals: ["Astronomy, Astrophysics and Space Engineering"],
        categories: ["GENERAL"],
        minCPI: 0,
        tenthMarks: 0,
        twelthMarks: 0,
      },
    ],
  },
};

export type { Salary, Program };

export { salaryDto };

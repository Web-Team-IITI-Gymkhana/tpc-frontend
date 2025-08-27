import { TPCMember } from "@/components/Admin/types";
import { Program } from "@/dto/StudentDto";
import { ReactNode } from "react";
import { StudentDataType } from "../student/types";

export interface ApplicationFC {
  id: string;
  student: StudentDataType;
  resume: {
    id: string;
    filepath: string;
    name?: string;
    verified: boolean;
    resumeFile?: ReactNode;
  };
  additionalData?: Record<string, string>;
}

export interface EventFC {
  id: string;
  roundNumber: number;
  type: string;
  metadata: string;
  startDateTime: string;
  endDateTime: string;
  applications?: [ApplicationFC];
  job?: JobDetailFC;
}

export interface JAFdetailsFC {
  seasons: [
    {
      id: string;
      type: string;
      year: string;
    },
  ];
  programs: Program;
  genders: string[];
  categories: string[];
  testTypes: string[];
  domains: string[];
  interviewTypes: string[];
  countries: string[];
}

export interface JobDetailFC {
  id: string;
  role: string;
  active: boolean;
  registration: string;
  currentStatus: string;
  attachments: string[];
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    name: string;
    domains: string[];
    category: string;
    address: {
      city: string;
      line1: string;
      line2: string;
      state: string;
      country: string;
    };
    size: number;
    yearOfEstablishment: string;
    annualTurnover: string;
    socialMediaLink: string;
  };
  recruiter: {
    designation: string;
    id: string;
    user: {
      id: string;
      email: string;
      name: string;
      contact: string;
    };
  };
  recruiterDetailsFilled: Array<{
    name: string;
    email: string;
    contact: string;
    designation: string;
    landline?: string;
  }>;
  selectionProcedure: {
    selectionMode: string;
    shortlistFromResume: boolean;
    groupDiscussion: boolean;
    tests: Array<{
      type: string;
      duration: string;
    }>;
    interviews: Array<{
      type: string;
      duration: string;
    }>;
    requirements: {
      numberOfMembers: number;
      numberOfRooms: number;
      otherRequirements: string;
    };
    others: string;
  };
  description: string;
  skills: string[];
  offerLetterReleaseDate: string;
  joiningDate: string;
  location: string;
  minNoOfHires?: number;
  expectedNoOfHires?: number;
  duration: string;
  feedback: string;
  jobCoordinators: Array<{
    id: string;
    role: string;
    tpcMember: TPCMember;
  }>;
  events: Array<{
    id: string;
    roundNumber: number;
    type: string;
    metadata: string;
    startDateTime: string;
    endDateTime: string;
    visibleToRecruiter: boolean;
  }>;
  salaries: SalaryFC[];
}

export interface SalaryFC {
  id: string;
  genders: string[];
  programs: Program[];
  facultyApprovals: string[];
  categories: string[];
  minCPI: number;
  tenthMarks: number;
  twelthMarks: number;

  // PLACEMENT
  baseSalary?: number;
  totalCTC?: number;
  takeHomeSalary?: number;
  grossSalary?: number;
  joiningBonus?: number;
  performanceBonus?: number;
  relocation?: number;
  bondAmount?: number;
  esopAmount?: number;
  esopVestPeriod?: string;
  firstYearCTC?: number;
  retentionBonus?: number;
  deductions?: number;
  medicalAllowance?: number;
  bondDuration?: string;
  foreignCurrencyCTC?: number;
  foreignCurrencyCode?: string;
  otherCompensations?: number;
  salaryPeriod?: string;
  others?: string;

  // INTERNSHIP
  stipend?: number;
  foreignCurrencyStipend?: number;
  accommodation?: boolean;
  ppoProvisionOnPerformance?: boolean;
  tentativeCTC?: number;
  PPOConfirmationDate?: Date;
}

export interface JobsFC {
  id: string;
  role: string;
  active: boolean;
  currentStatus: string;
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    id: string;
    name: string;
  };
}

export interface updateProfileFC {
  designation?: string;
  landline?: string;
  company?: {
    name?: string;
    website?: string;
    domains?: any[];
    category?: string;
    address?: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      country: string;
    };
    size?: number;
    yearOfEstablishment?: string;
    annualTurnover?: string;
    socialMediaLink?: string;
  };
  user?: {
    name: string;
    email: string;
    contact: string;
  };
}

export interface ProfileFC {
  id: string;
  designation: string;
  landline: string;
  user: {
    id: string;
    email: string;
    name: string;
    contact: string;
  };
  company: {
    name: string;
    domains: string[];
    category: string;
    address: {
      city: string;
      line1: string;
      line2: string;
      state: string;
      country: string;
      zipCode: string;
    };
    size: number;
    yearOfEstablishment: string;
    socialMediaLink: string;
  };
}

export interface CompanyPostFC {
  name: string;
  category: string;
  yearOfEstablishment: string;
  website: string;
  size: number;
  annualTurnover: string;
  socialMediaLink: string;
  domains: string[];
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
  };
}

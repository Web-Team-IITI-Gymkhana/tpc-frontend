import { TPCMember } from "@/components/Admin/types";
import { Program } from "@/dto/StudentDto";
import { ReactNode } from "react";

export interface ApplicationFC {
  id: string;
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
  resume: {
    id: string;
    filepath: string;
    verified: boolean;
    resumeFile?: ReactNode;
  };
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
  recruiter : {
    designation: string;
    id: string;
    user: {
      id: string;
      email: string;
      name: string;
      contact: string;
    };
  };
  selectionProcedure: {
    selectionMode: string;
    shortlistFromResume: true;
    groupDiscussion: true;
    tests: [
      {
        type: string;
        duration: number;
      },
    ];
    interviews: [
      {
        type: string;
        duration: number;
      },
    ];
    requirements: {
      numberOfMembers: number;
      numberOfRooms: number;
      otherRequirements: string;
    };
    others: string;
  };
  description: string;
  attachment: string;
  skills: string;
  offerLetterReleaseDate: string;
  joiningDate: string;
  location: string;
  noOfVacancies: number;
  duration: number;
  feedback: string;
  jobCoordinators: [
    {
      id: string;
      role: string;
      tpcMember: TPCMember;
    },
  ];
  events: [
    {
      id: string;
      roundNumber: number;
      type: string;
      metadata: string;
      startDateTime: string;
      endDateTime: string;
      visibleToRecruiter: true;
    },
  ];
  salaries: SalaryFC[];
}

export interface SalaryFC {
  id: string;
  baseSalary: string;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
  totalCTC: number;
  salaryPeriod: string;
  genders: string[];
  programs: Program[];
  facultyApprovals: string[];
  categories: string[];
  minCPI: number;
  tenthMarks: number;
  twelthMarks: number;
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
  size: 0;
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

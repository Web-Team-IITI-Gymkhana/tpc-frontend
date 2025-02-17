// UserDTO
interface UserDTO {
  id: string;
  name: string;
  email: string;
  contact: string;
}

// RecruiterDTO
interface RecruiterDTO {
  id: string;
  designation: string;
  user: UserDTO;
}

// SeasonDTO
interface SeasonDTO {
  id: string;
  year: string;
  type: string;
}

// CompanyDTO
interface CompanyDTO {
  id: string;
  name: string;
}

// RecruitmentDTO
interface RecruitmentDTO {
  id: string;
  role: string;
  active: boolean;
  currentStatus: string;
  noOfVacancies: number;
  duration: number;
  location: string;
  season: SeasonDTO;
  company: CompanyDTO;
  recruiter: RecruiterDTO;
}

// Example data matching the DTO structure
const recruitmentDTO = [
  {
    company: {
      id: "string",
      name: "string",
    },
    recruiter: {
      id: "string",
      user: {
        id: "string",
        name: "string",
        email: "string",
        contact: "string",
      },
      designation: "string",
    },
    recruiterDetailsFilled: [{
      designation: "string",
      email: "string",
      phoneNumber: "string",
      landline: "string",
    }],
    id: "string",
    role: "string",
    active: "boolean",
    currentStatus: "INITIALIZED",
    noOfVacancies: "number",
    duration: "number",
    location: "string",
    season: {
      id: "string",
      year: "string",
      type: "INTERN",
    },
  },
];

export type { RecruitmentDTO, SeasonDTO, CompanyDTO, RecruiterDTO, UserDTO };
export { recruitmentDTO };

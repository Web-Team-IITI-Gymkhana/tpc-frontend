import { CourseEnum, DepartmentEnum } from "@/dto/Programs";

// SeasonDTO
interface SeasonsDTO {
  id: string;
  type: string;
  year: string;
}

// StudentDTO
interface StudentDTO {
  id: string;
  program: ProgramDTO;
  rollNo: string;
  user: UserDTO;
}

// ProgramDTO
interface ProgramDTO {
  branch: string;
  course: CourseEnum;
  department: DepartmentEnum;
  id: string;
  year: string;
}

// UserDTO
interface UserDTO {
  contact: string;
  email: string;
  id: string;
  name: string;
}

// SeasonDTO
interface SeasonDTO {
  id: string;
  registered: boolean;
  season: SeasonsDTO;
  student: StudentDTO;
}

const seasonDTO = [
  {
    id: "string",
    registered: "boolean",
    season: {
      id: "string",
      type: "string",
      year: "string",
    },
    student: {
      id: "string",
      program: {
        branch: "string",
        course: "string",
        department: "string",
        id: "string",
        year: "string",
      },
      rollNo: "string",
      user: {
        name: "string",
        contact: "string",
        email: "string",
        id: "string",
      },
    },
  },
];

export type { SeasonDTO };
export { seasonDTO };

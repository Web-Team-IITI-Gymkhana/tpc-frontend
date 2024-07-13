import { ReactNode } from "react";
import { DTO } from "./StudentDto";
import { Url } from "url";

interface Resume {
  id: string;
  filepath: string;
  verified: boolean;
  student: DTO;
}

interface ResumeTableData {
  id: string;
  filepath: string | ReactNode;
  verified: boolean | ReactNode;
  update: ReactNode;
  student: DTO;
}

const resumeDto = [
  {
    id: "string",
    filepath: "string",
    verified: true,
    student: {
      id: "string",
      rollNo: "string",
      user: {
        id: "string",
        name: "string",
        email: "string",
        contact: "string",
      },
      program: {
        id: "string",
        branch: "string",
        course: "string",
        year: "string",
        department: "Astronomy, Astrophysics and Space Engineering",
      },
    },
  },
];

export type { Resume, ResumeTableData };
export { resumeDto };

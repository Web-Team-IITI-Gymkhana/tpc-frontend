import { CourseEnum, DepartmentEnum } from "@/dto/Programs";

export interface Program {
  id: string;
  branch: string;
  course: CourseEnum;
  year: string;
  department: DepartmentEnum;
}

interface User {
  id: string;
  name: string;
  email: string;
  contact: string;
}

interface Student {
  id: string;
  program: Program;
  user: User;
}

export interface TPCMember {
  id: string;
  role: string;
  student: Student;
}
export interface JobCoordinatorFC {
  id: string;
  role: string;
  tpcMember: TPCMember;
}

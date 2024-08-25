
interface Program {
  id: string;
  branch: string;
  course: string;
  year: string;
  department: string;
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

import { apiCall } from "../api";

export interface StudentUser {
  name: string;
  email: string;
  contact: string;
}

export interface StudentPayload {
  programId: string;
  rollNo: string;
  category: string;
  gender: string;
  cpi: number;
  user: StudentUser;
}

export async function addStudents(students: StudentPayload[]): Promise<any> {
  return apiCall("/students", {
    method: "POST",
    body: students,
  });
}

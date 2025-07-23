import { apiCall } from "../api";
import { DTO as TPCMemberDTO } from "@/dto/TPCMemberDto";

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

export interface RegistrationPayload {
  studentId: string;
  seasonId: string;
  registered: boolean;
}

export interface TPCMemberPayload {
  studentId: string;
  role: "MANAGER" | "COORDINATOR";
}

export async function addStudents(students: StudentPayload[]): Promise<any> {
  return apiCall("/students", {
    method: "POST",
    body: students,
  });
}

export async function createRegistrations(
  payload: RegistrationPayload[],
): Promise<any> {
  return apiCall("/registrations", {
    method: "POST",
    body: payload,
  });
}

export async function promoteToManagers(
  payload: TPCMemberPayload[],
): Promise<any> {
  return apiCall("/tpc-members", {
    method: "POST",
    body: payload,
  });
}

export async function fetchTPCMembers(): Promise<TPCMemberDTO[]> {
  return apiCall("/tpc-members", {
    method: "GET",
  });
}

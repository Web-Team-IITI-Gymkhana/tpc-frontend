export interface OnCampus {
  aid: string;
  eventId: string;
  startDateTime: string;
  endDateTime: string;
  roundNumber: number;
  type: string;
  studentId: string;
  rollNo: string;
  gender: string;
  cpi: number;
  name: string;
  email: string;
  contact: string;
  course: string;
  branch: string;
  department: string;
  year: string;
  role: string;
  companyName: string;
  status: string;
  baseSalary: number;
  totalCTC: number;
  takeHomeSalary: number;
  grossSalary: number;
  otherCompensations: number;
}

export interface Event {
  aid: string;
  caid: string;
  eventId: string;
  ceventId: string;
  startDateTime: string;
  cstartDateTime: string;
  endDateTime: string;
  cendDateTime: string;
  roundNumber: number;
  croundNumber: number;
  type: string;
  ctype: string;
  studentId: string;
  jobId: string;
  rollNo: string;
  gender: string;
  cpi: number;
  name: string;
  email: string;
  contact: string;
  course: string;
  branch: string;
  department: string;
  year: string;
  role: string;
  companyName: string;
}

export interface OffCampus {
  aid: string;
  eventId: string;
  startDateTime: string;
  endDateTime: string;
  roundNumber: number;
  type: string;
  studentId: string;
  rollNo: string;
  gender: string;
  cpi: number;
  name: string;
  email: string;
  contact: string;
  course: string;
  branch: string;
  department: string;
  year: string;
  role: string;
  companyName: string;
  salary: number;
  status: string;
}

export interface ClashesFC {
  onCampus: OnCampus[];
  event: Event[];
  offCampus: OffCampus[];
}

export const clashesDto = {
  onCampus: [
    {
      aid: "string",
      eventId: "string",
      startDateTime: "2024-10-03T06:36:43.055Z",
      endDateTime: "2024-10-03T06:36:43.055Z",
      roundNumber: 0,
      type: "POLL",
      studentId: "string",
      rollNo: "string",
      gender: "MALE",
      cpi: 0,
      name: "string",
      email: "string",
      contact: "string",
      course: "string",
      branch: "string",
      department: "Astronomy, Astrophysics and Space Engineering",
      year: "string",
      role: "string",
      companyName: "string",
      status: "ACCEPTED",
      baseSalary: 0,
      totalCTC: 0,
      takeHomeSalary: 0,
      grossSalary: 0,
      otherCompensations: 0,
    },
  ],
  event: [
    {
      aid: "string",
      caid: "string",
      eventId: "string",
      ceventId: "string",
      startDateTime: "2024-10-03T06:36:43.055Z",
      cstartDateTime: "2024-10-03T06:36:43.055Z",
      endDateTime: "2024-10-03T06:36:43.055Z",
      cendDateTime: "2024-10-03T06:36:43.055Z",
      roundNumber: 0,
      croundNumber: 0,
      type: "POLL",
      ctype: "POLL",
      studentId: "string",
      jobId: "string",
      rollNo: "string",
      gender: "MALE",
      cpi: 0,
      name: "string",
      email: "string",
      contact: "string",
      course: "string",
      branch: "string",
      department: "Astronomy, Astrophysics and Space Engineering",
      year: "string",
      role: "string",
      companyName: "string",
    },
  ],
  offCampus: [
    {
      aid: "string",
      eventId: "string",
      startDateTime: "2024-10-03T06:36:43.055Z",
      endDateTime: "2024-10-03T06:36:43.055Z",
      roundNumber: 0,
      type: "POLL",
      studentId: "string",
      rollNo: "string",
      gender: "MALE",
      cpi: 0,
      name: "string",
      email: "string",
      contact: "string",
      course: "string",
      branch: "string",
      department: "Astronomy, Astrophysics and Space Engineering",
      year: "string",
      role: "string",
      companyName: "string",
      salary: 0,
      status: "ACCEPTED",
    },
  ],
};

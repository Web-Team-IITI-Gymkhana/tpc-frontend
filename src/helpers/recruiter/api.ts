import axios from "axios";
import {
  JobDetailFC,
  updateProfileFC,
  SalaryFC,
} from "./types";
import { apiCall } from "../api";

const redirect = () => {};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const fetchProfile = async () => {
  return apiCall(`/recruiter-view/recruiter`);
};

export const patchProfile = async (changes: updateProfileFC) => {
  return apiCall(`/recruiter-view/recruiter`, {method: "PATCH", body: changes});
};

export const getJobs = async () => {
  return apiCall(`/recruiter-view/jobs`);
};

export const getJobDetail = async (id: string) => {
  return apiCall(`/recruiter-view/jobs/${id}`);
};

export async function getEvent(id: string) {
  return apiCall(`/recruiter-view/events/${id}`);
}

export async function getDomains() {
  return apiCall(`/jaf`);
}

export async function getJafDetails() {
  return apiCall(`/jaf`);
}

export const getResume = (
  accessToken: string | undefined,
  filename: string
) => {
  const u1 = url(`/recruiter-view/resume/${filename}`);
  axios
    .get(u1, {
      responseType: "blob",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      window.open(URL.createObjectURL(response.data));
    });
};

export const patchJobData = async (jobId: string, changes: JobDetailFC) => {

  const patchFormat = {
    role: "string",
    noOfVacancies: 0,
    duration: 0,
    location: "string",
    selectionProcedure: {
      selectionMode: "OFFLINE",
      shortlistFromResume: true,
      groupDiscussion: true,
      tests: [
        {
          type: "APTITUDE",
          duration: 0,
        },
      ],
      interviews: [
        {
          type: "HR",
          duration: 0,
        },
      ],
      requirements: {
        numberOfMembers: 0,
        numberOfRooms: 0,
        otherRequirements: "string",
      },
      others: "string",
    },
    description: "string",
    attachment: "string",
    skills: "string",
    offerLetterReleaseDate: "2024-06-24T06:42:48.242Z",
    joiningDate: "2024-06-24T06:42:48.242Z",
    feedback: "string",
  };

  const toPatch = {};
  Object.entries(patchFormat).map(
    ([key]) => (toPatch[key] = changes[key])
  );
  return apiCall(`/recruiter-view/jobs/${jobId}`, {method: "PATCH", body: toPatch});
};

export const patchSalaryData = async (salary: SalaryFC) => {
  const patchFormat = {
    baseSalary: 0,
    totalCTC: 0,
    takeHomeSalary: 0,
    grossSalary: 0,
    otherCompensations: 0,
    genders: [],
    programs: [],
    categories: [],
    salaryPeriod: "",
    minCPI: 0,
    tenthMarks: 0,
    twelthMarks: 0,
  };

  const toPatch = {};
  Object.entries(patchFormat).map(
    ([key]) => (toPatch[key] = salary[key])
  );
  return apiCall(`/recruiter-view/salary/${salary.id}`, {method: "PATCH", body: toPatch});
};

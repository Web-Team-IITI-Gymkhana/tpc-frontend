const redirect = () => { };
import { SampleJobData } from "@/dummyData/job";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const fetchAllSeasons = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url("/seasons"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

export const fetchCompany = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url("/companies"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

export const fetchAllJobs = async (accessToken: string | undefined,filter: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  console.log('filter', filter)
  const res = await fetch(filter ? url(`/jobs?${filter}`) : url("/jobs"), {
    next: { tags: ["AllJobs"] },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
  // return SampleJobData
};

export const fetchStudentData = async (accessToken: string | undefined, filter: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  console.log('filter', filter)
  const res = await fetch(filter ? url(`/students?${filter}`) : url("/students"), {
    next: { tags: ["AllStudents"] },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

export const fetchCompanyRecruiters = async (
  accessToken: string | undefined,
  companyId: string | undefined,
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(`${url("/companies")}/${companyId}/recruiters/`, {
    next: {
      tags: ["AllRecruiters"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

export const fetchJobSalary = async (
  accessToken: string | undefined,
  jobId: string | undefined,
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(`${url("/jobs")}/${jobId}/salary/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

export const fetchEachJob = async (
  accessToken: string | undefined,
  jobId: any,
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(`${url("/jobs")}/${jobId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await res.json();
  return json;
};

export const fetchJobEvents = async (
  accessToken: string | undefined,
  jobId: any,
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(`${url("/jobs")}/${jobId}/events`, {
    next: {
      tags: ["AllEvents"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await res.json();
  return json;
};


export const fetchRecruiterData = async (accessToken: string | undefined, filter: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  console.log('filter', filter)
  const res = await fetch(filter ? url(`/recruiters?${filter}`) : url("/recruiters"), {
    next: { tags: ["AllRecruiters"] },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};
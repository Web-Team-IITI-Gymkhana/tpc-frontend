import { AllCompanies } from "@/dummyData/company";
import axios from "axios";

const url = (NextUrl: string) => {
  return `http://10.250.9.45:3000/api/v1${NextUrl}`;
  // return `${process.env.BACKEND_URL}/api/v1${NextUrl}`;
};

const redirect = () => {
  //we need to write logic to redirect if accessToken is undefined
};

//an api call to get all the seasons
export const fetchAllSeasons = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let res = await fetch(url("/seasons"), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.json();
  return json;
};

//api call to fetch all companies based on the season
export const fetchCompany = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url("/companies");
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.json();
  return json;
};

export const fetchEachCompanyDetails = async (
  accessToken: string | undefined,
  id: String
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  // const res = await fetch('')
  // const json = res.json()
  // return json
  return AllCompanies.find((x) => x.id === id);
};

export const fetchAllJobs = async (
  accessToken: string | undefined,
  seasonId: string | null | undefined,
  recruiterId: string | null | undefined,
  companyId: string | null | undefined,
  role: string | null | undefined,
  active: boolean | null | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url("/jobs?");
  if (companyId) apiUrl += `companyId=${companyId}&`;
  if (seasonId) apiUrl += `seasonId=${seasonId}&`;
  if (recruiterId) apiUrl += `recruiterId=${recruiterId}&`;
  if (role) apiUrl += `role=${role}&`;
  if (active !== null) apiUrl += `active=${active}&`;
  apiUrl = apiUrl.replace(/&$/, "");
  console.log(apiUrl);
  const res = await fetch(apiUrl, {
    next: {
      tags: ["AllJobs"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await res.json();
  return json;
};

export const fetchStudentData = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url("/students");
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.json();
  return json;
};

export const fetchCompanyRecruiters = async (
  accessToken: string | undefined,
  companyId: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url(`/companies/${companyId}/recruiters`);
  const res = await fetch(apiUrl, {
    next: {
      tags: ["AllRecruiters"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.json();
  return json;
};

export const fetchJobSalary = async (
  accessToken: string | undefined,
  jobId: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url(`/jobs/${jobId}/salary`);
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.json();
  return json;
};

export const fetchEachJob = async (
  accessToken: string | undefined,
  jobId: String | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url(`/jobs/${jobId}`);
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = res.json();
  return json;
};

export const fetchJobEvents = async (
  accessToken: string | undefined,
  jobId: String | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  let apiUrl = url(`/jobs/${jobId}/events`);
  const res = await fetch(apiUrl, {
    next: {
      tags: ["AllEvents"],
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = res.json();
  return json;
};

export const passwordlessLoginVerify = async (token: string) => {
  let apiUrl = url("/auth/passwordless/verify");
  const response = await axios
    .post(apiUrl, {
      token: token,
    })
    .catch((err) => {
      console.log(err);
    });
  if (response?.data.success === true) {
    return {
      ...response,
      data: { ...response.data, message: "Success" },
    };
  } else {
    return response;
  }
};

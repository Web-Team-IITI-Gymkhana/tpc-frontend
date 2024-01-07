import { AllCompanies } from "@/dummyData/company";
import { Jobs } from "@/dummyData/job";
import { StudentsData } from "@/dummyData/students";
const url = (NextUrl: string) => {
  return `http://tpc.iiti.ac.in/api/v1${NextUrl}`;
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
  const res = await fetch(url("/seasons"), {
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
  const res = await fetch("http://tpc.iiti.ac.in/api/v1/companies", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = res.json();
  return json;
};

export const fetchEachCompanyDetails = async (
  accessToken: string | undefined,
  id: String,
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
  seasonId: string | null,
  recruiterId: string | null,
  companyId: string | null,
  role: string | null,
  active: boolean | null,
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

  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json = await res.json();
  return json;
};

export const fetchEachJob = (accessToken: string | undefined, id: String) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  // const res = await fetch('')
  // const json = res.json()
  // return json

  return Jobs.find((x) => x.id === id);
};

export const fetchStudentData = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  // const res = await fetch('')
  // const json = res.json()
  // return json
  return StudentsData;
};

const redirect = () => { };
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import qs from "qs";
import Cookies from "js-cookie";
import { ResumePatchData } from "./types";

interface ApiCallOptions {
  method?: string;
  isAuth?: boolean;
  body?: object;
  queryParam?: object;
  next?: object;
  formData?: FormData;
}

export const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const getUrl = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const apiCall = async (
  path: string,
  {
    method = "GET",
    isAuth = true,
    body = null,
    queryParam = null,
    formData = null,
    next = null,
  }: ApiCallOptions = {}
) => {
  const accessToken = Cookies.get("accessToken");
  if ((!accessToken || accessToken === undefined) && isAuth) {
    redirect();
    return;
  }

  let url = getUrl(path);

  const headers: HeadersInit = {};

  const req = {
    method: method,
  };

  if ((method == "POST" || method == "PATCH") && body) {
    req["body"] = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  if ((method == "POST" || method == "PATCH") && formData) {
    req["body"] = formData;
    headers["accept"] = "application/json";
  }
  if (method == "DELETE") {
    headers["accept"] = "application/json";
  }

  if (queryParam) {
    const encodedQueryString = qs.stringify(queryParam, {
      encodeValuesOnly: true,
      encode: false,
    });
    url += `?${encodedQueryString}`;
  }

  if (isAuth) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  req["headers"] = headers;

  if (next) {
    req["next"] = next;
  }

  const res = await fetch(url, req);
  if (method === "GET") {
    return await res.json();
  } else return res.ok;
};
export const OpenFile = async (
  path: string,
  { method = "GET", isAuth = true, next = null }: ApiCallOptions = {}
) => {
  const accessToken = Cookies.get("accessToken");
  if ((!accessToken || accessToken === undefined) && isAuth) {
    redirect();
    return;
  }

  let url = getUrl(path);

  const headers: HeadersInit = {};

  const req = {
    method: method,
  };

  if (isAuth) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  req["headers"] = headers;

  if (next) {
    req["next"] = next;
  }

  fetch(url, req)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })
    .catch((error) => console.error("Error:", error));
};

export const PasswordlessLogin = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url("/auth/passwordless/verify"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
  });
  const body = await res.json();
  return { status: res.status, body };
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

export const assignCompany = async (
  accessToken: string | undefined,
  assignments: { id: string; companyId: string }[]
) => {
  if (!accessToken) {
    redirect();
    return;
  }

  const res = await fetch(url("/jobs"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(assignments),
  });

  if (!res.ok) {
    throw new Error("Failed to assign company");
  }

  const json = await res.json();
  return json;
};

export const assignRecruiter = async (
  accessToken: string | undefined,
  assignments: { id: string; recruiterId: string }[]
) => {
  if (!accessToken) {
    redirect();
    return;
  }

  const res = await fetch(url("/jobs"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(assignments),
  });

  if (!res.ok) {
    throw new Error("Failed to assign recruiter");
  }

  const json = await res.json();
  return json;
};

export const fetchAllJobs = async (
  accessToken: string | undefined,
  filter: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
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

export const fetchStudentData = async (
  accessToken: string | undefined,
  filter: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(
    filter ? url(`/students?${filter}`) : url("/students"),
    {
      next: { tags: ["AllStudents"] },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await res.json();
  return json;
};

export const fetchSeasonData = async (
  accessToken: string | undefined,
  filter: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(
    filter ? url(`/registrations?${filter}`) : url("/registrations"),
    {
      next: { tags: ["AllStudents"] },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await res.json();
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
  jobId: string | undefined
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
  jobId: any
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

export const fetchJobEvents = async (jobId: any) => {
  return apiCall(`/events`, {
    queryParam: {
      q: {
        filterBy: {
          job: {
            id: {
              eq: [jobId],
            },
          },
        },
      },
    },
  });
};

export const fetchEventById = async (eventId: any) => {
  return apiCall(`/events/${eventId}`);
};

export const addEvent = async (body: any) => {
  return apiCall(`/events`, {
    method: "POST",
    body: body,
  });
};

export const promoteStudent = async (body: any, eventId: string) => {
  return apiCall(`/events/${eventId}`, {
    method: "PATCH",
    body: body,
  });
};

export const fetchRecruiterData = async (
  accessToken: string | undefined,
  filter: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }

  const res = await fetch(
    filter ? url(`/recruiters?${filter}`) : url("/recruiters"),
    {
      next: { tags: ["AllRecruiters"] },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await res.json();
  return json;
};

export const fetchResumes = async () => {
  return apiCall("/resumes");
};

export const getResumeFile = async (fileName: string) => {
  OpenFile(`/resumes/file/${fileName}`);
};

export const patchResumeVerify = async (changes: ResumePatchData[]) => {
  return apiCall(`/resumes`, {
    method: "PATCH",
    body: changes,
  });
};

export const getStudentSalaryOffers = async (
  jobId: string,
  studentId: string
) => {
  return apiCall(`/on-campus-offers/salaries/${jobId}/student/${studentId}`);
};

export const postOnCampusOffer = async (
  body: {
    salaryId: string;
    studentId: string;
    status: string;
  }[]
) => {
  return apiCall(`/on-campus-offers/`, {
    method: "POST",
    body: body,
  });
};

export const fetchTpcMembers = async () => {
  return apiCall(`/tpc-members`);
};

export const postJobCoordinator = async (
  body: {
    jobId: string;
    tpcMemberId: string;
    role: string;
  }[]
) => {
  return apiCall(`/jobs/coordinators`, {
    method: "POST",
    body: body,
  });
};

export const fetchEvents = async () => {
  return apiCall("/events");

};
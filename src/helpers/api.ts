import qs from "qs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { ResumePatchData } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

interface ApiCallOptions {
  method?: string;
  isAuth?: boolean;
  body?: object;
  queryParam?: object;
  next?: object;
  formData?: FormData;
  recieveResponse?: boolean;
}

const redirect = () => {};

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
    recieveResponse = false,
  }: ApiCallOptions = {},
) => {
  const accessToken = Cookies.get("accessToken");
  if (!accessToken && isAuth) {
    redirect();
    return;
  }

  let requestUrl = getUrl(path);

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
    requestUrl += `?${encodedQueryString}`;
  }

  if (isAuth) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  req["headers"] = headers;

  if (next) {
    req["next"] = next;
  }

  const res = await fetch(requestUrl, req);

  if (method === "GET" || recieveResponse) {
    return await res.json();
  } else {
    return res.ok;
  }
};

export const OpenFile = async (path: string, options: ApiCallOptions = {}) => {
  const { method = "GET", isAuth = true, next = null } = options;

  const accessToken = Cookies.get("accessToken");
  if ((!accessToken || accessToken === undefined) && isAuth) {
    redirect();
    return;
  }

  let requestUrl = getUrl(path);

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

  fetch(requestUrl, req)
    .then((response) => response.blob())
    .then((blob) => {
      const fileUrl = window.URL.createObjectURL(blob);
      window.open(fileUrl);
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

export const fetchAllSeasons = async () => {
  return apiCall("/seasons");
};

export const fetchCompany = async () => {
  return apiCall("/companies");
};

export const assignCompany = async (
  assignments: { id: string; companyId: string }[],
) => {
  return apiCall("/jobs", {
    method: "PATCH",
    body: assignments,
  });
};

export const assignRecruiter = async (
  assignments: { id: string; recruiterId: string }[],
) => {
  return apiCall("/jobs", {
    method: "PATCH",
    body: assignments,
  });
};

export const fetchAllJobs = async (filter?: string) => {
  return apiCall(filter ? `/jobs?${filter}` : "/jobs", {
    next: { tags: ["AllJobs"] },
  });
};

export const fetchStudentData = async (filter?: string) => {
  return apiCall(filter ? `/students?${filter}` : "/students", {
    next: { tags: ["AllStudents"] },
  });
};

export const fetchStudentDataById = async (id: any) => {
  return apiCall(`/students/${id}`);
};

export const fetchSeasonData = async (filter: string | undefined) => {
  return apiCall(filter ? `/registrations?${filter}` : "/registrations", {
    next: { tags: ["AllStudents"] },
  });
};

export const fetchCompanyRecruiters = async (companyId: string | undefined) => {
  return apiCall(`/companies/${companyId}/recruiters/`, {
    next: { tags: ["AllRecruiters"] },
  });
};

export const fetchJobSalary = async (jobId: string | undefined) => {
  return apiCall(`/jobs/${jobId}/salary/`);
};

export const fetchJobById = async (jobId: any) => {
  return apiCall(`/jobs/${jobId}`);
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

export const fetchRecruiterData = async (filter?: string) => {
  return apiCall(filter ? `/recruiters?${filter}` : "/recruiters", {
    next: { tags: ["AllRecruiters"] },
  });
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
  studentId: string,
) => {
  return apiCall(`/on-campus-offers/salaries/${jobId}/student/${studentId}`);
};

export const postOnCampusOffer = async (
  body: {
    salaryId: string;
    studentId: string;
    status: string;
  }[],
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
  }[],
) => {
  return apiCall(`/jobs/coordinators`, {
    method: "POST",
    body: body,
  });
};

export const getUserById = async (userId: string) => {
  return apiCall(`/users`, {
    queryParam: {
      q: {
        filterBy: {
          id: {
            eq: [userId],
          },
        },
      },
    },
  });
};

export const fetchEvents = async () => {
  return apiCall("/events");
};

export const fetchPenalties = async (body: any) => {
  return apiCall("/penalties", {
    method: "POST",
    body: body,
  });
};

export const fetchRecruiterById = async (id: string | undefined) => {
  return apiCall(`/recruiters/${id}`);
};

export const fetchRegistrations = async (
  studentId: any,
  seasonId: any,
  currentStatus: any,
) => {
  return apiCall("/registrations", {
    method: "POST",
    isAuth: true,
    body: [
      {
        studentId,
        seasonId,
        registered: !currentStatus,
      },
    ],
  });
};

export const fetchRegistrationDataById = async (studentId: any) => {
  try {
    const data = await apiCall("/registrations");

    const filteredData = data.filter(
      (registration: any) => registration.student.id === studentId,
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching registration data:", error);
  }
};

//OnClick Functions

export const createJobEvent = async (
  jobId: String,
  type: string,
  round: string,
  date: string,
) => {
  return apiCall(`/jobs/${jobId}/events`, {
    method: "POST",
    body: { type, roundNumber: round, startDateTime: date },
  });
};

export const login = async (email: string, role: string) => {
  const response = await apiCall("/auth/login/", {
    method: "POST",
    body: { email: email, role: role.toUpperCase() },
    isAuth: false,
    recieveResponse: true,
  });
  if (response) {
    const accessToken = response.accessToken;
    Cookies.set("accessToken", accessToken, { expires: 365 });
    Cookies.set("user", JSON.stringify(jwtDecode(accessToken)), {
      expires: 365,
    });
    toast.success("Logged in");
    window.location.href = "/";
  } else {
    throw new Error("Login failed");
  }
};

export const deleteEvent = async (jobId: string, eventId: string) => {
  try {
    const response = await apiCall(`/jobs/${jobId}/events/${eventId}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw new Error("Error deleting event");
  }
};

export const loginWithEmail = async (email: string) => {
  return apiCall("/auth/passwordless", {
    method: "POST",
    body: { email },
  });
};

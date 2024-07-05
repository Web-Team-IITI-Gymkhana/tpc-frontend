const redirect = () => {};
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import qs from "qs"
import Cookies from "js-cookie";

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
{ method = "GET", isAuth = true, body = null, queryParam = null, formData = null, next = null,  }: ApiCallOptions = {}
) => {
  
  const accessToken = Cookies.get("accessToken");
  if ((!accessToken || accessToken === undefined) && isAuth){
    redirect();
    return;
  }

  let url = getUrl(path)

  const headers: HeadersInit = {};

  const req = {
    method: method,
  }

  if ((method == "POST" || method == "PATCH") && body){
    req['body'] = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }
  if ((method == "POST" || method == "PATCH") && formData){
    req['body'] = formData;
    headers['accept'] = 'application/json';
  }
  if (method == "DELETE"){
    headers['accept'] = 'application/json';
  }


  if(queryParam){
    const encodedQueryString = qs.stringify(queryParam, {
      encodeValuesOnly: true,
      encode: false,
    });
    url += `?${encodedQueryString}`;
  }

  if (isAuth) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  req['headers'] = headers;


  if (next){
    req['next'] =  next;
  }

  const res = await fetch(url, req);
  if(method === "GET"){
    return await res.json();
  }
  else return res.ok;
}
export const OpenFile = async (
  path: string,
{ method = "GET", isAuth = true, next = null}: ApiCallOptions = {}
) => {
  
  const accessToken = Cookies.get("accessToken");
  if ((!accessToken || accessToken === undefined) && isAuth){
    redirect();
    return;
  }

  let url = getUrl(path)

  const headers: HeadersInit = {};

  const req = {
    method: method,
  }

  if (isAuth) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  req['headers'] = headers;


  if (next){
    req['next'] =  next;
  }

  fetch(url, req).then(response => response.blob())
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
  })
  .catch(error => console.error('Error:', error));
}

export const PasswordlessLogin = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url("/auth/passwordless/verify"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

export const fetchJobEvents = async (
  accessToken: string | undefined,
  jobId: any
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
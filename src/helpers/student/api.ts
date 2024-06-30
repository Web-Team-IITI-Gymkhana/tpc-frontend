const redirect = () => { };
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { apiCall } from "../api";

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const GetJobById = async (jobId: string) => {
  return apiCall(`/student-view/job/${jobId}`, {next: { tags: ["AllJobs"] },})
};
export const GetJobs = async () => {
  return apiCall(`/student-view/jobs`, {next: { tags: ["AllJobs"] },})
};
export const GetSalaryById = async (salaryId: string) => {
  return apiCall(`/student-view/salaries/${salaryId}`, {next: { tags: ["Salaries"] },})
};

export const GetOnCampusOffers = async () => {
    return apiCall("/student-view/offers/on-campus", {next: { tags: ["Offers"] },})
};

export const GetOffCampusOffers = async () => {
    return apiCall("/student-view/offers/off-campus", {next: { tags: ["Offers"] },})
};

export const GetResumes = async () => {
    return apiCall("/student-view/resume", {next: { tags: ["Resumes"] },})
};

export const OpenResume = async (accessToken: string | undefined, filename: string) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    fetch(url(`/student-view/resume/${filename}`), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    })
    .catch(error => console.error('Error:', error));
};

export const GetInterviewExpiriences = async () => {
  return apiCall("/student-view/interview-experiences", {next: { tags: ["InterviewExpiriences"] },})
};

export const OpenInterviewExpirience = async (accessToken: string | undefined, filename: string) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  fetch(url(`/student-view/interview-experiences/${filename}`), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(response => response.blob())
  .then(blob => {
      const url = window.URL.createObjectURL(blob);
      window.open(url);
  })
  .catch(error => console.error('Error:', error));
};


export const GetStudentData = async () => {
  return apiCall("/student-view", {next: { tags: ["Students"] },})
};

export const ApplyJob = async (salaryId: string, resumeId: string) => {

  const body = [{
    salaryId: salaryId,
    resumeId: resumeId,
  }]
  
  return apiCall("/student-view/salaries", {method: "POST", body: body, next: { tags: ["Salaries"] },});
};

export const uploadResume = async (formData: FormData) => {  
  return apiCall('/student-view', {method: "POST", formData: formData, next: { tags: ["Resumes"] },});
};

export const deleteResume = async (filename: string) => {
  return apiCall(`/student-view?filename=${filename}`, {method: "DELETE", next: { tags: ["Resumes"] },});
};

const redirect = () => {};
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { OpenFile, OpenFileViaUploads, apiCall } from "../api";

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const GetJobById = async (jobId: string) => {
  return apiCall(`/student-view/job/${jobId}`, { next: { tags: ["AllJobs"] } });
};
export const GetJobs = async () => {
  return apiCall(`/student-view/jobs`, { next: { tags: ["AllJobs"] } });
};
export const GetEventsByJobId = async (jobId: string) => {
  return apiCall(`/student-view/events/${jobId}`, {
    next: { tags: ["AllJobs"] },
  });
};
export const GetOpportuinites = async () => {
  return apiCall(`/student-view/opportunities`, {
    next: { tags: ["AllJobs"] },
  });
};
export const GetSalaryById = async (salaryId: string) => {
  return apiCall(`/student-view/salaries/${salaryId}`, {
    next: { tags: ["Salaries"] },
  });
};

export const GetOnCampusOffers = async () => {
  return apiCall("/student-view/offers/on-campus", {
    next: { tags: ["Offers"] },
  });
};

export const GetOffCampusOffers = async () => {
  return apiCall("/student-view/offers/off-campus", {
    next: { tags: ["Offers"] },
  });
};

export const GetResumes = async () => {
  return apiCall("/student-view/resume", { next: { tags: ["Resumes"] } });
};
export const RegisterSeason = async (seasonId: string, registered: boolean) => {
  if (!registered) {
    return apiCall(`/student-view/registrations/${seasonId}`, {
      method: "PATCH",
      next: { tags: ["Registrations"] },
    });
  } else {
    return apiCall(`/student-view/de-register/${seasonId}`, {
      method: "PATCH",
      next: { tags: ["Registrations"] },
    });
  }
};

export const OpenResume = (filename: string) => {
  OpenFileViaUploads(filename, "resume");
};

export const GetInterviewExpiriences = async () => {
  return apiCall("/student-view/interview-experiences", {
    next: { tags: ["InterviewExpiriences"] },
  });
};

export const OpenInterviewExpirience = (filename: string) => {
  OpenFileViaUploads(filename, "ie");
};

export const OpenJD = (filename: string) => {
  OpenFileViaUploads(filename, "jd");
};

export const GetStudentData = async () => {
  return apiCall("/student-view", { next: { tags: ["Students"] } });
};

export const updateOnboarding = async (data: {
  backlog?: string;
  tenthMarks?: number;
  twelthMarks?: number;
}) => {
  return apiCall("/student-view/onboarding", {
    method: "PATCH",
    body: data,
    next: { tags: ["Students"] },
  });
};

export const ApplyJob = async (salaryId: string, resumeId: string) => {
  const body = [
    {
      salaryId: salaryId,
      resumeId: resumeId,
    },
  ];

  return apiCall("/student-view/salaries", {
    method: "POST",
    body: body,
    next: { tags: ["Salaries"] },
  });
};

export const uploadResume = async (formData: FormData, name: string) => {
  formData.append("name", name);
  return apiCall("/student-view", {
    method: "POST",
    formData: formData,
    next: { tags: ["Resumes"] },
    recieveResponse: true,
  });
};

export const deleteResume = async (filename: string) => {
  return apiCall(`/student-view?filename=${filename}`, {
    method: "DELETE",
    next: { tags: ["Resumes"] },
  });
};

export const fetchStudentEvents = async () => {
  return apiCall("/student-view/events");
};

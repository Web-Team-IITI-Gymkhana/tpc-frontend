import { apiCall } from "../api";

export async function getCompanies() {
  return apiCall("/companies", { isAuth: false });
}

export async function signupRecruiter(data) {
  return apiCall("/auth/recruiter", {
    isAuth: false,
    method: "POST",
    body: data,
  });
}

export async function postCompany(data) {
  return apiCall("/companies", {
    isAuth: false,
    method: "POST",
    body: [data],
    recieveResponse: true,
  });
}

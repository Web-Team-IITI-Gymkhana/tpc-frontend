import { apiCall } from "../api";
import { updateProfileFC } from "./types";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const fetchApprovals = async (filter: object | undefined) => {
  return apiCall("/faculty-view/approvals", {queryParam: filter, next: { tags: ["AllApprovals"] },})
};

export async function updateApproval(
  data: {
    id: string;
    remarks: string;
    status: string;
  }
) {
  return apiCall("/faculty-view/approval-status", {method: "PATCH", body: data});
}

export const fetchProfile = async () => {
  return apiCall(`/faculty-view/faculty`);
};

export const patchProfile = async (
  changes: updateProfileFC
) => {
  return apiCall(`/faculty-view/faculty`, {method: "PATCH", body: changes});
};

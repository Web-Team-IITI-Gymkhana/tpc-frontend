import { apiCall } from "../api";
import { SeasonDataFC } from "./types";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const getSeasonStats = async (id: string) => {
    return apiCall(`/analytics-dashboard/getSeasonStats/${id}`);
  };
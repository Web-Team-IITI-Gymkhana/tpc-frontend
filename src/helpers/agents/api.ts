import { apiCall } from "../api";

export const askAgent = (query: string) => {
  return apiCall("/agents/chat", {
    method: "POST",
    body: { query },
    recieveResponse: true,
  });
};

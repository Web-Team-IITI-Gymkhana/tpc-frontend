const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const googleLoginURL = () => {
  const googleLoginURL = url("/auth/google/login");
  return googleLoginURL;
};

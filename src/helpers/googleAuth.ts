const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const googleLoginURL = () => {
  const googleLoginURL = url("/auth/google/login");
  return googleLoginURL;
};

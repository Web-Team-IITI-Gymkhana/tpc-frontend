const redirect = () => {};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export interface ProfileFC {
  id: string;
  designation: string;
  landline: string;
  user: {
    id: string;
    email: string;
    name: string;
    contact: string;
  };
}

export const fetchProfile = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/recruiter-view/recruiter`), {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json: ProfileFC = await res.json();
  return json;
};

export interface updateProfileFC {
  designation?: string;
  landline?: string;
  company?: {
    name: string;
    website: string;
    domains: [string];
    category: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      country: string;
    };
    size: number;
    yearOfEstablishment: string;
    annualTurnover: string;
    socialMediaLink: string;
  };
  user?: {
    name: string;
    email: string;
    contact: string;
  };
}

export const patchProfile = async (
  accessToken: string | undefined,
  changes: updateProfileFC
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/recruiter-view/recruiter`), {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(changes),
  });
  return res.ok;
};

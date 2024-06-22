import { StepsToken } from "antd/es/steps/style";

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

export interface JobsFC {
  id: string;
  role: string;
  active: boolean;
  currentStatus: string;
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    id: string;
    name: string;
  };
}

export const getJobs = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/recruiter-view/jobs`), {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json: JobsFC[] = await res.json();
  return json;
};

export interface JobDetailFC {
  id: string;
  role: string;
  active: boolean;
  currentStatus: string;
  season: {
    id: string;
    year: string;
    type: string;
  };
  company: {
    id: string;
    name: string;
  };
  selectionProcedure: {
    selectionMode: string;
    shortlistFromResume: true;
    groupDiscussion: true;
    tests: [
      {
        type: string;
        duration: number;
      },
    ];
    interviews: [
      {
        type: string;
        duration: number;
      },
    ];
    requirements: {
      numberOfMembers: number;
      numberOfRooms: number;
      otherRequirements: string;
    };
    others: string;
  };
  description: string;
  attachment: string;
  skills: string;
  offerLetterReleaseDate: string;
  joiningDate: string;
  location: string;
  noOfVacancies: number;
  duration: number;
  feedback: string;
  jobCoordinators: [
    {
      id: string;
      role: string;
      tpcMember: {
        id: string;
        department: string;
        role: string;
        user: {
          id: string;
          email: string;
          name: string;
          contact: string;
        };
      };
    },
  ];
  events: [
    {
      id: string;
      roundNumber: number;
      type: string;
      metadata: string;
      startDateTime: string;
      endDateTime: string;
      visibleToRecruiter: true;
    },
  ];
  salaries: [
    {
      id: string;
      baseSalary: string;
      takeHomeSalary: number;
      grossSalary: number;
      otherCompensations: number;
      totalCTC: number;
      salaryPeriod: string;
      genders: [string];
      programs: [string];
      facultyApprovals: [string];
      categories: [string];
      minCPI: number;
      tenthMarks: number;
      twelthMarks: number;
    },
  ];
}

export const getJobDetail = async (
  accessToken: string | undefined,
  id: string
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/recruiter-view/jobs/${id}`), {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    // body: JSON.stringify({ id: id }),
  });
  const json: JobDetailFC = await res.json();
  console.log(json);
  return json;
};

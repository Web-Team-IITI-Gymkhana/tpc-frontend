// pages/api/fetchPdf.js
import axios from "axios";

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
  company: {
    name: string;
    domains: [string];
    category: string;
    address: {
      city: string;
      line1: string;
      line2: string;
      state: string;
      country: string;
      zipCode: string;
    };
    size: number;
    yearOfEstablishment: string;
    socialMediaLink: string;
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
    name?: string;
    website?: string;
    domains?: any[];
    category?: string;
    address?: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      country: string;
    };
    size?: number;
    yearOfEstablishment?: string;
    annualTurnover?: string;
    socialMediaLink?: string;
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
  salaries: [SalaryFC];
}

interface SalaryFC {
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
  });
  const json: JobDetailFC = await res.json();
  return json;
};

export interface ApplicationFC {
  id: string;
  student: {
    id: string;
    rollNo: string;
    user: {
      id: string;
      name: string;
      email: string;
      contact: string;
    };
    program: {
      id: string;
      branch: string;
      course: string;
      year: string;
      department: string;
    };
  };
  resume: {
    id: string;
    filepath: string;
    verified: boolean;
  };
}

export interface EventFC {
  id: string;
  roundNumber: number;
  type: string;
  metadata: string;
  startDateTime: string;
  endDateTime: string;
  applications?: [ApplicationFC];
}

export async function getEvent(accessToken: string | undefined, id: string) {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/recruiter-view/events/${id}`), {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json: EventFC = await res.json();
  return json;
}

export async function getDomains(accessToken: string | undefined) {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/jaf`), {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json.domains;
}

export interface JAFdetailsFC {
  seasons: [
    {
      id: string;
      type: string;
      year: string;
    },
  ];
  programs: [
    {
      id: string;
      branch: string;
      course: string;
      year: string;
      department: string;
    },
  ];
  genders: [string];
  categories: [string];
  testTypes: [string];
  domains: [string];
  interviewTypes: [string];
  countries: [string];
}

export async function getJafDetails(accessToken: string | undefined) {
  // if (!accessToken || accessToken === undefined) {
  //   redirect();
  //   return;
  // }
  const res = await fetch(url(`/jaf`), {
    cache: "no-store",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json: JAFdetailsFC = await res.json();
  return json;
}

export const getResume = (
  accessToken: string | undefined,
  filename: string
) => {
  const u1 = url(`/recruiter-view/resume/${filename}`);
  axios
    .get(u1, {
      responseType: "blob",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      window.open(URL.createObjectURL(response.data));
    });
};

export const patchJobData = async (
  accessToken: string | undefined,
  jobId: string,
  changes: JobDetailFC
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }

  const patchFormat = {
    role: "string",
    noOfVacancies: 0,
    duration: 0,
    location: "string",
    selectionProcedure: {
      selectionMode: "OFFLINE",
      shortlistFromResume: true,
      groupDiscussion: true,
      tests: [
        {
          type: "APTITUDE",
          duration: 0,
        },
      ],
      interviews: [
        {
          type: "HR",
          duration: 0,
        },
      ],
      requirements: {
        numberOfMembers: 0,
        numberOfRooms: 0,
        otherRequirements: "string",
      },
      others: "string",
    },
    description: "string",
    attachment: "string",
    skills: "string",
    offerLetterReleaseDate: "2024-06-24T06:42:48.242Z",
    joiningDate: "2024-06-24T06:42:48.242Z",
    feedback: "string",
  };

  const toPatch = {};
  Object.entries(patchFormat).map(
    ([key, value]) => (toPatch[key] = changes[key])
  );

  const res = await fetch(url(`/recruiter-view/jobs/${jobId}`), {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(toPatch),
  });
  return res.ok;
};

export const patchSalaryData = async (
  accessToken: string | undefined,
  salary: SalaryFC
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }

  const patchFormat = {
    baseSalary: 0,
    totalCTC: 0,
    takeHomeSalary: 0,
    grossSalary: 0,
    otherCompensations: 0,
    genders: [],
    programs: [],
    categories: [],
    salaryPeriod: "",
    minCPI: 0,
    tenthMarks: 0,
    twelthMarks: 0,
  };

  const toPatch = {};
  Object.entries(patchFormat).map(
    ([key, value]) => (toPatch[key] = salary[key])
  );

  console.log(toPatch);

  const res = await fetch(url(`/recruiter-view/salary/${salary.id}`), {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(toPatch),
  });
  console.log(res);
  return res.ok;
};

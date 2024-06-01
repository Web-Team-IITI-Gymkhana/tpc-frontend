const redirect = () => { };
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const GetJobById = async (jobId: string) => {
    try {
        const res = await fetch(url(`/jobs/${jobId}`));
        if (!res.ok) {
        throw new Error("Failed to fetch Job data");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching Job data:", error);
    }
};
export const GetSalaryById = async (salaryId: string) => {
    try {
        const res = await fetch(url(`/salaries/${salaryId}`));
        if (!res.ok) {
        throw new Error("Failed to fetch salary data");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching salary data:", error);
    }
};

export const GetOnCampusOffers = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view/offers/on-campus"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};

export const GetOffCampusOffers = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view/offers/off-campus"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};

export const GetResumes = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view/resume"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};


export const GetStudentData = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
      redirect();
      return;
    }
    const res = await fetch(url("/student-view"), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const json = await res.json();
    return json;
};

export const ApplyJob = async (accessToken: string | undefined, salaryId: string, resumeId: string) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  
  const res = await fetch(url("/student-view/salaries"), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ salaryId, resumeId }]),
  });

  const status = res.status;
  const json = await res.json();
  
  return { status, payload: json };
};

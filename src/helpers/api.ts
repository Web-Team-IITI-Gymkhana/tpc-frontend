const redirect = () => {};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
    return `${baseUrl}/api/v1${NextUrl}`;
};

export const fetchAllSeasons = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(url("/seasons"), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const json = await res.json();
    return json;
};

export const fetchCompany = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(url("/companies"), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const json = await res.json();
    return json;
};

export const fetchAllJobs = async (
    accessToken: string | undefined,
    seasonId: string | null | undefined,
    recruiterId: string | null | undefined,
    companyId: string | null | undefined,
    role: string | null | undefined,
    active: boolean | null | undefined,
) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    let apiUrl = url("/jobs?");
    if (companyId) apiUrl += `companyId=${companyId}&`;
    if (seasonId) apiUrl += `seasonId=${seasonId}&`;
    if (recruiterId) apiUrl += `recruiterId=${recruiterId}&`;
    if (role) apiUrl += `role=${role}&`;
    if (active !== null) apiUrl += `active=${active}&`;
    apiUrl = apiUrl.replace(/&$/, "");
    console.log(apiUrl);
    const res = await fetch(apiUrl, {
        next: {
            tags: ["AllJobs"],
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const json = await res.json();
    return json;
};

export const fetchStudentData = async (accessToken: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(url("/students"), {
        next: { tags: ['AllStudents'] },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const json = await res.json();
    return json;
};

export const fetchCompanyRecruiters = async (accessToken: string | undefined, companyId: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(`${url("/companies")}/${companyId}/recruiters/`, {
        next: {
            tags: ["AllRecruiters"],
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const json = await res.json();
    return json;
};

export const fetchJobSalary = async (accessToken: string | undefined, jobId: string | undefined) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(`${url("/jobs")}/${jobId}/salary/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const json = await res.json();
    return json;
};

export const fetchEachJob = async (accessToken: string | undefined, jobId: any) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(`${url("/jobs")}/${jobId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const json = await res.json();
    return json;
};

export const fetchJobEvents = async (accessToken: string | undefined, jobId: any) => {
    if (!accessToken || accessToken === undefined) {
        redirect();
        return;
    }
    const res = await fetch(`${url("/jobs")}/${jobId}/events`, {
        next: {
            tags: ["AllEvents"],
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const json = await res.json();
    return json;
};

const redirect = () => {};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

export const fetchApprovals = async (
  accessToken: string | undefined,
  filter: string | undefined
) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(
    filter
      ? url(`/faculty-view/approvals?${filter}`)
      : url("/faculty-view/approvals"),
    {
      next: { tags: ["AllApprovals"] },
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = await res.json();
  return json;
};

export async function updateApproval(
  accessToken: string | undefined,
  data: {
    id: string;
    remarks: string;
    status: string;
  }
) {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  fetch(url("/faculty-view/approval-status"), {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.ok;
  });
}

export interface ProfileFC {
  id: "string";
  department: "string";
  user: {
    id: "string";
    name: "string";
    email: "string";
    contact: "string";
  };
}

export const fetchProfile = async (accessToken: string | undefined) => {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  const res = await fetch(url(`/faculty-view/faculty`), {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json: ProfileFC = await res.json();
  return json;
};

export interface updateProfileFC {
  user: {
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
  const res = await fetch(url(`/faculty-view/faculty`), {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(changes),
  });
  console.log(changes);
  return res.ok;
};

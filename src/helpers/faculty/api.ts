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
    filter ? url(`/faculty-approvals?${filter}`) : url("/faculty-approvals"),
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
  data: any[]
) {
  if (!accessToken || accessToken === undefined) {
    redirect();
    return;
  }
  fetch(url("/faculty-approvals"), {
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

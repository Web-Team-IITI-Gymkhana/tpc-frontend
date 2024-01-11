import { fetchEachJob } from "@/helpers/api";
import { cookies } from "next/headers";

interface Props {
  params: {
    recruiterId: String;
  };
}

const EachRecruiterPage = async ({ params }: Props) => {
  const EachJob = fetchEachJob(
    cookies()?.get("accessToken")?.value,
    params.recruiterId
  );
  return <div>{params.recruiterId}</div>;
};

export default EachRecruiterPage;

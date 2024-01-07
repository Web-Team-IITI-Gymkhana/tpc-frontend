import { Jobs } from "../../../../../dummyData/job";
import { fetchEachJob } from "@/helpers/api";
import { cookies } from "next/headers";
interface Props {
  params: {
    jobId: String;
  };
}

const EachJobPage = async ({ params }: Props) => {
  const EachJob = fetchEachJob(
    cookies()?.get("accessToken")?.value,
    params.jobId,
  );
  return <div>{params.jobId}</div>;
};

export default EachJobPage;

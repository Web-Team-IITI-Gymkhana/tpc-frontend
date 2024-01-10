import { Separator } from "@/components/ui/separator";
import { Jobs } from "../../../../../dummyData/job";
import { fetchEachJob } from "@/helpers/api";
import { cookies } from "next/headers";

interface Props {
  params: {
    jobId: String;
  };
}

const EachJobPage = async ({ params }: Props) => {
  const EachJob = await fetchEachJob(
    cookies()?.get("accessToken")?.value,
    params.jobId,
  );
  return (
  <div className="m-10 bg-white p-5 border-2 rounded-xl">
    <div className="  font-semibold text-xl">
        {EachJob?.job?.role}
    </div>
    <div className="text-gray-600 font-medium text-md my-1">
      {"Bangalore Sahakarnagar 560092 (India,Karnataka)"}
    </div>
    <div className="text-gray-600 font-medium text-md  text-sm mt-4 mb-2">
      {"Work From Home"}
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 text-sm">
      <div><div className="text-gray-500 font-semibold my-2">Start Date</div>  <div>3rd Jan 2024</div></div>
      <div><div className="text-gray-500 font-semibold my-2">Duration</div> <div>3 Months</div></div>
      <div><div className="text-gray-500 font-semibold my-2">Stipend</div> <div>Rs 45000</div></div>
      <div><div className="text-gray-500 font-semibold my-2">Apply By</div> <div>1st Jan 2024</div></div>
    </div>
    <Separator className="my-4" />
    <div>
      <h1>About The Work</h1>
    </div>
  </div>
  );
};

export default EachJobPage;

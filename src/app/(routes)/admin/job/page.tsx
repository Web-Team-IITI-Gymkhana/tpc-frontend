import { cookies } from "next/headers";
import { Jobs } from "../../../../dummyData/job"
import JobCard from "@/components/jobs/JobCard";
import { fetchAllJobs } from "@/helpers/api";
import { useState } from "react";
interface Props { }

const AdminJobsPage = async () => {
  const AllJobs = await fetchAllJobs(cookies()?.get('accessToken')?.value,null,null,null,null,null)
  console.log(AllJobs)
  if(AllJobs?.jobs?.length===0){
    return <h1 className="text-center text-black text-3xl font-bold flex justify-center items-center w-full h-screen">No Jobs Currently Registered</h1>
  }
  return (
    <div>
      <h1 className="text-center font-bold my-10 text-3xl">Jobs</h1>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5  mx-auto">
          <div className="gap-10 grid md:grid-cols-2">
            {AllJobs?.jobs?.map((ele:any, index:number) => {
              return (
                <div key={index}>
                  <JobCard jobItem={ele} />
                </div>
              )
            })}

          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminJobsPage;



import { Jobs } from "../../../../dummyData/job"
import JobCard from "@/components/jobs/JobCard";
interface Props { }

const AdminJobsPage = async () => {
  const AllJobs = await fetchAllJobs()
  return (
    <div>
      <h1 className="text-center font-bold my-10 text-3xl">Jobs</h1>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5  mx-auto">
          <div className="gap-10 grid md:grid-cols-2">
            {AllJobs?.map((ele, index) => {
              return (
                <div key={index}>
                  <JobCard ele={ele} />
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


const fetchAllJobs = async () => {
  // const res = await fetch('')
  // const json = res.json()
  // return json
  return Jobs
}
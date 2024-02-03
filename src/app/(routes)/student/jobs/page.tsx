import JobCard from "@/components/jobs/JobCard";
import { fetchAllJobs } from "@/helpers/api";

const AdminJobsPage = async () => {
  const AllJobs = await fetchAllJobs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6IkFETUlOIiwiZW1haWwiOiJ0cGNAaWl0aS5hYy5pbiIsIm5hbWUiOiJIYXJzaCBUYWxhdGkiLCJpYXQiOjE3MDU4Mzg0MjgsImV4cCI6MTcwNjQ0MzIyOCwiYXVkIjoidHBjLWJhY2tlbmQiLCJpc3MiOiJ0cGMuaWl0aS5hYy5pbiIsInN1YiI6IjYzYjI4YTVhLWVjN2QtNDk0Ni1iYzBhLTU0NTQwNDNiNzgzNyJ9.0IinsVQz-FV1w4DDUINvLEa5_h65T4CBhQJj8ISfGig",
    null,
    null,
    null,
    null,
    null
  );
  console.log(AllJobs);

  if (AllJobs?.jobs?.length === 0) {
    return (
      <h1 className="text-center text-black text-3xl font-bold flex justify-center items-center w-full h-full">
        No Jobs Currently Registered
      </h1>
    );
  }

  return (
    <div>
      <h1 className="text-center font-bold my-6 text-3xl">Jobs</h1>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="gap-10 grid md:grid-cols-3">
            {AllJobs?.jobs?.map((ele: any, index: number) => {
              return (
                <div key={index}>
                  <JobCard jobItem={ele} salary={null} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminJobsPage;

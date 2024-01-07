import { Button } from "@/components/ui/button"
import { cookies } from "next/headers";
import { Card, CardContent } from "@/components/ui/card"


interface Props { }
import {
  fetchAllJobs,
  fetchCompany,
  fetchCompanyRecruiters,
} from "@/helpers/api";
import AllCompaniesComponent from "@/components/company/AllCompaniesComponent";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import RecruitersTable from "@/components/RecruitersTable";


interface company {
  id: string;
  name: string;
  metadata: object;
  createdAt: string;
  updatedAt: string;
}

const CompanyPage = async () => {
  const Companies = await fetchCompany(cookies()?.get("accessToken")?.value);
  console.log(Companies)
  if (Companies.companies.length === 0) {
    return (
      <h1 className="text-center text-black text-3xl font-bold flex justify-center items-center w-full h-full">
        No Comapanies Currently Registered
      </h1>
    );
  }

  const Recruiters = await fetchCompanyRecruiters(
    cookies()?.get("accessToken")?.value,
    cookies()?.get("companyId")?.value,
  );

  const CompanyRelatedJobs = await fetchAllJobs(
    cookies()?.get("accessToken")?.value,
    null,
    null,
    cookies()?.get("companyId")?.value,
    null,
    null,
  );

  console.log("CRJ", CompanyRelatedJobs);
  return (
    <div className="">
      <div className="grid grid-cols-[300px_auto]">
        <div>
          <AllCompaniesComponent />
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold mx-5 my-5">{cookies().get('companyName')?.value}</div>
            <div className="flex">
              <Button variant={"outline"} className="mr-5">See Jobs</Button>
              <Button className="mr-5">Update</Button>
              <Button className="mr-5" variant="destructive">Delete</Button>
            </div>
          </div>
          <Separator />
          <div className="h-[66vh] overflow-y-scroll">
            <div className="">
              <h1 className="text-xl font-semibold text-start mx-5 my-3">Company Details</h1>
              <div className="mx-16">
                <ul className="list-disc">
                  <li>Company Website : <a className="text-blue-600 font-medium">click here</a></li>
                  <li>Year Of Establishment : 2014</li>
                  <li>Social Media : <a className="text-blue-600 font-medium">click here</a></li>
                  <li>Company Size : 1.5 M</li>
                  <li>Annual Turnover : $278.19 B</li>
                </ul>
              </div>
            </div>
            <h1 className="text-xl font-semibold text-start mx-5 my-3">Recruiter Details</h1>
            <div className="mx-10">
              <RecruitersTable data={Recruiters?.recruiters} />
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;

// http://tpc.iiti.ac.in/api/v1/companies/3f1d7e53-2069-4820-8d91-64b81f79cf7a/recruiters

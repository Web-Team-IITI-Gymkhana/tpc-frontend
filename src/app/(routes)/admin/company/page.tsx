import { fetchCompanyRecruiters } from "@/helpers/api";
import { cookies } from "next/headers";
interface Props {}

interface company {
  id: string;
  name: string;
  metadata: object;
  createdAt: string;
  updatedAt: string;
}

const CompanyPage = async () => {
  const AllRecruiters = await fetchCompanyRecruiters(cookies()?.get('accessToken')?.value,cookies().get('companyId')?.value)
  console.log('AllRecruiters',AllRecruiters)
  return (
  <div className="">
    {AllRecruiters.recruiters?.map((ele:any,index:any)=>{
      return (
        <div>{ele?.user?.name}</div>
      )
    })}
  </div>
  );
};

export default CompanyPage;

// http://tpc.iiti.ac.in/api/v1/companies/3f1d7e53-2069-4820-8d91-64b81f79cf7a/recruiters

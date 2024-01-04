
import CompanyCard from "@/components/company/CompanyCard";
import { AllCompanies } from '../../../../dummyData/company'
import { cookies } from "next/headers";
import { fetchCompany } from "@/helpers/api";
interface Props { }

interface company{
  "id": string,
  "name": string,
  "metadata": object,
  "createdAt": string,
  "updatedAt": string
}

const CompanyPage = async () => {
  const Companies = await fetchCompany(cookies()?.get('accessToken')?.value)

  if(Companies.companies.length===0){
    return <h1 className="text-center text-black text-3xl font-bold flex justify-center items-center w-full h-screen">No Comapanies Currently Registered</h1>
  }
  return (
    <div className=" ">
      <h1 className="text-center font-bold text-2xl text-black my-10 ">All Companies For The Season { }</h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
        {Companies?.companies.map((Company:company, index:number) => {
          return (
            <div key={index}>
              <CompanyCard Company={Company} />
            </div>
          )
        })}
      </div>
    </div >
  );
};

export default CompanyPage;




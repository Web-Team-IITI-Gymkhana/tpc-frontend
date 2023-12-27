
import CompanyCard from "@/components/company/CompanyCard";
import {AllCompanies} from '../../../../dummyData/company'
interface Props { }

const CompanyPage = async () => {
  const Companies = await fetchCompanyFromTheSeason()
  
  
  return (
    <div className=" ">
    <h1 className="text-center font-bold text-2xl text-black my-10 ">All Companies For The Season {}</h1>
    <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-10">
        {Companies.map((ele,index)=>{
          return (
            <div key={index}>
            <CompanyCard ele={ele} />
            </div>
          )
        })}
    </div>
    </div >
  );
};

export default CompanyPage;



//api call to fetch all companies based on the season
const fetchCompanyFromTheSeason = async () => {
  // const res = await fetch('');
  // const json = await res.json();
  // return json
  return AllCompanies
}
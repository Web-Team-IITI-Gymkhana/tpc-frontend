import { FunctionComponent } from "react";
import AddCompanyBtn from "@/components/Company/AddCompanyBtn";
import CompanyCard from "@/components/Company/CompanyCard";

interface CompaniesProps {}

const Companies: FunctionComponent<CompaniesProps> = () => {

  const data = [
    {
      company_name : 'Google',
      icon: "./icons8-google.svg",
      id : 1,
      ctc_offered: '36 LPA',
      roles_offered: [
          'software engineer',
          'cloud engineer',
          'software developer',
      ],
      date_modified: 'Jun 14, 2023 21:41',
      date_created_timestamp: 1686759093,
    },
    {
      company_name : 'Goldman Sachs',
      icon: "./Goldman_Sachs_Blue_Box.svg",
      id : 2,
      ctc_offered: '28 LPA',
      roles_offered: [
          'software engineer',
          'cloud engineer',
          'software developer',
      ],
      date_modified: 'Jun 8, 2023 01:41',
      date_created_timestamp: 1686759093,
    },
    {
      company_name : 'Amazon',
      icon: "./amazon-icon.svg",
      id : 3,
      ctc_offered: '28 LPA',
      roles_offered: [
          'software engineer',
          'cloud engineer',
          'software developer',
      ],
      date_modified: 'Jun 25, 2023 14:50',
      date_created_timestamp: 1686759093,
    },
  ]

  return (
    <div className="mx-6 my-4">
      <div className="w-full mx-2 flex flex-col">
        <div className="self-end">
          <AddCompanyBtn />
        </div>
        <div className="w-full justify-start">
          {
            data.map( ({company_name, icon, id, date_modified}) => {
              return (
                <CompanyCard
                  name = {company_name}
                  key={id}
                  date = {date_modified}
                  icon = {icon}
                />
              )
            } )
          }
        </div>
      </div>
    </div>
  );
};

export default Companies;

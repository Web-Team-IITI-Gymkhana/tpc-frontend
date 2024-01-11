import { fetchCompany } from "@/helpers/api";
import { cookies } from "next/headers";
import AddJobForm from "@/components/jobs/AddJobForm";

export interface Job {
  companyId: string;
  description: string;
  selectionProcess: string;
  salary: number;
  tags: string[];
}

export interface Company {
  id: string;
  name: string;
  metadata: object;
  createdAt: string;
  updatedAt: string;
}

const AddJob = async () => {
  const companiesData = await fetchCompany(cookies().get("accessToken")?.value);
  const companiesDropDownOptions = companiesData?.companies.map(
    (company: Company) => {
      return { value: company.id, label: company.name };
    }
  );

  return <AddJobForm companiesDropDownOptions={companiesDropDownOptions} />;
};

export default AddJob;

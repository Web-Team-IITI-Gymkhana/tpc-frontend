"use client";
import { fetchAllJobs } from "@/helpers/api";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";
import { useEffect, useState } from "react";

const dto = [
  {
    id: "string",
    seasonId: "string",
    recruiterId: "string",
    companyId: "string",
    role: "string",
    active: "boolean",
    currentStatus: "string",
    season: {
      id: "string",
      year: "string",
      type: "string",
    },
    company: {
      id: "string",
      name: "string",
    },
  },
];

const dynamicColumns = generateColumns(dto[0]);

const StudentPage = ({ params }: any) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const decodedParams = decodeURIComponent(params.filter[0]);
      console.log(decodedParams);
      const AllFilteredJobs = await fetchAllJobs(decodedParams);
      setJobs(AllFilteredJobs);
    };

    fetchData();
  }, [params?.filter[0]]);

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Jobs Filter</h1>
      <div>
        {jobs.length > 0 && (
          <TableComponent
            isAddButton={true}
            AddButtonText={"Add Jobs"}
            data={jobs}
            columns={dynamicColumns}
            dto={dto}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

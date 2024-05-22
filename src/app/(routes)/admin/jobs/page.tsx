"use client";
import { fetchAllJobs } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";

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
  }
];

const dynamicColumns = generateColumns(dto[0]);

const StudentPage = async () => {
  const AllStudents = await fetchAllJobs(Cookies.get("accessToken"),undefined);
  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Jobs</h1>
      <div>
        {AllStudents && (
          <TableComponent
            isAddButton={true}
            AddButtonText={"Add Students"}
            data={AllStudents}
            columns={dynamicColumns}
            dto={dto}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

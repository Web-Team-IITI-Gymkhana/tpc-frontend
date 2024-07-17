"use client";
import { fetchRecruiterData } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { recruiterdto } from "@/dto/RecruiterDto";

const hiddenColumns = ["id", "user.id", "company.id"];

const StudentPage = async () => {
  const columns = generateColumns(recruiterdto);
  const AllRecruiters = await fetchRecruiterData();
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Recruiters</h1>
      <div>
        {AllRecruiters && (
          <Table
            data={AllRecruiters}
            columns={visibleColumns}
            type={"recruiter"}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

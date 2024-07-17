"use client";
import { fetchRecruiterData } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { RecruiterDTO, recruiterdto } from "@/dto/RecruiterDto";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const hiddenColumns = ["id", "user.id", "company.id"];

const StudentPage = async () => {
  const columns = generateColumns(recruiterdto);
  const [AllRecruiters, setRecruiters] = useState<RecruiterDTO[]>([]);
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const data = await fetchRecruiterData();
        setRecruiters(data);
      } catch (error) {
        toast.error("Error fetching data:",{duration: 3000});
      }
    };

    fetchRecruiters();
  }, []);
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

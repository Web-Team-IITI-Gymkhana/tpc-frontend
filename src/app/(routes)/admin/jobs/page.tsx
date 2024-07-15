"use client";
import { fetchAllJobs } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import type { RecruitmentDTO } from "@/dto/JobDto";
import { recruitmentDTO } from "@/dto/JobDto";
import { createMRTColumnHelper } from "material-react-table";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";

const hiddenColumns = [
  "id",
  "season.id",
  "company.id",
  "recruiter.id",
  "recruiter.user.id",
];

const JobPage = () => {
  const columns = generateColumns(recruitmentDTO);
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState();
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllJobs();
      const newData = data.map((d: any) => ({
        ...d,
        active: d.active ? "Active" : "Inactive",
      }));
      setAllJobs(newData);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Jobs</h1>
      <div>
        {loading && (
          <div className="h-48 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {allJobs && (
          <Table data={allJobs} columns={visibleColumns} type={"job"} />
        )}
      </div>
    </div>
  );
};

export default JobPage;

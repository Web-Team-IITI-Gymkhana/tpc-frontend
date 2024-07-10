"use client";
import { fetchAllJobs } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import type { RecruitmentDTO } from "@/dto/JobDto";
import { recruitmentDTO } from "@/dto/JobDto";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from "material-react-table";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";

const hiddenColumns = ["id"];

const JobPage = () => {
  const columnHelper = createMRTColumnHelper<RecruitmentDTO>();
  const columns = generateColumns(recruitmentDTO);
  console.log(columns);
  const [allJobs, setAllJobs] = useState();
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey)
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllJobs(Cookies.get("accessToken"), undefined);
      console.log(data);
      setAllJobs(data);
    };
    getData();
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Jobs</h1>
      <div>
        {allJobs && (
          <Table data={allJobs} columns={visibleColumns} type={"job"} />
        )}
      </div>
    </div>
  );
};

export default JobPage;

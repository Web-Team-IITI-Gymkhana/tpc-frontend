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
} from 'material-react-table';
import Table from "@/components/NewTableComponent/Table";

const hiddenColumns = ['id'];

const JobPage = async () => {
  const columnHelper = createMRTColumnHelper<RecruitmentDTO>();
  const columns = generateColumns(recruitmentDTO)
  console.log(columns)
  const AllJobs = await fetchAllJobs(Cookies.get("accessToken"),undefined);
  console.log(AllJobs)
  const visibleColumns = columns.filter(
    (column:any) => !hiddenColumns.includes(column?.accessorKey)
  );
  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Jobs</h1>
      <div>
        {AllJobs && (
          <Table
            data={AllJobs}
            columns={visibleColumns}
            type={"job"}
          />
        )}
      </div>
    </div>
  );
};

export default JobPage;

"use client";
import { fetchRecruiterData } from "@/helpers/api";
import Cookies from "js-cookie";
import Table from "@/components/NewTableComponent/Table";
import type {DTO} from '@/dto/StudentDto'
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { recruiterdto } from "@/dto/RecruiterDto";
import type { RecruiterDTO } from "@/dto/RecruiterDto";

const hiddenColumns = ['id'];


const StudentPage = async () => {
  const columns = generateColumns(recruiterdto)
  console.log(columns)
  const AllRecruiters = await fetchRecruiterData(Cookies.get("accessToken"),null);
  const visibleColumns = columns.filter(
    (column:any) => !hiddenColumns.includes(column?.accessorKey)
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

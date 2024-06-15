"use client";
import { fetchStudentData } from "@/helpers/api";
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
import { jsondto } from "@/dto/StudentDto";


const hiddenColumns = ['userId', 'programId', 'id'];


const StudentPage = async () => {
  const columnHelper = createMRTColumnHelper<DTO>();
  const columns = generateColumns(jsondto)
  console.log(columns)
  const AllStudents = await fetchStudentData(Cookies.get("accessToken"),null);
  const visibleColumns = columns.filter(
    (column:any) => !hiddenColumns.includes(column?.accessorKey)
  );
  
  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Students</h1>
      <div>
        {AllStudents && (
          <Table
            data={AllStudents}
            columns={visibleColumns}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

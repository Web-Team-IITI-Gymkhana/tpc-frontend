"use client";
import { useState, useEffect } from 'react';
import { fetchStudentData, } from "@/helpers/api";
import Cookies from "js-cookie";
import Table from "@/components/NewTableComponent/Table";
import type { DTO } from '@/dto/StudentDto';
import { createMRTColumnHelper } from 'material-react-table';
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { jsondto } from "@/dto/StudentDto";
import { Form } from 'antd';
import { cookies } from 'next/headers';
const hiddenColumns = ['userId', 'programId','id'];

const StudentPage = () => {
  const [students, setStudents] = useState<DTO[]>([]);
  const columnHelper = createMRTColumnHelper<DTO>();
  const columns = generateColumns(jsondto);



 


  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey)
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData(Cookies.get("accessToken"), null);
      setStudents(data);
      console.log(data);
    };


    fetchData();
  }, []);


  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Students</h1>
      <div>
        {students.length > 0 && (
          <Table
            data={students}
            columns={visibleColumns}
            type={"student"}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

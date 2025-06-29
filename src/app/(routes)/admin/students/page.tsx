"use client";
import { useState, useEffect } from "react";
import { fetchStudentData } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import type { DTO } from "@/dto/StudentDto";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { jsondto } from "@/dto/StudentDto";

const hiddenColumns = ["userId", "programId", "id"];

const StudentPage = () => {
  const [students, setStudents] = useState<DTO[]>([]);
  const columns = generateColumns(jsondto);

  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData();
      setStudents(data);
    };

    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        Students
      </h1>
      <div>
        {students.length > 0 && (
          <Table data={students} columns={visibleColumns} type={"student"} />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

"use client";
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";

const jsonData = [
  {
    id: "string",
    userId: "string",
    programId: "string",
    rollNo: "string",
    category: "string",
    gender: "MALE",
    cpi: 0,
    user: {
      name: "string",
      email: "string",
      contact: "string",
    },
    program: {
      course: "string",
      branch: "string",
      year: "string",
    },
  },
];

const dynamicColumns = generateColumns(jsonData[0]);

const StudentPage = async () => {
  const AllStudents = await fetchStudentData(Cookies.get("accessToken"),undefined);
  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Students</h1>
      <div>
        {AllStudents && (
          <TableComponent
            isAddButton={true}
            AddButtonText={"Add Students"}
            data={AllStudents}
            columns={dynamicColumns}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

"use client";
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";

const dto = [
  {
    id: "string",
    userId: "string",
    programId: "string",
    rollNo: "number",
    category: "string",
    gender: "MALE",
    cpi: "number",
    user: {
      name: "string",
      email: "string",
      contact: "string",
    },
    program: {
      course: "string",
      branch: "string",
      year: "number",
    },
  },
];

const dynamicColumns = generateColumns(dto[0]);

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
            dto={dto}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

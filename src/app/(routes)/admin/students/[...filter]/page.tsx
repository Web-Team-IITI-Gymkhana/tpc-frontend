"use client";
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const dto = [
    {
        id: "string",
        userId: "string",
        programId: "string",
        rollNo: "number",
        category: "string",
        gender: "MALE",
        cpi: "number",
        user: { name: "string", email: "string", contact: "string" },
        program: { course: "string", branch: "string", year: "number" },
    },
];

const dynamicColumns = generateColumns(dto[0]);

const StudentPage = ({ params }: any) => {
    const [students, setStudents] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            // Decode the URL
            

            // Extract query parameters from the URL
            const decodedParams = decodeURIComponent(params.filter[0]);
            console.log(decodedParams)
            const AllStudents = await fetchStudentData(
      
                decodedParams
            );
            setStudents(AllStudents);
        };

        fetchData();
    }, [params?.filter[0]]);

    return (
        <div className="m-10">
            <h1 className="text-center font-bold text-3xl my-5 py-5">Students Filter</h1>
            <div>
                {students.length > 0 && (
                    <TableComponent
                        isAddButton={true}
                        AddButtonText={"Add Students"}
                        data={students}
                        columns={dynamicColumns}
                        dto={dto}
                    />
                )}
            </div>
        </div>
    );
};

export default StudentPage;
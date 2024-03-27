'use client'
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { StudentsData } from "@/dummyData/students";
import { ColumnDef } from "@tanstack/react-table";

const jsonData = [
	{
		"id": "string",
		"userId": "string",
		"programId": "string",
		"rollNo": "string",
		"category": "string",
		"gender": "MALE",
		"cpi": 0,
		"user": {
			"name": "string",
			"email": "string",
			"contact": "string"
		},
		"program": {
			"course": "string",
			"branch": "string",
			"year": "string"
		}
	}
];


function generateColumns(jsonData: any) {
	const generatedColumns: any = [];

	function generateColumnsRecursive(data: any, prefix = '') {
		Object.entries(data).forEach(([key, value]) => {
			const header = prefix ? `${prefix}_${key}` : key;

			if (typeof value === 'object' && value !== null) {
				generateColumnsRecursive(value, header);
			} else {
				const column = {
					accessorKey: prefix ? `${prefix}.${key}` : key,
					header: header.charAt(0).toUpperCase() + header.slice(1),
					cell: ({ row }: any) => (
						<div>
							{prefix ? row.original[prefix][key] : row.getValue(key)}
						</div>
					),
				};

				generatedColumns.push(column);
			}
		});
	}
	generateColumnsRecursive(jsonData);

	return generatedColumns;
}

const dynamicColumns = generateColumns(jsonData[0]);



const StudentPage = async () => {
	const [url, seturl] = useState('http://localhost:5000/api/v1/students');
	
	const AllStudents = await fetchStudentData(Cookies.get("accessToken"), url);
	return (
		<div className="m-10">
			<h1 className="text-center font-bold text-3xl my-5 py-5">Students</h1>
			<div>
				<TableComponent
					isAddButton={true}
					AddButtonText={"Add Students"}
					data={AllStudents}
					columns={dynamicColumns}
					url={url}
					seturl={seturl}
				/>
			</div>
		</div>
	);
};


export default StudentPage;
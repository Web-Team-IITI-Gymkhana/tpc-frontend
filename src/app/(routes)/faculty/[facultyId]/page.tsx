"use client";
import { fetchApprovals, updateApproval } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";
import { useState, useEffect } from "react";

const dto = [
  {
    id: "string",
    faculty: {
      id: "string",
      // user: {
      //   id: "string",
      //   email: "string",
      //   name: "string",
      //   contact: "string",
      // },
      department: "string",
    },
    salaryId: "string",
    status: "string",
    remarks: "string",
  },
];

const dynamicColumns = generateColumns(dto[0]);

const FacultyPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchApprovals(undefined, undefined);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Approvals</h1>
      <div>
        {data && (
          <TableComponent
            data={data}
            columns={dynamicColumns}
            dto={dto}
            isFeedbackForm={true}
          />
        )}
      </div>
    </div>
  );
};

export default FacultyPage;

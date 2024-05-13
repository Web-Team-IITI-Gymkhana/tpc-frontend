"use client";
import { fetchApprovals, updateApproval } from "@/helpers/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";
import { useState, useEffect } from "react";

const dto = [
  {
    id: "string",
    job: {
      role: "string",
      company: {
        name: "string",
      },
      season: {
        type: "string",
        year: "string",
      },
    },
    salary: {
      period: "string",
      ctc: "string",
    },
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
    <div className="md:m-12 m-2">
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

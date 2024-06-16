"use client";
import { fetchApprovals, updateApproval } from "@/helpers/faculty/api";
import Cookies from "js-cookie";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";
import { useState, useEffect } from "react";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";

const dto = [
  {
    status: "string",
    remarks: "string",
    faculty: {
      department: "string",
      user: {
        email: "string",
        name: "string",
        contact: "string",
      },
    },
    salary: {
      salaryPeriod: "string",
      totalCTC: "number",
      job: {
        role: "string",
        joiningDate: "string",
        season: {
          year: "string",
          type: "string",
        },
        company: {
          name: "string",
        },
      },
    },
  },
];

const dynamicColumns = generateColumns(dto);

const FacultyPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchApprovals(
          Cookies.get("accessToken"),
          undefined
        );
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
        {loading && (
          <img src={loadingImg.src} alt="" className="mx-auto my-auto" />
        )}
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

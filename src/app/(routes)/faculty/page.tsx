"use client";
import { fetchApprovals } from "@/helpers/faculty/api";
import TableComponent from "@/components/TableComponent/TableComponent";
import generateColumns from "@/components/TableComponent/ColumnMapping";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/loader";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import toast from "react-hot-toast";

const dto = [
  {
    status: "string",
    remarks: "string",
    salary: {
      salaryPeriod: "string",
      totalCTC: "number",
      job: {
        role: "string",
        company: {
          name: "string",
        },
        season: {
          year: "string",
          type: "string",
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
        const jsonData = await fetchApprovals(undefined);
        setData(jsonData);
      } catch (error) {
        toast.error("Error fetching data:", error);
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
          <div className=" w-[100%] h-[50vh] mx-2 py-4 rounded-md bg-white  flex justify-center items-center">
            <Loader />
          </div>
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

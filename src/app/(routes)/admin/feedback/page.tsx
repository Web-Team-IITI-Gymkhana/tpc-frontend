"use client";

import { fetchAllFeedbacks } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import { createMRTColumnHelper } from "material-react-table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";

const columnHelper = createMRTColumnHelper<any>();

const columns = [
  columnHelper.accessor("recruiterName", { header: "Recruiter Name" }),
  columnHelper.accessor("recruiterEmail", { header: "Recruiter Email" }),
  columnHelper.accessor("recruiterDesignation", { header: "Designation" }),
  columnHelper.accessor("companyName", { header: "Company" }),
  columnHelper.accessor("seasonYear", { header: "Season Year" }),
  columnHelper.accessor("seasonType", { header: "Season Type" }),
  columnHelper.accessor("createdAt", {
    header: "Submitted On",
    Cell: ({ cell }) =>
      new Date(cell.getValue()).toLocaleDateString(),
  }),
];

const FeedbackPage = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchAllFeedbacks();
      setFeedbacks(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">
        Recruiter Feedback
      </h1>

      {loading ? (
        <div className="h-48 flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <Table data={feedbacks} columns={columns} type="feedback" />
      )}
    </div>
  );
};

export default FeedbackPage;

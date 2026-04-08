"use client";

import { fetchAllFeedbacks, fetchFeedbackById } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import { createMRTColumnHelper } from "material-react-table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import { generateFeedbackPdf } from "@/utils/generateFeedbackPdf";

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

  if (loading) {
    return (
      <div className="h-48 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 px-6 py-4">
      <h1 className="text-center font-bold text-3xl my-5">
        Recruiter Feedback
      </h1>

      <Table
        data={feedbacks}
        columns={columns}
        type="feedback"
        buttonText="Download Selected Feedbacks (PDF)"
        buttonAction={async (selectedRows: any[]) => {
          if (!selectedRows || selectedRows.length === 0) return;

          // Fetch full feedback data of each feedback
          const fullFeedbacks = await Promise.all(
            selectedRows.map((row) => fetchFeedbackById(row.id)),
          );

          generateFeedbackPdf(fullFeedbacks, {
            fileName: "Recruiter_Feedbacks.pdf",
          });
        }}
      />
    </div>
  );
};

export default FeedbackPage;

"use client";
import { fetchAllJobs, deleteJobs } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import type { RecruitmentDTO } from "@/dto/JobDto";
import { recruitmentDTO } from "@/dto/JobDto";
import { createMRTColumnHelper } from "material-react-table";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";

const hiddenColumns = [
  "id",
  "season.id",
  "company.id",
  "recruiter.id",
  "recruiter.user.id",
];

const JobPage = () => {
  const columns = generateColumns(recruitmentDTO);
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState();
  console.log(columns);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllJobs();
      const newData = data.map((d: any) => ({
        ...d,
        active: d.active ? "Active" : "Inactive",
      }));
      setAllJobs(newData);
    } catch (error) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (selectedJobs: any[]) => {
    if (selectedJobs.length === 0) {
      toast.error("Please select at least one job to delete");
      return;
    }

    const confirmMessage = `Are you sure you want to delete ${selectedJobs.length} job(s)? This will also delete associated events, salaries, and offers. This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const ids = selectedJobs.map((job) => job.id);
      await deleteJobs(ids);
      toast.success(`Successfully deleted ${selectedJobs.length} job(s)`);
      await getData(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete jobs");
    }
  };

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        Jobs
      </h1>
      <div>
        {loading && (
          <div className="h-48 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {allJobs && (
          <Table
            data={allJobs}
            columns={visibleColumns}
            type={"job"}
            buttonText="Delete Selected"
            buttonAction={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default JobPage;

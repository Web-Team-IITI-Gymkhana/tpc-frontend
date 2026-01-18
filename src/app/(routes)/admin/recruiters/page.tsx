"use client";
import { fetchRecruiterData, deleteRecruiters } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { RecruiterDTO, recruiterdto } from "@/dto/RecruiterDto";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const hiddenColumns = ["id", "user.id", "company.id"];

const StudentPage = () => {
  const columns = generateColumns(recruiterdto);
  const [AllRecruiters, setRecruiters] = useState<RecruiterDTO[]>([]);
  
  const fetchRecruiters = async () => {
    try {
      const data = await fetchRecruiterData();
      setRecruiters(data);
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  const handleDelete = async (selectedRecruiters: any[]) => {
    if (selectedRecruiters.length === 0) {
      toast.error("Please select at least one recruiter to delete");
      return;
    }

    const confirmMessage = `Are you sure you want to delete ${selectedRecruiters.length} recruiter(s)? This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const ids = selectedRecruiters.map((recruiter) => recruiter.id);
      await deleteRecruiters(ids);
      toast.success(`Successfully deleted ${selectedRecruiters.length} recruiter(s)`);
      await fetchRecruiters(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete recruiters. They might have associated jobs.");
    }
  };

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        Recruiters
      </h1>
      <div>
        {AllRecruiters && (
          <Table
            data={AllRecruiters}
            columns={visibleColumns}
            type={"recruiter"}
            buttonText="Delete Selected"
            buttonAction={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

"use client";
import { fetchcompanies, deleteCompanies } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { companyDTO } from "@/dto/CompanyDto";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";

const hiddenColumns = ["id"];

const JobPage = () => {
  const columns = generateColumns(companyDTO);
  const [loading, setLoading] = useState(true);
  const [allCompanies, setAllCompanies] = useState();
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetchcompanies();
      setAllCompanies(data);
    } catch (error) {
      toast.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (selectedCompanies: any[]) => {
    if (selectedCompanies.length === 0) {
      toast.error("Please select at least one company to delete");
      return;
    }

    const confirmMessage = `Are you sure you want to delete ${selectedCompanies.length} company/companies? This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const ids = selectedCompanies.map((company) => company.id);
      await deleteCompanies(ids);
      toast.success(`Successfully deleted ${selectedCompanies.length} company/companies`);
      await getData(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete companies. They might have associated jobs.");
    }
  };

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        Companies
      </h1>
      <div>
        {loading && (
          <div className="h-48 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {allCompanies && (
          <Table
            data={allCompanies}
            columns={visibleColumns}
            type={"company"}
            buttonText="Delete Selected"
            buttonAction={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default JobPage;

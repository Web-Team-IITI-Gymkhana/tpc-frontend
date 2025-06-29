"use client";
import { fetchcompanies } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { companyDTO } from "@/dto/CompanyDto";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";

const hiddenColumns = ["id"];

const JobPage = () => {
  const columns = generateColumns(companyDTO);
  const [loading, setLoading] = useState(true);
  const [allCompanies, setAllCompanies] = useState();
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    const getData = async () => {
      const data = await fetchcompanies();
      setAllCompanies(data);
      setLoading(false);
    };
    getData();
  }, []);

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
          />
        )}
      </div>
    </div>
  );
};

export default JobPage;

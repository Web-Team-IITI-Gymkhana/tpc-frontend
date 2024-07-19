"use client";
import { fetchComapnies } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { companyDTO } from "@/dto/CompanyDto";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      const data = await fetchComapnies();
      setAllCompanies(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Companies</h1>
      <div className="flex justify-end mb-4">
        <Link href="/admin/companies/addCompany">
          <Button>Add Company</Button>
        </Link>
      </div>
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

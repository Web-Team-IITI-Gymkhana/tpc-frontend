"use client";
import { fetchExternalOpportunities } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { externalOpportunityDTO } from "@/dto/ExternalOpportunityDto";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import { Button } from "@/components/ui/button";
import { AddExternalOpportunity } from "@/components/Admin/ExternalOpportunities";
import toast from "react-hot-toast";

const hiddenColumns = ["id"];

const ExternalOpportunitiesPage = () => {
  const columns = generateColumns(externalOpportunityDTO);
  const [loading, setLoading] = useState(true);
  const [allOpportunities, setAllOpportunities] = useState();
  const [addOpportunityForm, setAddOpportunityForm] = useState(false);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchExternalOpportunities();
        setAllOpportunities(data);
      } catch (error) {
        toast.error("Failed to fetch external opportunities");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mx-auto my-4 md:my-8 px-2 md:px-4">
      <h1 className="text-2xl md:text-3xl mb-4 md:mb-8 font-bold mx-auto text-center">
        External Opportunities
      </h1>
      {addOpportunityForm && (
        <AddExternalOpportunity
          open={addOpportunityForm}
          setOpen={setAddOpportunityForm}
          onSuccess={() => {
            // Refresh data after adding
            const getData = async () => {
              try {
                const data = await fetchExternalOpportunities();
                setAllOpportunities(data);
              } catch (error) {
                toast.error("Failed to refresh data");
              }
            };
            getData();
          }}
        />
      )}
      <div className="w-full px-2 md:px-4 pb-4 flex justify-center md:justify-end">
        <Button
          onClick={() => {
            setAddOpportunityForm(true);
          }}
          className="w-full sm:w-auto"
        >
          Add External Opportunity
        </Button>
      </div>
      {loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
      {allOpportunities && (
        <div>
          <Table
            data={allOpportunities}
            columns={visibleColumns}
            type={"external-opportunities"}
          />
        </div>
      )}
    </div>
  );
};

export default ExternalOpportunitiesPage;

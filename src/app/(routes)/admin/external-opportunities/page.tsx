"use client";
import { fetchExternalOpportunities, deleteExternalOpportunities } from "@/helpers/api";
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

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetchExternalOpportunities();
      setAllOpportunities(data);
    } catch (error) {
      toast.error("Failed to fetch external opportunities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (selectedOpportunities: any[]) => {
    if (selectedOpportunities.length === 0) {
      toast.error("Please select at least one opportunity to delete");
      return;
    }

    const confirmMessage = `Are you sure you want to delete ${selectedOpportunities.length} external opportunity/opportunities? This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const ids = selectedOpportunities.map((opp) => opp.id);
      await deleteExternalOpportunities(ids);
      toast.success(`Successfully deleted ${selectedOpportunities.length} opportunity/opportunities`);
      await getData();
    } catch (error) {
      toast.error("Failed to delete external opportunities");
    }
  };

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
            buttonText="Delete Selected"
            buttonAction={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ExternalOpportunitiesPage;

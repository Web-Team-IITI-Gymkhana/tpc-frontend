"use client";
import { useState, useEffect } from "react";
import { fetchTPCMembers, deleteTPCMembers } from "@/helpers/admin/api";
import Table from "@/components/NewTableComponent/Table";
import type { DTO } from "@/dto/TPCMemberDto";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { jsondto } from "@/dto/TPCMemberDto";
import { toast } from "react-hot-toast";

const hiddenColumns = ["id", "student.id", "student.program.id", "student.user.id"];

const TPCMembersPage = () => {
  const [tpcMembers, setTPCMembers] = useState<DTO[]>([]);
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(jsondto);

  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchTPCMembers();
      setTPCMembers(data);
    } catch (error) {
      console.error("Error fetching CAMC members:", error);
      toast.error("Failed to fetch CAMC members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (selectedMembers: any[]) => {
    if (selectedMembers.length === 0) {
      toast.error("Please select at least one CAMC member to delete");
      return;
    }

    const confirmMessage = `Are you sure you want to remove ${selectedMembers.length} CAMC member(s)? This will revoke their CAMC member status. This action cannot be undone.`;
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const ids = selectedMembers.map((member) => member.id);
      await deleteTPCMembers(ids);
      toast.success(`Successfully removed ${selectedMembers.length} CAMC member(s)`);
      await fetchData(); // Refresh the list
    } catch (error) {
      toast.error("Failed to delete CAMC members");
    }
  };

  if (loading) {
    return (
      <div className="m-2 md:m-6 lg:m-10">
        <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
          CAMC Members
        </h1>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        CAMC Members
      </h1>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Total CAMC Members: {tpcMembers.length}
        </div>
        <div className="flex gap-4">
          <div className="text-sm">
            <span className="font-semibold">Managers:</span>{" "}
            {tpcMembers.filter((member) => member.role === "MANAGER").length}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Coordinators:</span>{" "}
            {tpcMembers.filter((member) => member.role === "COORDINATOR").length}
          </div>
        </div>
      </div>

      {tpcMembers.length > 0 ? (
        <Table
          data={tpcMembers}
          columns={visibleColumns}
          type={"tpc-member"}
          buttonText="Remove Selected"
          buttonAction={handleDelete}
        />
      ) : (
        <div className="text-center py-8">
          <div className="text-lg text-gray-500">No CAMC members found</div>
          <div className="text-sm text-gray-400 mt-2">
            CAMC members can be promoted from the Students page
          </div>
        </div>
      )}
    </div>
  );
};

export default TPCMembersPage;

"use client";
import { useState, useEffect } from "react";
import { fetchStudentData } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import type { DTO } from "@/dto/StudentDto";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { jsondto } from "@/dto/StudentDto";
import { CSVImportModal } from "@/components/common/CSVImportModal";
import { addStudents, promoteToManagers } from "@/helpers/admin/api";
import { fetchPrograms, fetchAllSeasons } from "@/helpers/api";
import { Program } from "@/dto/SalaryDto";
import { toast } from "react-hot-toast";
import BulkActionsModal from "@/components/common/BulkActionsModal";
import { createRegistrations } from "@/helpers/admin/api";

const hiddenColumns = ["userId", "programId", "id"];

const studentTemplateHeaders = [
  "rollNo",
  "category",
  "gender",
  "cpi",
  "name",
  "email",
  "contact",
];

const StudentPage = () => {
  const [students, setStudents] = useState<DTO[]>([]);
  const columns = generateColumns(jsondto);
  const [importOpen, setImportOpen] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [importLoading, setImportLoading] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState<DTO[]>([]);
  const [seasons, setSeasons] = useState<{ id: string; name: string }[]>([]);
  const [bulkLoading, setBulkLoading] = useState(false);

  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData();
      setStudents(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchPrograms().then((data) => setPrograms(data || []));
    fetchAllSeasons().then((data) => {
      if (Array.isArray(data)) {
        setSeasons(
          data.map((s: any) => ({
            id: s.id,
            name: `${s.type} - ${s.year}`,
          })),
        );
      }
    });
  }, []);

  const handleImport = async (data: any[]) => {
    if (!selectedProgram) {
      toast.error("Please select a program");
      return;
    }
    setImportLoading(true);
    try {
      const payload = data.map((row) => ({
        programId: selectedProgram,
        rollNo: row.rollNo,
        category: row.category,
        gender: row.gender,
        cpi: Number(row.cpi),
        user: {
          name: row.name,
          email: row.email,
          contact: row.contact,
        },
      }));
      await addStudents(payload);
      toast.success("Students added successfully");
      setImportOpen(false);
    } catch (e) {
      toast.error("Failed to add students");
    }
    setImportLoading(false);
  };

  const parseStudentRow = (row: any) => {
    if (!row.rollNo || !row.name || !row.email) return null;
    return row;
  };

  const handleBulkAction = (rows: DTO[]) => {
    setSelectedRows(rows);
    setBulkModalOpen(true);
  };

  const handleBulkModalSubmit = async (action: string, extraData?: any) => {
    if (action === "register-season") {
      if (!extraData?.seasonId) return;
      setBulkLoading(true);
      try {
        const payload = selectedRows.map((student) => ({
          studentId: student.id,
          seasonId: extraData.seasonId,
          registered: false,
        }));
        await createRegistrations(payload);
        toast.success("Registrations created successfully");
        setBulkModalOpen(false);
      } catch (e) {
        toast.error("Failed to create registrations");
      }
      setBulkLoading(false);
    } else if (action === "promote-tpc") {
      if (!extraData?.role) return;
      setBulkLoading(true);
      try {
        const payload = selectedRows.map((student) => ({
          studentId: student.id,
          role: extraData.role as "MANAGER" | "COORDINATOR",
        }));
        await promoteToManagers(payload);
        const roleLabel = extraData.role.toLowerCase();
        toast.success(
          `Successfully promoted ${selectedRows.length} student${selectedRows.length > 1 ? "s" : ""} to ${roleLabel}${selectedRows.length > 1 ? "s" : ""}`,
        );
        setBulkModalOpen(false);
      } catch (e) {
        toast.error("Failed to promote students");
      }
      setBulkLoading(false);
    }
    // Add more actions here later
  };

  return (
    <div className="m-2 md:m-6 lg:m-10">
      <h1 className="text-center font-bold text-2xl md:text-3xl my-3 md:my-5 py-3 md:py-5">
        Students
      </h1>
      <div className="mb-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
        <select
          className="border rounded px-2 py-1"
          value={selectedProgram}
          onChange={(e) => setSelectedProgram(e.target.value)}
        >
          <option value="">Select Program</option>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.department} - {p.course} - {p.branch} - {p.year}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setImportOpen(true)}
          disabled={!selectedProgram}
        >
          Import Students from CSV
        </button>
      </div>
      <CSVImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onSubmit={handleImport}
        templateHeaders={studentTemplateHeaders}
        templateFileName="students_template.csv"
        parseRow={parseStudentRow}
        entityName="students"
      />
      <div>
        {students.length > 0 && (
          <Table
            data={students}
            columns={visibleColumns}
            type={"student"}
            buttonText="Bulk Actions"
            buttonAction={handleBulkAction}
          />
        )}
      </div>
      <BulkActionsModal
        open={bulkModalOpen}
        onClose={() => setBulkModalOpen(false)}
        actions={[
          { label: "Create registration for season", value: "register-season" },
          { label: "Promote to TPC Member", value: "promote-tpc" },
        ]}
        onSubmit={handleBulkModalSubmit}
        seasons={seasons}
        roles={[
          { label: "Manager", value: "MANAGER" },
          { label: "Coordinator", value: "COORDINATOR" },
        ]}
      />
    </div>
  );
};

export default StudentPage;

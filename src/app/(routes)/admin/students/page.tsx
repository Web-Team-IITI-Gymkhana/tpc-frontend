"use client";
import { useState, useEffect } from "react";
import { fetchStudentData } from "@/helpers/api";
import Table from "@/components/NewTableComponent/Table";
import type { DTO } from "@/dto/StudentDto";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { jsondto } from "@/dto/StudentDto";
import { CSVImportModal } from "@/components/common/CSVImportModal";
import { addStudents } from "@/helpers/admin/api";
import { fetchPrograms } from "@/helpers/api";
import { Program } from "@/dto/SalaryDto";
import { toast } from "react-hot-toast";

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
          <Table data={students} columns={visibleColumns} type={"student"} />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

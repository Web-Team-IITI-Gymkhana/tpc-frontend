"use client";
import { useEffect, useState } from "react";
import { fetchPrograms, postPrograms } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import Table from "@/components/NewTableComponent/Table";
import Loader from "@/components/Loader/loader";
import { Program } from "@/components/Admin/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CourseEnum, DepartmentEnum } from "@/dto/Programs";

const hiddenColumns = ["id"];

type ProgramForm = {
  branch: string;
  course: CourseEnum | "";
  year: string;
  department: DepartmentEnum | "";
};

const defaultForm: ProgramForm = {
  branch: "",
  course: "",
  year: "",
  department: "",
};

const ProgramsPage = () => {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  // Generate columns based on actual Program structure
  const columns =
    programs.length > 0
      ? generateColumns(programs)
      : generateColumns([
          {
            id: "",
            branch: "",
            course: CourseEnum.BTECH,
            year: "",
            department: DepartmentEnum.COMPUTER_SCIENCE_AND_ENGINEERING,
          } as Program,
        ]);

  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  const getPrograms = async () => {
    setLoading(true);
    try {
      const data = await fetchPrograms();
      setPrograms(data || []);
    } catch (e) {
      toast.error("Failed to fetch programs");
    }
    setLoading(false);
  };

  useEffect(() => {
    getPrograms();
  }, []);

  const handleOpen = () => {
    setForm(defaultForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(defaultForm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that required fields are selected
    if (!form.course) {
      toast.error("Please select a course");
      return;
    }
    if (!form.department) {
      toast.error("Please select a department");
      return;
    }

    setSubmitting(true);
    try {
      // Ensure we're sending the correct structure that matches CreateProgramsDto
      const programData = {
        branch: form.branch,
        course: form.course as CourseEnum,
        year: form.year,
        department: form.department as DepartmentEnum,
      };

      await postPrograms([programData]);
      toast.success("Program added successfully");
      handleClose();
      getPrograms();
    } catch (e) {
      toast.error("Failed to add program");
    }
    setSubmitting(false);
  };

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Programs</h1>
      <div className="flex justify-end mb-4">
        <Button onClick={handleOpen}>Add Program</Button>
      </div>
      <div>
        {loading ? (
          <div className="h-48 flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <Table data={programs} columns={visibleColumns} type={"program"} />
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Program</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2 text-black">
            <Input
              name="branch"
              placeholder="Branch"
              value={form.branch}
              onChange={handleChange}
              required
            />
            <Select
              value={form.course}
              onValueChange={(value: CourseEnum) =>
                setForm({ ...form, course: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CourseEnum).map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              name="year"
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />
            <Select
              value={form.department}
              onValueChange={(value: DepartmentEnum) =>
                setForm({ ...form, department: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(DepartmentEnum).map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Adding..." : "Add"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramsPage;

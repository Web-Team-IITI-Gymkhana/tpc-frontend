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

const hiddenColumns = ["id"];

const defaultForm = { branch: "", course: "", year: "", department: "" };

export enum DepartmentEnum {
  ASTRONOMY_ASTROPHYSICS_AND_SPACE_ENGINEERING = "Astronomy, Astrophysics and Space Engineering",
  BIOSCIENCES_AND_BIOMEDICAL_ENGINEERING = "Biosciences and Biomedical Engineering",
  CHEMISTRY = "Chemistry",
  CIVIL_ENGINEERING = "Civil Engineering",
  COMPUTER_SCIENCE_AND_ENGINEERING = "Computer Science and Engineering",
  ELECTRICAL_ENGINEERING = "Electrical Engineering",
  HUMANITIES_AND_SOCIAL_SCIENCES = "Humanities and Social Sciences",
  MATHEMATICS = "Mathematics",
  MECHANICAL_ENGINEERING = "Mechanical Engineering",
  METALLURGICAL_ENGINEERING_AND_MATERIALS_SCIENCE = "Metallurgical Engineering and Materials Science",
  PHYSICS = "Physics",
}

const ProgramsPage = () => {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const columns = generateColumns([
    { id: "", branch: "", course: "", year: "", department: "" },
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
    setSubmitting(true);
    try {
      await postPrograms([{ ...form }]);
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
            <Input
              name="course"
              placeholder="Course"
              value={form.course}
              onChange={handleChange}
              required
            />
            <Input
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />
            <Select
              value={form.department}
              onValueChange={(value) => setForm({ ...form, department: value })}
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

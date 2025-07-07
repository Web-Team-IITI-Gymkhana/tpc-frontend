"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Resume } from "@/helpers/student/types";
import { GetResumes, OpenResume, deleteResume } from "@/helpers/student/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadResume } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/components/Loader/loader";
const ResumePage = () => {
  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchResumes = async () => {
    try {
      const data = await GetResumes();
      setResumeData(data);
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const [file, setFile] = useState<File | null>(null);
  const [resumeName, setName] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOpenResume = (filename: string) => {
    OpenResume(filename);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!resumeName) {
      toast.error("Please enter a name.");
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      toast.error("Only PDF files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file, file.name);

      const data = await uploadResume(formData, resumeName);

      console.log("Upload response:", data);

      if (data.status) {
        toast.success("Uploaded Successfully");
        fetchResumes();
        setFile(null);
        setDialogOpen(false);
      } else {
        toast.error(data.message || "Error uploading file");
      }
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    const res = await deleteResume(filename);

    if (res) {
      toast.success("Deleted Successfully");
      fetchResumes();
    } else {
      toast.error("Error deleting file");
    }
  };

  useEffect(() => {
    if (resumeData.length === 0) {
      fetchResumes();
    }
  });

  return (
    <div className="min-h-screen p-2 md:p-4 lg:p-6">
      <div className="rounded-xl bg-white text-black p-3 md:p-5">
        <div className="font-bold text-lg md:text-xl">Resumes</div>
        {loading && (
          <div className="h-screen w-full flex justify-center items-center">
            <Loader />
          </div>
        )}
        {resumeData.length > 0 && (
          <>
            <div className="my-4">
              <Separator />
              <span className="text-sm text-gray-500">
                You can only upload upto 10 resumes.
              </span>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Sr.</TableHead>
                    <TableHead className="min-w-[150px]">Name</TableHead>
                    <TableHead className="min-w-[120px]">Status</TableHead>
                    <TableHead className="min-w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumeData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div
                          className="p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all duration-200 rounded-md hover:bg-blue-50 break-words"
                          onClick={() => handleOpenResume(item.filepath)}
                        >
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.verified
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.verified ? "Verified" : "Not Verified"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDelete(item.filepath)}
                          variant="destructive"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
        <div className="my-4">
          <Separator />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full sm:w-auto"
              onClick={() => setDialogOpen(true)}
            >
              Add Resume
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">
                Upload Resume
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base">
                Select and upload your resume file.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label className="text-black font-medium" htmlFor="name">
                  Resume Name
                </Label>
                <Input
                  id="name"
                  className="text-black"
                  type="text"
                  required
                  onChange={handleNameChange}
                  placeholder="Enter resume name"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label className="text-black font-medium" htmlFor="resume">
                  Resume File
                </Label>
                <Input
                  id="resume"
                  className="cursor-pointer text-black"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <div className="bg-slate-50 p-3 rounded-md">
                  <ul className="list-disc text-gray-600 text-xs pl-5 space-y-1">
                    <li>Only PDF files are accepted</li>
                    <li>File size must be less than 2 MB</li>
                  </ul>
                </div>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  className="w-full sm:w-auto"
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  loading={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Resume"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResumePage;

"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent  } from "react";
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
import Cookies from "js-cookie";
import Link from "next/link";
import { Resume } from "@/helpers/student/types";
import { GetResumes, deleteResume } from "@/helpers/student/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadResume } from "@/helpers/student/api";
import toast, { Toaster } from "react-hot-toast";


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const url = (NextUrl: string) => {
  return `${baseUrl}/api/v1${NextUrl}`;
};

// http://localhost:5000/api/v1/resumes/file/0c5dee48-c869-4219-b8c0-80cb6ce0e74d.pdf

const ResumePage = () => {

  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  const fetchResumes = async () => {
    const data = await GetResumes(Cookies.get("accessToken"));
    setResumeData(data);
  }

  const handleUploadForm = () => {
    setShowUploadForm(true);
  }

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file, file.name);

    const data = await uploadResume(formData, Cookies.get("accessToken"));

    if(data===201||data===204){
      toast.success("Uploaded Successfully");
      fetchResumes();
      setFile(null);
    }
    else{
      toast.error("Error uploading file")
    }
  };

  const handleDelete = async (filename: string) => {
    const res = await deleteResume(filename, Cookies.get("accessToken"));

    if(res===200){
      toast.success("Deleted Successfully");
      fetchResumes();
    }
    else{
      toast.error("Error deleting file")
    }

  }


  useEffect(()=>{  

    if(resumeData.length===0){
      fetchResumes();
    }
  })

  return (
    <>
      <div className="rounded-xl bg-white text-black p-5">
        <div className="font-bold text-lg">
            Resumes
        </div>
        <div className="my-4">
          <Separator />
        </div>
        {resumeData.length===0? (
          <div>No Resumes</div>
        ): (
          <Table className="overflow-hidden">
            <TableHeader>
                <TableRow>
                    <TableHead>Sr.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {resumeData.map((item,index)=>(
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                          <Link className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out" target="_blank" href={url(`/resumes/file/${item.filepath}`)}>
                            {item.filepath}
                          </Link>
                        </TableCell>
                        <TableCell>{item.verified? "Verified": "Not Verified"}</TableCell>
                        <TableCell>
                          <Button onClick={() => handleDelete(item.filepath)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        )}
        <div className="my-4">
            <Separator />
        </div>
        <Button onClick={handleUploadForm}>Add Resume</Button>
      </div>
      {showUploadForm && (
        <div className="rounded-xl bg-white text-black p-5 my-3">
          <form onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="resume">Resume</Label>
              <Input id="resume" className="cursor-pointer" type="file" onChange={handleFileChange} />
            </div>
            <Button className="my-4" type="submit">Add</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ResumePage;

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
import { Resume } from "@/helpers/student/types";
import { GetResumes, OpenResume, deleteResume } from "@/helpers/student/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { uploadResume } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ResumePage = () => {

  const [resumeData, setResumeData] = useState<Resume[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {    
    try {
      const data = await GetResumes();
      setResumeData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data:");
    } finally {
      setLoading(false);
    }
  }

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleOpenResume = async (filename: string) => {
    OpenResume(filename);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file, file.name);

    const data = await uploadResume(formData);

    if(data){
      toast.success("Uploaded Successfully");
      fetchResumes();
      setFile(null);
      setDialogOpen(false)
    }
    else{
      toast.error("Error uploading file")
    }
  };

  const handleDelete = async (filename: string) => {
    const res = await deleteResume(filename);

    if(res){
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
        {loading && <img src={loadingImg.src} alt="Loading" className="mx-auto my-auto" />}
        {resumeData.length >0 && (
          <>
            <div className="my-4">
              <Separator />
            </div>
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
                            <div className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out" onClick={()=>handleOpenResume(item.filepath)}>
                              {item.filepath}
                            </div>
                          </TableCell>
                          <TableCell>{item.verified? "Verified": "Not Verified"}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleDelete(item.filepath)}>Delete</Button>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        )}
        <div className="my-4">
            <Separator />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setDialogOpen(true)}>Add Resume</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Resume</DialogTitle>
              <DialogDescription>
                Select and upload your resume file.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Label className="text-black" htmlFor="name">Name</Label>
                <Input
                  id="name"
                  className="cursor-pointer text-black"
                  type="text"
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-black" htmlFor="resume">Resume</Label>
                <Input
                  id="resume"
                  className="cursor-pointer text-black"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <DialogFooter>
                <Button className="my-4" type="submit" >
                  Add
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ResumePage;

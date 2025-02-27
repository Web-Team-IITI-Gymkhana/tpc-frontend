"use client";
import React, { useEffect, useState } from "react";
import { fetchResumes, getResumeFile, patchResumeVerify } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import Table from "@/components/NewTableComponent/Table";
import { resumeDto, Resume, ResumeTableData } from "@/dto/ResumeDto";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const hiddenColumns = [
  "student.id",
  "id",
  "student.user.id",
  "student.program.id",
];

const Resumes = () => {
  const [allresumes, setAllResumes] = useState<ResumeTableData[]>();
  const newResumeDto = [{ update: "string", ...resumeDto[0] }];
  const columns = generateColumns(newResumeDto);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  const updateVerification = (id: string, resumes: ResumeTableData[]) => {
    patchResumeVerify([{ id: id, verified: true }]);
    const updatedResumes: ResumeTableData[] = resumes.map((resume) =>
      resume.id == id ? { ...resume, verified: true } : resume,
    );
    setData(updatedResumes);
  };

  const setData = (data: ResumeTableData[]) => {
    const newData = data.map((resume) => ({
      ...resume,
      filepath: (
        <Button
          onClick={() => {
            getResumeFile(resume.filepath as string);
          }}
        >
          Open Resume
        </Button>
      ),
      verified: (
        <div className="flex justify-center">
          {resume.verified ? <VerifiedIcon /> : <PendingOutlinedIcon />}
        </div>
      ),
      update: resume.verified ? (
        "Verified"
      ) : (
        <Button
          onClick={() => {
            updateVerification(resume.id, data);
          }}
        >
          Verify
        </Button>
      ),
    }));
    setAllResumes((prevData) => newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data: ResumeTableData[] = await fetchResumes();
      if (!data) {
        toast.error("Some error Occured");
        return;
      }
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Resumes</h1>
      <div>
        {allresumes && (
          <Table data={allresumes} columns={visibleColumns} type={"resume"} />
        )}
      </div>
    </div>
  );
};

export default Resumes;

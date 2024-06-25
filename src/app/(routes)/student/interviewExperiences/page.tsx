"use client";
import React, { useEffect, useState  } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import { InterviewExperience } from "@/helpers/student/types";
import { GetInterviewExpiriences, OpenInterviewExpirience } from "@/helpers/student/api";

// http://localhost:5000/api/v1/resumes/file/0c5dee48-c869-4219-b8c0-80cb6ce0e74d.pdf

const InterviewExpiriencePage = () => {

  const [interviewExpirienceData, setInterviewExpirienceData] = useState<InterviewExperience[]>([]);

  const fetchInterviewExpiriences = async () => {
    const data = await GetInterviewExpiriences(Cookies.get("accessToken"));
    setInterviewExpirienceData(data);
  }

  const handleOpenInterviewExpirience = async (filename: string) => {
    OpenInterviewExpirience(Cookies.get("accessToken"), filename);
  }


  useEffect(()=>{  

    if(interviewExpirienceData.length===0){
      fetchInterviewExpiriences();
    }
  })

  return (
    <>
      <div className="rounded-xl bg-white text-black p-5">
        <div className="font-bold text-lg">
            Interview Expiriences
        </div>
        <div className="my-4">
          <Separator />
        </div>
        {interviewExpirienceData.length===0? (
          <div>No Interview Expiriences</div>
        ): (
          <Table className="overflow-hidden">
            <TableHeader>
                <TableRow>
                    <TableHead>Sr.</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Season</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {interviewExpirienceData.map((item,index)=>(
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.company.name}</TableCell>
                        <TableCell>
                          <div className="my-1 p-2 text-blue-500 font-semibold cursor-pointer hover:text-blue-600 transition-all fade-in-out" onClick={()=>handleOpenInterviewExpirience(item.filename)}>
                            {item.studentName}
                          </div>
                        </TableCell>
                        <TableCell>{item.season.type} {item.season.year}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        )}
      </div>
    </>
  );
};

export default InterviewExpiriencePage;

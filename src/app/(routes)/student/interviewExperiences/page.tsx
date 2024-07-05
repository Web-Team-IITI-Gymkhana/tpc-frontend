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
import { InterviewExperience } from "@/helpers/student/types";
import { GetInterviewExpiriences, OpenInterviewExpirience } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";

const InterviewExpiriencePage = () => {

  const [interviewExpirienceData, setInterviewExpirienceData] = useState<InterviewExperience[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInterviewExpiriences = async () => {    
    try {
      const data = await GetInterviewExpiriences();
      setInterviewExpirienceData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data:");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenInterviewExpirience = async (filename: string) => {
    OpenInterviewExpirience(filename);
  }


  useEffect(()=>{  

    if(interviewExpirienceData.length == 0){
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
        {loading && <img src={loadingImg.src} alt="Loading" className="mx-auto my-auto" />}
        {interviewExpirienceData.length >0 && (
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

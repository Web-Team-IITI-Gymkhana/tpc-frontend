"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StudentDataType } from "@/helpers/student/types";
import { GetStudentData } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
import Loader from "@/components/Loader/loader";

const ProfilePage = () => {
  const [studentData, setStudentData] = useState<StudentDataType | null>(null);
  const [totalPenalty, setTotalPenalty] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await GetStudentData();
        setStudentData(data);

        if (data) {
          const total = data.penalties.reduce(
            (sum: number, penalty) => sum + penalty.penalty,
            0,
          );
          setTotalPenalty(total);
        }
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    if (studentData === null) {
      fetchStudentData();
    }
  });

  return (
    <div className="min-h-screen p-2 md:p-4 lg:p-6">
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {studentData && (
        <div className="">
          <div className="rounded-xl bg-white text-black p-3 md:p-5">
            <div
              className="font-bold text-lg md:text-xl"
              style={{ cursor: "pointer" }}
            >
              {studentData.user.name}
            </div>
            <div className="text-slate-500 font-semibold px-2 py-1 border rounded-3xl inline-block border-slate-500 text-xs mt-2">
              {studentData.rollNo}
            </div>
            <div className="mt-4">
              <div className="my-4">
                <Separator />
              </div>
              <h2 className="text-lg md:text-xl font-semibold my-2">Program</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">Course</div>
                  <div className="text-gray-900 font-medium">
                    {studentData.program.course}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">Branch</div>
                  <div className="text-gray-900 font-medium">
                    {studentData.program.branch}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">
                    Department
                  </div>
                  <div className="text-gray-900 font-medium">
                    {studentData.program.department}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">Year</div>
                  <div className="text-gray-900 font-medium">
                    {studentData.program.year}
                  </div>
                </div>
              </div>

              <div className="my-4">
                <Separator />
              </div>

              <h2 className="text-lg md:text-xl font-semibold my-2">
                Academics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-sm">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">
                    Category
                  </div>
                  <div className="text-gray-900 font-medium">
                    {studentData.category}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">Gender</div>
                  <div className="text-gray-900 font-medium">
                    {studentData.gender}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">CPI</div>
                  <div className="text-gray-900 font-medium text-lg">
                    {studentData.cpi}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">
                    Tenth Marks
                  </div>
                  <div className="text-gray-900 font-medium">
                    {studentData.tenthMarks}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-gray-500 font-semibold mb-1">
                    Twelth Marks
                  </div>
                  <div className="text-gray-900 font-medium">
                    {studentData.twelthMarks}
                  </div>
                </div>
              </div>

              {totalPenalty > 0 && (
                <>
                  <div className="my-4">
                    <Separator />
                  </div>

                  <h1 className="text-lg md:text-xl font-semibold my-2">
                    Penalties
                  </h1>
                  <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">Sr.</TableHead>
                          <TableHead className="min-w-[200px]">
                            Reason
                          </TableHead>
                          <TableHead className="w-24">Penalty</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentData.penalties.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell className="break-words">
                              {item.reason}
                            </TableCell>
                            <TableCell className="font-semibold">
                              {item.penalty}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell className="font-semibold">
                            Total:
                          </TableCell>
                          <TableCell className="font-bold text-lg">
                            {totalPenalty}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </>
              )}
              <div className="my-4">
                <Separator />
              </div>

              <h1 className="text-lg md:text-xl font-semibold my-2">Seasons</h1>
              <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Sr.</TableHead>
                      <TableHead className="w-20">Year</TableHead>
                      <TableHead className="min-w-[100px]">Type</TableHead>
                      <TableHead className="min-w-[120px]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentData.registrations.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell>{item.season.year}</TableCell>
                        <TableCell className="uppercase font-medium">
                          {item.season.type}
                        </TableCell>
                        <TableCell>
                          <Button className="w-full sm:w-auto">
                            {item.registered ? "Deregister" : "Register"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

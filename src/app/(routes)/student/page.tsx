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
        toast.error("Error fetching data",{duration: 3000});
      } finally {
        setLoading(false);
      }
    };

    if (studentData === null) {
      fetchStudentData();
    }
  });

  return (
    <>
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {studentData && (
        <div className="">
          <div className="rounded-xl bg-white text-black p-5">
            <div className="font-bold text-lg" style={{ cursor: "pointer" }}>
              {studentData.user.name}
            </div>
            <div className=" text-slate-500 font-semibold px-2 py-1 border rounded-3xl inline-block border-slate-500 text-xs ">
              {studentData.rollNo}
            </div>
            <div className="mt-4">
              <div className="my-4">
                <Separator />
              </div>
              <h2 className="text-lg font-semibold my-2">Program</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 text-sm mx-2">
                <div>
                  <div className="text-gray-500 font-semibold my-2">Course</div>{" "}
                  <div>{studentData.program.course}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">Branch</div>{" "}
                  <div>{studentData.program.branch}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Department
                  </div>{" "}
                  <div>{studentData.program.department}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">Year</div>{" "}
                  <div>{studentData.program.year}</div>
                </div>
              </div>

              <div className="my-4">
                <Separator />
              </div>

              <h2 className="text-lg font-semibold my-2">Academics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Category
                  </div>{" "}
                  <div>{studentData.category}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">Gender</div>{" "}
                  <div>{studentData.gender}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">CPI</div>{" "}
                  <div>{studentData.cpi}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Tenth Marks
                  </div>{" "}
                  <div>{studentData.tenthMarks}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-semibold my-2">
                    Twelth Marks
                  </div>{" "}
                  <div>{studentData.twelthMarks}</div>
                </div>
              </div>

              {totalPenalty > 0 && (
                <>
                  <div className="my-4">
                    <Separator />
                  </div>

                  <h1 className="text-lg font-semibold my-2">Penalties</h1>
                  <Table className="overflow-hidden">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sr.</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Penalty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentData.penalties.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.reason}</TableCell>
                          <TableCell>{item.penalty}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{totalPenalty}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </>
              )}
              <div className="my-4">
                <Separator />
              </div>

              <h1 className="text-lg font-semibold my-2">Seasons</h1>
              <Table className="overflow-hidden">
                <TableHeader>
                  <TableRow>
                    <TableHead>Sr.</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.registrations.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.season.year}</TableCell>
                      <TableCell>{item.season.type}</TableCell>
                      <TableCell>
                        <Button>
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
      )}
    </>
  );
};

export default ProfilePage;

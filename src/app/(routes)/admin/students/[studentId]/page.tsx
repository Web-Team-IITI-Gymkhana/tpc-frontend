"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
interface Props {
  params: {
    studentId: string
  }
}
// interface DataI {
//   Name: string
//   Email: string
//   Contact_No: string
//   Roll_No: string
//   Course: string
//   Branch: string
//   Year: string
//   Gender: string
//   CPI: string
//   Category: string
//   Resume_Link: { href: string; label: string }[]
//   Resumes_Verified: string
//   Total_Penalty: string
// }
interface DataI {
  id: "string"
  userId: "string"
  programId: "string"
  rollNo: "string"
  category: "string"
  gender: "MALE"
  cpi: 0
  user: {
    name: "string"
    email: "string"
    contact: "string"
  }
  program: {
    course: "string"
    branch: "string"
    year: "string"
  }
  resumes: {
    id: "string"
    metadata: object
    verified: true
  }[]
  totalPenalty: 0
}

// const data: DataI = {
//   Name: "John Doe",
//   Email: "johndoe@example.com",
//   Contact_No: "1234567890",
//   Roll_No: "A123",
//   Course: "Computer Science",
//   Branch: "Information Technology",
//   Year: "2022",
//   Gender: "Male",
//   CPI: "9.0",
//   Category: "General",
//   Resume_Link: [
//     { href: "https://example.com/resume1", label: "Resume 1" },
//     { href: "https://example.com/resume2", label: "Resume 2" },
//   ],
//   Resumes_Verified: "Yes",
//   Total_Penalty: "0",
// }

const StudentPage = ({ params }: Props) => {
  const [data, setStudentData] = useState<DataI>()
  useEffect(() => {
    const fetchStudent = async (studentId: string) => {
      const response = await fetch(
        `http://localhost:5000/api/v1/students/${studentId}`
      )
      const data = await response.json()

      setStudentData(data)
      // return data
      // console.log(data)
    }
    fetchStudent(params.studentId)
  }, [])

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Student ID:</p>
          <p>{params.studentId}</p>
        </div>
        <div>
          <p className="font-bold">Name:</p>
          <p>{data?.user?.name}</p>
        </div>
        <div>
          <p className="font-bold">Email:</p>
          <p>{data?.user?.email}</p>
        </div>
        <div>
          <p className="font-bold">Contact No:</p>
          <p>{data?.user?.contact}</p>
        </div>
        <div>
          <p className="font-bold">Roll No:</p>
          <p>{data?.rollNo}</p>
        </div>
        <div>
          <p className="font-bold">Course:</p>
          <p>{data?.program?.course}</p>
        </div>
        <div>
          <p className="font-bold">Branch:</p>
          <p>{data?.program?.branch}</p>
        </div>
        <div>
          <p className="font-bold">Year:</p>
          <p>{data?.program?.year}</p>
        </div>
        <div>
          <p className="font-bold">Gender:</p>
          <p>{data?.gender}</p>
        </div>
        <div>
          <p className="font-bold">CPI:</p>
          <p>{data?.cpi}</p>
        </div>
        <div>
          <p className="font-bold">Category:</p>
          <p>{data?.category}</p>
        </div>
        <div>
          <p className="font-bold">Resumes:</p>
          {data?.resumes.map((resume, index) => (
            <Link key={index} href={resume.id}>
              <p>{resume.id}</p>
            </Link>
          ))}
        </div>
        {/* <div>
          <p className="font-bold">Resumes Verified:</p>
          <p>{data?.resumes?.verified}</p>
        </div> */}
        <div>
          <p className="font-bold">Total Penalty:</p>
          <p>{data?.totalPenalty}</p>
        </div>
      </div>
    </div>
  )
}

export default StudentPage

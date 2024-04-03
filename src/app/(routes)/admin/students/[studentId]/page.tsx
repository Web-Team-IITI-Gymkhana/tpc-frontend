"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
interface Props {
  params: {
    studentId: string
  }
}

interface DataI {
  id: string
  userId: string
  programId: string
  rollNo: string
  category: string
  gender: string
  cpi: 0
  user: {
    name: string
    email: string
    contact: string
  }
  program: {
    course: string
    branch: string
    year: string
  }
  resumes: {
    id: string
    metadata: object
    verified: true
  }[]
  totalPenalty: 0
}

const sampleData: DataI = {
  id: "1",
  userId: "123",
  programId: "456",
  rollNo: "A001",
  category: "Science",
  gender: "Male",
  cpi: 0,
  user: {
    name: "John Doe",
    email: "johndoe@example.com",
    contact: "1234567890",
  },
  program: {
    course: "Computer Science",
    branch: "Software Engineering",
    year: "2022",
  },
  resumes: [
    {
      id: "1",
      metadata: {},
      verified: true,
    },
    {
      id: "2",
      metadata: {},
      verified: true,
    },
  ],
  totalPenalty: 0,
}

const StudentPage = ({ params }: Props) => {
  // const [data, setStudentData] = useState<DataI>()
  const [data, setStudentData] = useState<DataI>(sampleData)
  const [changed, setChanged] = useState(false)
  const handleChange = () => {
    setChanged(true)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/v1/students/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    // const data = await response.json()
    // console.log(data)
  }
  useEffect(() => {
    const fetchStudent = async (studentId: string) => {
      const response = await fetch(
        `http://localhost:5000/api/v1/students/${studentId}`
      )
      // const data = await response.json()

      // setStudentData(data)
      // return data
      // console.log(data)
    }
    fetchStudent(params.studentId)
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Student Details</h1>
        <div className="grid grid-cols-2 gzap-4">
          <div>
            <p className="font-bold">Student ID:</p>
            <p>{params.studentId}</p>
          </div>
          <div>
            <p className="font-bold">Name:</p>
            <input
              value={data.user.name}
              onChange={(e) => {
                handleChange()

                setStudentData({
                  ...data,
                  user: { ...data.user, name: e.target.value },
                })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Email:</p>
            {/* <p>{data?.user?.email}</p> */}
            <input
              value={data.user.email}
              onChange={(e) => {
                handleChange()

                setStudentData({
                  ...data,
                  user: { ...data.user, email: e.target.value },
                })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Contact No:</p>
            {/* <p>{data?.user?.contact}</p> */}
            <input
              value={data.user.contact}
              onChange={(e) => {
                handleChange()

                setStudentData({
                  ...data,
                  user: { ...data.user, contact: e.target.value },
                })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Roll No:</p>
            {/* <p>{data?.rollNo}</p> */}
            <input
              value={data.rollNo}
              onChange={(e) => {
                handleChange()

                setStudentData({ ...data, rollNo: e.target.value })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Course:</p>
            {/* <p>{data?.program?.course}</p> */}
            <input
              value={data.program.course}
              onChange={(e) => {
                handleChange()

                setStudentData({
                  ...data,
                  program: { ...data.program, course: e.target.value },
                })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Branch:</p>
            {/* <p>{data?.program?.branch}</p> */}
            <input
              value={data.program.branch}
              onChange={(e) => {
                handleChange()

                setStudentData({
                  ...data,
                  program: { ...data.program, branch: e.target.value },
                })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Year:</p>
            {/* <p>{data?.program?.year}</p> */}
            <input
              value={data.program.year}
              onChange={(e) => {
                handleChange()

                setStudentData({
                  ...data,
                  program: { ...data.program, year: e.target.value },
                })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Gender:</p>
            {/* <p>{data?.gender}</p> */}
            <input
              value={data?.gender}
              onChange={(e) => {
                handleChange()

                setStudentData({ ...data, gender: e.target.value })
              }}
            />
          </div>
          <div>
            <p className="font-bold">CPI:</p>
            {/* <p>{data?.cpi}</p> */}
            <input
              value={data.cpi}
              onChange={(e) => {
                handleChange()

                setStudentData({ ...data, cpi: 0 })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Category:</p>
            {/* <p>{data?.category}</p> */}
            <input
              value={data.category}
              onChange={(e) => {
                handleChange()

                setStudentData({ ...data, category: e.target.value })
              }}
            />
          </div>
          <div>
            <p className="font-bold">Resumes:</p>
            {data?.resumes.map((resume, index) => (
              <Link key={index} href={resume.metadata}>
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
            {/* <p>{data?.totalPenalty}</p> */}
            <input
              value={data.totalPenalty}
              onChange={(e) => {
                handleChange()

                setStudentData({ ...data, totalPenalty: 0 })
              }}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={
          changed
            ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
        }
        disabled={!changed}
      >
        Change
      </button>
    </form>
  )
}

export default StudentPage

"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
interface Props {
  params: {
    tpc_memberId: String
  }
}
interface DataI {
  id: "string"
  userId: "string"
  department: "string"
  role: "string"
  user: {
    name: "string"
    email: "string"
    contact: "string"
  }
  jobCoordinators: [
    {
      role: "PRIMARY/SECONDARY"
      job: {
        id: "string"
        seasonId: "string"
        companyId: "string"
        role: "string"
        currentStatus: "string"
        company: {
          name: "string"
        }
        season: {
          year: "string"
          type: "INTERN"
        }
      }
    },
  ]
}
// const data: DataI = {
//   Name: "John Doe",
//   Email: "johndoe@example.com",
//   Contact_No: "1234567890",
//   Role: "Admin",
//   Department: "IT",
//   Jobs: ["Job 1", "Job 2"],
// }

const TPC_Members_Page = ({ params }: Props) => {
  const [data, setData] = useState<DataI>()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/tpcMembers/${params.tpc_memberId}`
      )
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">TPC-Member Details</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">TPC-Member ID:</p>
            <p>{params.tpc_memberId}</p>
          </div>
          <div>
            <p className="font-bold">User Id:</p>
            <p>{data?.userId}</p>
          </div>
          <div>
            <p className="font-bold">Department:</p>
            <p>{data?.department}</p>
          </div>
          <div>
            <p className="font-bold">Role:</p>
            <p>{data?.role}</p>
          </div>
          <div>
            <p className="font-bold">User Name:</p>
            <p>{data?.user.name}</p>
          </div>
          <div>
            <p className="font-bold">User Email:</p>
            <p>{data?.user.email}</p>
          </div>
          <div>
            <p className="font-bold">User Contact:</p>
            <p>{data?.user.contact}</p>
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold">Job Coordinators:</p>
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Role</th>
              <th className="border p-2">Job ID</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Current Status</th>
              <th className="border p-2">Company Name</th>
              <th className="border p-2">Season Year</th>
              <th className="border p-2">Season Type</th>
            </tr>
          </thead>
          <tbody>
            {data?.jobCoordinators.map((jobCoordinator, index) => (
              <tr key={index}>
                <td className="border p-2">{jobCoordinator.role}</td>
                <td className="border p-2">{jobCoordinator.job.id}</td>
                <td className="border p-2">{jobCoordinator.job.role}</td>
                <td className="border p-2">
                  {jobCoordinator.job.currentStatus}
                </td>
                <td className="border p-2">
                  {jobCoordinator.job.company.name}
                </td>
                <td className="border p-2">{jobCoordinator.job.season.year}</td>
                <td className="border p-2">{jobCoordinator.job.season.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TPC_Members_Page

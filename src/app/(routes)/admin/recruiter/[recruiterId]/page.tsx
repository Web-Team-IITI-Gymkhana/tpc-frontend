"use client"

import Link from "next/link"
import React, { use, useEffect, useState } from "react"
interface Props {
  params: {
    recruiterId: string
  }
}
interface DataI {
  id: "string"
  companyId: "string"
  userId: "string"
  designation: "string"
  landline: "string"
  user: {
    name: "string"
    email: "string"
    contact: "string"
  }
  company: {
    name: "string"
    website: "string"
    domains: ["Advertising / Events"]
    category: "PUBLIC"
    address: {
      line1: "string"
      line2: "string"
      city: "string"
      state: "string"
      zipCode: "string"
      country: "string"
    }
    size: 0
    yearOfEstablishment: "string"
    annualTurnover: "string"
    socialMediaLink: "string"
  }
}
// const data: DataI = {
//   Name: "John Doe",
//   Email: "johndoe@example.com",
//   Contact_No: "1234567890",
//   Company_Id: "456",
//   Company_Name: "ABC Company",
// }

const RecruiterPage = ({ params }: Props) => {
  const [data, setData] = useState<DataI>()
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/recruiters/${params.recruiterId}`
      )
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [])
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Recruiter Details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Recruiter ID:</p>
          <p>{params.recruiterId}</p>
        </div>
        <div>
          <p className="font-bold">CompanyId:</p>
          <p>{data?.companyId}</p>
        </div>
        <div>
          <p className="font-bold">Designation:</p>
          <p>{data?.designation}</p>
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
          <p className="font-bold">Contact:</p>
          <p>{data?.user?.contact}</p>
        </div>
        <div>
          <p className="font-bold">Company Name:</p>
          <p>{data?.company?.name}</p>
        </div>
        <div>
          <p className="font-bold">Company website:</p>
          <p>{data?.company?.website}</p>
        </div>
        <div>
          <p className="font-bold">Company Domains:</p>
          {data?.company?.domains.map((domain, index) => (
            <>
              <div key={index}>
                <p>{domain}</p>
              </div>
            </>
          ))}
        </div>
        <div>
          <p className="font-bold">Category:</p>
          <p>{data?.company.category}</p>
        </div>
        <div>
          <p className="font-bold">Address:</p>
          <p>{data?.company.address.line1}</p>
          <p>{data?.company.address.line2}</p>
          <p>{data?.company.address.city}</p>
          <p>{data?.company.address.state}</p>
          <p>{data?.company.address.zipCode}</p>
          <p>{data?.company.address.country}</p>
        </div>
        <div>
          <p className="font-bold">Company Size:</p>
          <p>{data?.company.size}</p>
        </div>
        <div>
          <p className="font-bold">Company Year Of Establishment:</p>
          <p>{data?.company.yearOfEstablishment}</p>
        </div>
        <div>
          <p className="font-bold">Company Annual Turnover:</p>
          <p>{data?.company.annualTurnover}</p>
        </div>
        <div>
          <p className="font-bold">Company Social-Media-Link:</p>
          <Link
            href={
              data?.company?.socialMediaLink
                ? data.company.socialMediaLink
                : "#"
            }
          >
            Link
          </Link>
        </div>
      </div>
    </div>
  )
}
export default RecruiterPage

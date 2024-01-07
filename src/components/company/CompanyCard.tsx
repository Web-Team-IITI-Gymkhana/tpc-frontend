"use client";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { revalidateTag } from 'next/cache'
interface Props {
  Company: {
    id: string;
    name: string;
    metadata: object;
    createdAt: string;
    updatedAt: string;
  };
}

export default function CompanyCard({ Company }: Props) {
  console.log(Company);
  return (
    <div
      onClick={() => {
        Cookies.set("companyId", Company.id);
        console.log(Company.id);
      }}
    >
      {Company?.name}
    </div>
  );
}

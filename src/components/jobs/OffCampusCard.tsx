import React from "react";
import { Separator } from "../ui/separator";
import { OffCampusOffer } from "@/helpers/student/types";
interface Props {
  jobItem: OffCampusOffer;
}

const OffCampusCard = ({ jobItem }: Props) => {
  function formatNumber(num: number): string {
    if (num >= 1e7) {
      const crores = num / 1e7;
      return `₹${crores.toFixed(2)} Crores`;
    } else if (num >= 1e5) {
      const lakhs = num / 1e5;
      return `₹${lakhs.toFixed(2)} Lakhs`;
    } else {
      return `₹${num.toString()}`;
    }
  }

  return (
    <div className="">
      <div className="rounded-xl bg-white text-black p-5">
        <div className="font-semibold text-md ">{jobItem.company.name}</div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
            <div>{jobItem.role}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Salary</div>{" "}
            <div>{formatNumber(jobItem.salary)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Period</div>{" "}
            <div>{jobItem.salaryPeriod}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Status</div>{" "}
            <div>{jobItem.status}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Category</div>{" "}
            <div>{jobItem.company.category}</div>
          </div>
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="w-full h-30 border-2 p-2 text-sm">
          {jobItem.metadata}
        </div>
      </div>
    </div>
  );
};

export default OffCampusCard;

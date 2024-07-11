import React from "react";
import { Separator } from "../ui/separator";
import { useState, useEffect } from 'react';
import { OnCampusOffers, Salary } from "@/helpers/student/types";
import { GetSalaryById } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
interface Props {
  offerItem: OnCampusOffers;
  salaryId: string;
}
import  Loader from "@/components/Loader/loader";

const OnCampusCard = ({ offerItem, salaryId }: Props) => {
  const [salary, setSalary] = useState<Salary|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalary = async () => {      
      try {
        const data = await GetSalaryById(salaryId);
        setSalary(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    if(salaryId){
      fetchSalary();
    }
    // setJobs(Jobs);
  }, [salaryId]);

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
      {loading && <div className="h-screen w-full flex justify-center items-center">
       <Loader/>
      </div>}     
      {salary && (
        <div className="rounded-xl bg-white text-black p-5">
        <div className="font-semibold text-md ">
          {offerItem.salary.job.company.name}
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 text-sm mx-2">
          <div>
            <div className="text-gray-500 font-semibold my-2">Role</div>{" "}
            <div>{offerItem.salary.job.role}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Status</div>{" "}
            <div>{offerItem.status}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Period</div>{" "}
            <div>{salary.salaryPeriod}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Season</div>{" "}
            <div>{offerItem.salary.job.season.type} {offerItem.salary.job.season.year}</div>
          </div>
        </div>
        <div className="my-4">
          <Separator />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
          <div>
            <div className="text-gray-500 font-semibold my-2">CTC</div>{" "}
            <div>{formatNumber(salary.totalCTC)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Base Salary</div>{" "}
            <div>{formatNumber(salary.baseSalary)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Take Home Salary</div>{" "}
            <div>{formatNumber(salary.takeHomeSalary)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Gross Salary</div>{" "}
            <div>{formatNumber(salary.grossSalary)}</div>
          </div>
          <div>
            <div className="text-gray-500 font-semibold my-2">Other compensations</div>{" "}
            <div>{formatNumber(salary.otherCompensations)}</div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default OnCampusCard;

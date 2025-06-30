import React from "react";
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import { OnCampusOffers, Salary } from "@/helpers/student/types";
import { GetSalaryById } from "@/helpers/student/api";
import toast from "react-hot-toast";
import loadingImg from "@/components/Faculty/loadingSpinner.svg";
interface Props {
  offerItem: OnCampusOffers;
  salaryId: string;
}
import Loader from "@/components/Loader/loader";

const OnCampusCard = ({ offerItem, salaryId }: Props) => {
  const [salary, setSalary] = useState<Salary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const data = await GetSalaryById(salaryId);
        setSalary(data);
        console.log(data);
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    };

    if (salaryId) {
      fetchSalary();
    }
    // setJobs(Jobs);
  }, [salaryId]);

  function formatNumber(num: number): string {
    if (!num || typeof num !== "number") return "₹0";

    if (num >= 1e7) {
      const crores = num / 1e7;
      return `₹${crores.toFixed(2)} Crores`;
    } else if (num >= 1e5) {
      const lakhs = num / 1e5;
      return `₹${lakhs.toFixed(2)} Lakhs`;
    } else if (num >= 1e3) {
      const thousands = num / 1e3;
      return `₹${thousands.toFixed(2)}K`;
    } else {
      return `₹${num.toString()}`;
    }
  }

  const isInternshipSeason = (seasonType: string): boolean => {
    return seasonType === "INTERNSHIP" || seasonType === "INTERN";
  };

  return (
    <div className="">
      {loading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
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
              <div>
                {isInternshipSeason(offerItem.salary.job.season.type)
                  ? "Internship"
                  : offerItem.salary.job.season.type}{" "}
                {offerItem.salary.job.season.year}
              </div>
            </div>
          </div>
          <div className="my-4">
            <Separator />
          </div>
          {!isInternshipSeason(offerItem.salary.job.season.type) ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">CTC</div>{" "}
                <div>
                  {salary.totalCTC ? formatNumber(salary.totalCTC) : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Base Salary
                </div>{" "}
                <div>
                  {salary.baseSalary ? formatNumber(salary.baseSalary) : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Take Home Salary
                </div>{" "}
                <div>
                  {salary.takeHomeSalary
                    ? formatNumber(salary.takeHomeSalary)
                    : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Gross Salary
                </div>{" "}
                <div>
                  {salary.grossSalary
                    ? formatNumber(salary.grossSalary)
                    : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Other compensations
                </div>{" "}
                <div>
                  {salary.otherCompensations
                    ? formatNumber(salary.otherCompensations)
                    : "N/A"}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 text-sm mx-2">
              <div>
                <div className="text-gray-500 font-semibold my-2">Stipend</div>{" "}
                <div>
                  {salary.stipend ? formatNumber(salary.stipend) : "N/A"}
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Foreign Currency Stipend
                </div>{" "}
                <div>{salary.foreignCurrencyStipend || "N/A"}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Accommodation
                </div>{" "}
                <div>{salary.accommodation ? "Yes" : "No"}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  PPO Provision
                </div>{" "}
                <div>{salary.ppoProvisionOnPerformance ? "Yes" : "No"}</div>
              </div>
              <div>
                <div className="text-gray-500 font-semibold my-2">
                  Tentative CTC for PPO
                </div>{" "}
                <div>
                  {salary.tentativeCTC
                    ? formatNumber(salary.tentativeCTC)
                    : "N/A"}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnCampusCard;

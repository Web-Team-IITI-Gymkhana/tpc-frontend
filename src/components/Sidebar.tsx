"use client";
import { useContext } from "react";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import { SessionDropDown } from "./SideBar/DropDowns/SeasonDropDown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { CompanyDropDown } from "./SideBar/DropDowns/CompanyDropDown";
import { JobDropDown } from "./SideBar/DropDowns/JobDropDown";
import { StudentDropDown } from "./SideBar/DropDowns/StudentDropDown";
import { FacultyDropDown } from "./SideBar/DropDowns/FacultyDropDown";
import { RecruiterDropDown } from "./SideBar/DropDowns/RecuiterDropDown";

interface Framework {
  value: string;
  label: string;
}

interface Season {
  id: string;
  year: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  AllSeasons: {
    seasons: Season[];
  };
}

const Sidebar = ({ AllSeasons }: Props) => {
  const context = useContext(ToggleContext);
  const userString = Cookies.get("user");

  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user?.userType === "ADMIN";
  const userRole = user?.userType?.toLowerCase();

  return (
    <motion.div
      initial={{ x: -223, opacity: 0 }}
      animate={context.isOpen ? "open" : "closed"}
      transition={{ duration: 0.3, type: "spring" }}
      variants={{
        closed: { x: -223, opacity: 1 },
        open: { x: -8, opacity: 1 },
      }}
      className="z-40 overflow-hidden left-0 fixed bg-gray-900 pt-3 px-4 w-[223px] flex flex-col h-full"
    >
      <div className="flex-auto">
        {isAdmin && (
          <div>
            <div>
              <div className="m-2">Companies</div>
              <CompanyDropDown userRole={userRole} />
            </div>
            <div>
              <div className="m-2">Jobs</div>
              <JobDropDown userRole={userRole} />
            </div>

            <div>
              <div className="m-2">Students</div>
              <StudentDropDown userRole={userRole} />
            </div>

            <div>
              <div className="m-2">Faculties</div>
              <FacultyDropDown userRole={userRole} />
            </div>

            <div>
              <div className="m-2">Recruiters</div>
              <RecruiterDropDown userRole={userRole} />
            </div>

            <div>
              <div className="m-2">Seasons</div>
              <SessionDropDown AllSeasons={AllSeasons} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Sidebar;

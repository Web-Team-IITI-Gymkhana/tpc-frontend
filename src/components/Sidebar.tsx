"use client";
import { useContext, useEffect, useState } from "react";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Cookies from "js-cookie";
import Link from "next/link";
import NavButtonGroup from "@/components/NavButtonGroup";
import { CompanyDropDown } from "./SideBar/DropDowns/CompanyDropDown";
import { SessionDropDown } from "./SideBar/DropDowns/SeasonDropDown";
import { JobDropDown } from "./SideBar/DropDowns/JobDropDown";
import { StudentDropDown } from "./SideBar/DropDowns/StudentDropDown";
import { FacultyDropDown } from "./SideBar/DropDowns/FacultyDropDown";
import { RecruiterDropDown } from "./SideBar/DropDowns/RecuiterDropDown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import AdminDashboard from './SideBar/Roles/admin';
import StudentDashboard from "./SideBar/Roles/student";
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


const Sidebar = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const context = useContext(ToggleContext);
  const userString = Cookies.get("user");
  // const user = userString ? JSON.parse(userString) : null;
  // const isAdmin = user?.role === "ADMIN";
  // // const isAdmin = true;
  // const isStudent = user?.role === "STUDENT";
  const studentId=2;

  // const [role,setRole] = useState(user?.role);

  /// -------------------
  const [user, setUser] = useState(userString ? JSON.parse(userString) : null);
  const [role, setRole] = useState(user?.role);

  useEffect(() => {
    // Get the user cookie when the component mounts
    const userString = Cookies.get('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user);
      setRole(user.role);
    }
  }, []);

  const handleRoleChange = (newRole: string) => {
    const updatedUser = { ...user, role: newRole };
    setUser(updatedUser);
    setRole(newRole);
    Cookies.set('user', JSON.stringify(updatedUser), { expires: 365 });
  };

  const isStudent = (user?.role === 'STUDENT')?true:false;
  const isAdmin = (user?.role === 'ADMIN')?true:false;

// --------------------------



  return (
    <motion.div
      initial={{
        position: isSmallScreen ? "absolute" : "static",
        width: context.isOpen ? "18vw" : "6vw",
        visibility: "inherit",
      }}
      animate={context.isOpen ? "open" : "closed"}
      transition={{ duration: 0.2 }}
      variants={{
        closed: {
          width: isSmallScreen ? "1rem" : "6vw",
          visibility: isSmallScreen ? "hidden" : "visible",
        },
        open: {
          width: isSmallScreen ? "100vw" : "18vw",
          visibility: "visible",
        },
      }}
      className="z-40 overflow-hidden bg-gray-800 pt-3 flex flex-col h-screen"
    >
      <div className="relative">
        <div
          className="flex items-center align-middle absolute right-0 z-50 h-screen"
          onClick={(e) => {
            context.sidebarToggle();
          }}
        >
          <motion.div
            initial={{ rotateY: 0 }}
            animate={context.isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
            variants={{
              closed: { rotateY: 0 },
              open: { rotateY: 180 },
            }}
            className={
              !context.isOpen && isSmallScreen
                ? "visible bg-gray-200 py-2 rounded-lg opacity-50 hover:opacity-100"
                : "visible bg-gray-800 py-2 rounded-lg opacity-50 hover:opacity-100"
            }
          >
            <svg
              fill={!context.isOpen && isSmallScreen ? "#000000" : "#ffffff"}
              height="1rem"
              width="1rem"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
            >
              <path
                id="XMLID_222_"
                d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
	C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
	C255,161.018,253.42,157.202,250.606,154.389z"
              />
            </svg>
          </motion.div>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center justify-center">
        <Link href="/" className="text-white font-bold text-2xl">
          <div className="sm:block mx-2">TPC</div>
        </Link>
      </div>
      <div className="mx-[1vw] flex flex-col-reverse justify-between align-middle h-full">
        <div>
          {/* // */}
       {user?.role &&
        <div className="hover:bg-gray-900 text-white rounded-md my-[1vh] py-[1vh] px-[1vw]">
          <DropdownMenu>

            <DropdownMenuTrigger className="outline-none text-white">
            <div className={`flex justify-start gap-[0.5rem]`}>
              <div className="w-[2rem]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15.5C11.88 15.5 11.76 15.46 11.66 15.38L5.66 9.38C5.47 9.19 5.47 8.84 5.66 8.66C5.85 8.47 6.2 8.47 6.38 8.66L12 14.28L17.62 8.66C17.81 8.47 18.16 8.47 18.34 8.66C18.53 8.84 18.53 9.19 18.34 9.38L12.34 15.38C12.24 15.46 12.12 15.5 12 15.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <motion.div
                initial={{ opacity: 1 }}
                animate={context.isOpen ? "open" : "closed"}
                transition={{ duration: 0.1 }}
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
                className={`${context.isOpen?"visible":"hidden"} w-[9rem]`}
              >
                Role: {user?.role}
              </motion.div>
            </div> 
            </DropdownMenuTrigger>

            <DropdownMenuContent>
               <DropdownMenuItem onSelect={()=>{handleRoleChange("ADMIN")}}>
                TPC Admin {role==="ADMIN" && <span className=" text-green-500">&nbsp; &#9679;</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={()=>{handleRoleChange("RECRUITER")}}>
                Recruiter {role==="RECRUITER" && <span className=" text-green-500">&nbsp; &#9679;</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={()=>{handleRoleChange("MANAGER")}}>
                TPC Manager {role==="MANAGER" && <span className=" text-green-500">&nbsp; &#9679;</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={()=>{handleRoleChange("FACULTY")}}>
                Faculty {role==="FACULTY" && <span className=" text-green-500">&nbsp; &#9679;</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={()=>{handleRoleChange("STUDENT")}}>
                Student {role==="STUDENT" && <span className=" text-green-500">&nbsp; &#9679;</span>}
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            {/* <CompanyDropDown userRole={userRole} /> */}
          </div>}

          <div className="hover:bg-gray-900 text-white rounded-md my-[1vh] py-[1vh] px-[1vw]">
            <div className="flex justify-start gap-[1rem]">
              <div className="w-[2rem]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <motion.div
                initial={{ opacity: 1 }}
                animate={context.isOpen ? "open" : "closed"}
                transition={{ duration: 0.1 }}
                variants={{
                  closed: { opacity: 0 },
                  open: { opacity: 1 },
                }}
                className="w-[7rem]"
              >
                Profile
              </motion.div>
            </div>
            {/* <CompanyDropDown userRole={userRole} /> */}
          </div>
          <hr />
          <NavButtonGroup />
        </div>


{/* Admin dashboard */}

        {isAdmin && (
          <AdminDashboard/>
        )}





        {isStudent && (
          <StudentDashboard/>
        )}





      </div>
    </motion.div>
  );
};

export default Sidebar;

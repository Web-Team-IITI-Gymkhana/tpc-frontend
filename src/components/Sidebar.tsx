"use client";
import { useContext, useEffect, useState } from "react";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import NavButtonGroup from "@/components/NavButtonGroup";
import AdminDashboard from "./SideBar/Roles/admin";
import StudentDashboard from "./SideBar/Roles/student";
import RecruiterDashboard from "./SideBar/Roles/recruiter";
import { jwtDecode } from "jwt-decode";
import TpcMemberDashboard from "./SideBar/Roles/tpcMember";
const Sidebar = () => {
  const context = useContext(ToggleContext);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isRecruiter, setIsRecruiter] = useState<boolean>(false);
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const [isTpcMember, setIsTpcMember] = useState<boolean>(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      setLoggedIn(true);
    }
    setRole(user?.role.toLowerCase());
    setIsAdmin(user?.role === "ADMIN");
    setIsRecruiter(user?.role === "RECRUITER");
    setIsStudent(user?.role === "STUDENT");
    setIsTpcMember(user?.role === "TPC_MEMBER");
  }, []);

  return (
    <>
      {/* Mobile Layout - Visible on screens < 768px */}
      <div className="w-full flex flex-col bg-gradient-to-b from-slate-800 to-slate-800 z-40 md:hidden">
        {/* Mobile Navbar Header - Always visible */}
        <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-600">
          <Link href="/" className="text-white font-bold text-xl">
            TPC
          </Link>
          <button
            onClick={context.sidebarToggle}
            className="text-white p-2 hover:bg-slate-700 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
            aria-label={context.isOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={context.isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            >
              {context.isOpen ? (
                // X icon when menu is open
                <svg
                  fill="currentColor"
                  height="20"
                  width="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              ) : (
                // Hamburger icon when menu is closed
                <svg
                  fill="currentColor"
                  height="20"
                  width="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
              )}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu Backdrop - Close on tap outside */}
        {context.isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-30"
            onClick={context.sidebarToggle}
          />
        )}

        {/* Mobile Collapsible Menu */}
        <motion.div
          initial={{ height: 0 }}
          animate={context.isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          variants={{
            closed: { height: 0, opacity: 0 },
            open: { height: "auto", opacity: 1 },
          }}
          className="overflow-hidden relative z-40 bg-slate-800"
        >
          <div className="px-4 pb-4 space-y-2">
            {/* Mobile Role-specific Navigation */}
            <div className="space-y-2">
              {isAdmin && <AdminDashboard />}
              {isStudent && <StudentDashboard />}
              {isRecruiter && <RecruiterDashboard />}
              {isTpcMember && <TpcMemberDashboard />}
            </div>

            {/* Mobile Profile and Logout Section */}
            <div className="pt-2 border-t border-slate-600 space-y-2">
              {/* Mobile Profile Link */}
              <Link
                href={`/${role}/profile`}
                className="flex items-center gap-3 text-white hover:bg-slate-700 p-3 rounded transition-colors"
              >
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
                  />
                </svg>
                Profile
              </Link>

              {/* Mobile Navigation Buttons (Logout) */}
              <NavButtonGroup loggedIn={isLoggedIn} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Layout - Visible on screens >= 768px */}
      <motion.div
        initial={{
          width: context.isOpen ? "288px" : "80px",
          visibility: "inherit",
        }}
        animate={context.isOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
        variants={{
          closed: {
            width: "80px",
            minWidth: "80px",
            maxWidth: "80px",
            visibility: "visible",
          },
          open: {
            width: "288px",
            minWidth: "288px",
            maxWidth: "288px",
            visibility: "visible",
          },
        }}
        className="hidden md:flex z-40 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-800 pt-3 flex-col h-screen relative flex-shrink-0"
      >
        {/* Desktop Sidebar Toggle and Title */}
        <div className="relative">
          <div
            className="flex items-center align-middle absolute right-0 z-50 h-screen"
            onClick={context.sidebarToggle}
          >
            <motion.div
              initial={{ rotateY: 0 }}
              animate={context.isOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              variants={{
                closed: { rotateY: 0 },
                open: { rotateY: 180 },
              }}
              className="visible bg-slate-600 py-2 rounded-lg opacity-50 hover:opacity-100"
            >
              <svg
                fill="#ffffff"
                height="1rem"
                width="1rem"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 330 330"
              >
                <path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z" />
              </svg>
            </motion.div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center">
          <Link href="/" className="text-white font-bold text-2xl">
            <div className="sm:block mx-2">TPC</div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="mx-4 flex flex-col-reverse justify-between align-middle h-full">
          <div>
            <hr />
            <div className="hover:bg-slate-600/50 rounded-md my-2 py-2 px-4">
              <div className="flex justify-start gap-4">
                <div className="w-5 flex-shrink-0">
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
                  className="flex-1 text-white"
                >
                  <Link href={`/${role}/profile`} className="text-white">
                    Profile
                  </Link>
                </motion.div>
              </div>
            </div>
            <hr />
            <NavButtonGroup loggedIn={isLoggedIn} />
          </div>
          {isAdmin && <AdminDashboard />}
          {isStudent && <StudentDashboard />}
          {isRecruiter && <RecruiterDashboard />}
          {isTpcMember && <TpcMemberDashboard />}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

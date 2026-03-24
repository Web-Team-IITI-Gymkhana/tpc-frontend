"use client";
import { useContext } from "react";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import Link from "next/link";

const FacultyDashboard = () => {
  const context = useContext(ToggleContext);

  return (
    <>
      <div className="text-white">
        <Link href={"/faculty"}>
          <div className="hover:bg-slate-600/50 rounded-md my-2 py-2 px-4 text-white">
            <div className="flex justify-start gap-3">
              <div className="w-5 flex-shrink-0 text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                className={`${context.isOpen ? "visible" : "hidden"} flex-1 text-white`}
              >
                Approvals
              </motion.div>
            </div>
          </div>
        </Link>

        <Link href={"/faculty/help"}>
          <div className="hover:bg-slate-600/50 rounded-md my-2 py-2 px-4 text-white">
            <div className="flex justify-start gap-3">
              <div className="w-5 flex-shrink-0 text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21ZM23 15V17H17V15H23ZM20 19V21H14V19H20ZM21 11V13H15V11H21Z"
                    fill="currentColor"
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
                className={`${context.isOpen ? "visible" : "hidden"} flex-1 text-white`}
              >
                Help Center
              </motion.div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FacultyDashboard;

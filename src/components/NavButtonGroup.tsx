
"use client";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";

const NavLink = ({ href }: LinkProps) => {
  const path = usePathname();
  const context = useContext(ToggleContext);
  const isActive = path === href;
  const isLoggedIn = Cookies.get('accessToken') !== undefined;

  if (isActive || isLoggedIn) {
    return (
      <div className="bg-gray-900 rounded-md my-[1vh] py-[1vh] px-[1vw]">
        <div className="flex justify-start gap-[1vw]">
          <div className="w-[2vw]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#fff"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21h5a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-5"></path>
              <path d="m9 15 4-4-4-4M13 11H1"></path>
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
            className="w-[13vw]"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <Link href={href}>
      <div className="hover:bg-gray-900 rounded-md my-[1vh] py-[1vh] px-[1vw]">
        <div className="flex justify-start gap-[1rem]">
          <div className="w-[2rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#fff"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21h5a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-5"></path>
              <path d="m9 15 4-4-4-4M13 11H1"></path>
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
            className="w-[13vw]"
          >
            Login
          </motion.div>
        </div>
      </div>
    </Link>
  );
};

const NavButtonGroup = () => {
  const context = useContext(ToggleContext);
  const isLoggedIn = Cookies.get('accessToken') !== undefined;

  return (
    <div className="text-white">
      <div className="flex flex-col">
        {!isLoggedIn && <NavLink href="/login" />}
        {isLoggedIn && (
          <div className="hover:bg-gray-900 rounded-md mb-[1vh] py-[1vh] px-[1vw]">
            <div className="flex justify-start gap-[1rem]">
              <div className="w-[2rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
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
                className="w-[13vw] cursor-pointer"
                onClick={() => {
                  Cookies.remove("accessToken");
                  Cookies.remove("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavButtonGroup;

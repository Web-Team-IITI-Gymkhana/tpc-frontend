//this includes the login and logout buttons of the navbar
//it is a dropdown menu that appears when the user clicks on the user icon
//dropdown menu is a part of the navbar and opens on the right side of the navbar
"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href }: LinkProps) => {
  const path = usePathname();
  const isActive = path === href;
  if (isActive) {
    return (
      <button
        className="bg-gray-700
          text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-all duration-300"
      >
        Login
      </button>
    );
  }

  return (
    <Link href={href}>
      <button
        className="bg-gray-800
              text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-all duration-300"
      >
        Login
      </button>
    </Link>
  );
};

const NavButtonGroup = () => {
  return (
    <div className="lg:ml-12 sm:ml-7">
      <div className="flex-col">
        <NavLink href="/login" />
        <br />
        <button className="bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-all duration-300">
          <div className="hidden sm:block">Logout</div>
          <div className="block sm:hidden">
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
        </button>
      </div>
    </div>
  );
};

export default NavButtonGroup;

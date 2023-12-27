//this is the sidebar component
//it uses the ToggleContext to get the isOpen state and the sidebarToggle function
"use client";
import { useContext, useEffect } from "react";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import { SessionDropDown } from "./SideBar/DropDowns/SessionDropDown";

const Sidebar = (props: any) => {
  const context = useContext(ToggleContext);

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
        <div>
          <div className="m-2">Seasons</div>
          <SessionDropDown />
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

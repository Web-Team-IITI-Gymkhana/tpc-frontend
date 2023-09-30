//this is the sidebar component
//it uses the ToggleContext to get the isOpen state and the sidebarToggle function
"use client";
import { useContext, useEffect } from "react";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";

const Sidebar = (props: any) => {
  const context = useContext(ToggleContext);

  return (
    <motion.div
      style={{
        zIndex: 1000,
        overflow: "hidden",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
      initial={{ x: -208, opacity: 0 }}
      animate={context.isOpen ? "open" : "closed"}
      transition={{ duration: 0.3, type: "spring" }}
      variants={{
        closed: { x: -208, opacity: 1 },
        open: { x: -8, opacity: 1 },
      }}
      className={`bg-gray-900 pt-3 pl-4 w-[208px] absolute h-[92vh] bottom-0`}
    >
      Sidebar
    </motion.div>
  );
};

export default Sidebar;

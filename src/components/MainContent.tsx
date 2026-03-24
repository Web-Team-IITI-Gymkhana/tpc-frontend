"use client";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import { ReactNode, useContext, useEffect, useState } from "react";

const MainContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(ToggleContext);

  return (
    <div className="flex-grow bg-gray-200 text-black overflow-y-auto min-h-screen">
      {/* Single responsive container */}
      <motion.div
        animate={context.isOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
        variants={{
          closed: {
            width: "100%",
            marginLeft: "0",
          },
          open: {
            width: "100%",
            marginLeft: "0",
          },
        }}
        className="w-full px-1 py-2 md:p-4"
      >
        {children}
      </motion.div>
    </div>
  );
};
export default MainContent;

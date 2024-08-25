"use client";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import { ReactNode, useContext, useEffect } from "react";

const MainContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(ToggleContext);
  return (
    <motion.div
      initial={{ width: context.isOpen ? "82vw" : "95vw" }}
      animate={context.isOpen ? "open" : "closed"}
      transition={{ duration: 0.2 }}
      variants={{
        closed: { width: "95vw" },
        open: { width: "82vw" },
      }}
      className="flex-grow bg-gray-200 p-4 text-black overflow-y-scroll h-screen"
    >
      {children}
    </motion.div>
  );
};
export default MainContent;

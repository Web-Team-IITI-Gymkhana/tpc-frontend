"use client";
import { ToggleContext } from "@/contextProviders/ToggleProvider";
import { motion } from "framer-motion";
import { ReactNode, useContext, useEffect } from "react";

const MainContent = ({ children }: { children: ReactNode }) => {
  const context = useContext(ToggleContext);
  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={context.isOpen ? "open" : "closed"}
      transition={{ duration: 0.3, type: "spring" }}
      variants={{
        closed: { x: 0, opacity: 1 },
        open: { x: 200, opacity: 0.9 },
      }}
      className="flex-grow bg-gray-100 p-4 text-black"
    >
      {children}
    </motion.div>
  );
};
export default MainContent;

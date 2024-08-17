import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";

const Collapsible = ({
  title,
  children,
  defaultexpanded = false,
}: {
  title: String | React.ReactNode;
  children: React.ReactNode;
  defaultexpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultexpanded);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div
        className="flex flex-row justify-between cursor-pointer rounded-md border-2 border-gray-100 p-4 py-1"
        onClick={handleToggle}
      >
        <div>{title}</div>
        <motion.div
          variants={{ open: { rotateX: "180deg" }, close: { rotateX: "0deg" } }}
          animate={isExpanded ? "open" : "close"}
        >
          <KeyboardArrowDownIcon />
        </motion.div>
      </div>

      <motion.div
        className="mt-4 overflow-hidden"
        variants={{
          open: { height: "max-content" },
          close: { height: 0 },
        }}
        animate={isExpanded ? "open" : "close"}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Collapsible;

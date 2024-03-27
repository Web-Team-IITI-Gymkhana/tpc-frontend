"use client";
import { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ToggleContext } from "@/contextProviders/ToggleProvider";

const Path = ({
    isopen,
    pathvariants,
    transition,
}: {
    isopen: Boolean;
    pathvariants: {
        closed: { opacity: number; d: string };
        open: { opacity: number; d: string };
    };
    transition?: any;
}) => (
    <motion.path
        className="text-white"
        initial={false}
        animate={isopen ? "open" : "closed"}
        variants={pathvariants}
        strokeWidth="3"
        stroke="hsl(0, 0%, 100%)"
        strokeLinecap="round"
        transition={transition}
    />
);

const MenuButton = () => {
    const context = useContext(ToggleContext);

    return (
        <div className="flex items-center">
            <button
                className="inline-flex items-center justify-center p-2 rounded-md bg-gray-900 hover:bg-gray-700 transition-all duration-200"
                onClick={context.sidebarToggle}
            >
                {/* Icon when menu is closed. */}

                <svg fill="#fff" width="22" height="22" viewBox="0 0 22 20" className="text-white">
                    <Path
                        pathvariants={{
                            closed: { opacity: 1, d: "M 2 2.5 L 20 2.5" },
                            open: { opacity: 1, d: "M 3 16.5 L 17 2.5" },
                        }}
                        isopen={context.isOpen}
                    />
                    <Path
                        pathvariants={{
                            closed: { opacity: 1, d: "M 2 9.423 L 20 9.423" },
                            open: { opacity: 0, d: "M 2 9.423 L 20 9.423" },
                        }}
                        isopen={context.isOpen}
                        transition={{ duration: 0.1 }}
                    />
                    <Path
                        pathvariants={{
                            closed: { opacity: 1, d: "M 2 16.346 L 20 16.346" },
                            open: { opacity: 1, d: "M 3 2.5 L 17 16.346" },
                        }}
                        isopen={context.isOpen}
                    />
                </svg>
            </button>
        </div>
    );
};

export default MenuButton;

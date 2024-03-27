"use client";
import { useState, createContext, ReactNode, useEffect } from "react";

interface IToggleContext {
    isOpen: boolean;
    sidebarToggle: () => void;
}

const ToggleContext = createContext<IToggleContext>({
    isOpen: false,
    sidebarToggle: () => {},
});

const ToggleProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const sidebarToggle = () => {
        setIsOpen(!isOpen);
    };

    return <ToggleContext.Provider value={{ isOpen, sidebarToggle }}>{children}</ToggleContext.Provider>;
};

export { ToggleProvider, ToggleContext };

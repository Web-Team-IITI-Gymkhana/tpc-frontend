"use client";
import { useState, createContext, ReactNode, useEffect } from "react";

interface IToggleContext {
  isOpen: boolean;
  sidebarToggle: () => void;
  isDisabled: boolean;
  sidebarDisable: () => void;
}

const ToggleContext = createContext<IToggleContext>({
  isOpen: false,
  sidebarToggle: () => {},
  isDisabled: false,
  sidebarDisable: () => {},
});

const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const sidebarToggle = () => {
    if (isDisabled) return;
    setIsOpen(!isOpen);
  };
  const sidebarDisable = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <ToggleContext.Provider
      value={{
        isOpen,
        sidebarToggle,
        isDisabled,
        sidebarDisable,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export { ToggleProvider, ToggleContext };

"use client";
import { useState, createContext, ReactNode } from "react";

export interface Job {
  companyId: string;
  description: string;
  company: string;
  location: string;
  salary: number;
  tags: string[];
}

export interface Company {
  id: string;
  name: string;
  metadata: object;
  createdAt: string;
  updatedAt: string;
}

interface IJobFormContext {
  job: Job;
  setJob: Function;
  checkedStep: number;
  setCheckedStep: Function;
  error: string;
  setError: Function;
  formStage: number;
  setFormStage: Function;
  numStages: number;
}

const initialJob: Job = {
  companyId: "",
  description: "",
  company: "",
  location: "",
  salary: 0,
  tags: [],
};

const JobFormContext = createContext<IJobFormContext>({
  job: initialJob,
  setJob: () => {},
  checkedStep: 0,
  setCheckedStep: () => {},
  error: "",
  setError: () => {},
  formStage: 1,
  setFormStage: () => {},
  numStages: 4,
});

const JobFormProvider = ({ children }: { children: ReactNode }) => {
  const [job, setJob] = useState<Job>(initialJob);
  const [checkedStep, setCheckedStep] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [formStage, setFormStage] = useState<number>(1);
  const numStages = 4;

  return (
    <JobFormContext.Provider
      value={{
        job,
        setJob,
        checkedStep,
        setCheckedStep,
        error,
        setError,
        formStage,
        setFormStage,
        numStages,
      }}
    >
      {children}
    </JobFormContext.Provider>
  );
};

export { JobFormContext, JobFormProvider };

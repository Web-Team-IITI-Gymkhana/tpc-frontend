import Loader from "@/components/loader";
import { FunctionComponent } from "react";

interface CompaniesLoadingProps {}

const CompaniesLoading: FunctionComponent<CompaniesLoadingProps> = () => {
  return <><Loader/></>;
};

export default CompaniesLoading;

import Loader from "@/components/loader";
import { FunctionComponent } from "react";

interface SeasonsLoadingProps {}

const SeasonsLoading: FunctionComponent<SeasonsLoadingProps> = () => {
  return (
    <>
      <Loader />
    </>
  );
};

export default SeasonsLoading;

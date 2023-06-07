import { FunctionComponent } from "react";
import "../app/globals.css";

interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
  return <div className="lds-dual-ring"></div>;
};

export default Loader;

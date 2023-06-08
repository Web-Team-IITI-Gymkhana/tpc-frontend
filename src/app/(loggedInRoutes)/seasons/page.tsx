import AddSeason from "@/components/Seasons/AddSeason";
import { FunctionComponent } from "react";

interface SeasonsProps {}

const Seasons: FunctionComponent<SeasonsProps> = () => {
  return (
    <div className="mx-6 my-4">
      <div className="w-full mx-2 flex justify-end">
        <AddSeason />
      </div>
    </div>
  );
};

export default Seasons;

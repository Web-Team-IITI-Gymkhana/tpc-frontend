import StartButton from "@/components/startButton";
import Link from "next/link";
import { FunctionComponent } from "react";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div>
        <div className="w-fit h-fit text-[40px] text-center">
          Training And Placement Cell
        </div>
        <br />
        <div className="mx-auto w-fit">
          <StartButton />
        </div>
      </div>
    </div>
  );
};

export default Home;

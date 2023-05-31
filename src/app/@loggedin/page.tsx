import { FunctionComponent, ReactNode } from "react";
import LinkItem from "@/components/linkitem";

interface LoggedInLayoutProps {
  children: ReactNode;
  navlinks: Array<NavLinkProps>;
}

interface NavLinkProps {
  label: String;
  ref: string;
}

const LoggedInLayout: FunctionComponent<LoggedInLayoutProps> = ({
  children,
  navlinks,
}) => {
  return (
    <>
      <div className="h-[8vh] flex justify-between bg-blue-500 px-2 items-center">
        <div className="text-[30px] font-bold font-sans ml-8">
          Training And Placement Cell
        </div>
        <div className="text-[18px]">Logout</div>
      </div>
      <div className="flex h-[92vh]">
        <div className="flex-col w-[200px] ml-0 pt-5 border-r-2 border-black bg-white">
          {navlinks &&
            navlinks.map((item, index) => {
              return (
                <LinkItem
                  key={index + 1}
                  link={item.ref}
                  label={item.label}
                ></LinkItem>
              );
            })}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </>
  );
};

export default LoggedInLayout;

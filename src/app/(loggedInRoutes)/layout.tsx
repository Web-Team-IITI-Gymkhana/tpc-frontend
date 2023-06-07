import { FunctionComponent, ReactNode } from "react";
import LogoutButton from "@/components/logoutButton";
import LinkItem from "@/components/linkitem";

interface LoggedInLayoutProps {
  children: ReactNode;
}

interface NavLinks {
  label: string;
  ref: string;
  icon: string;
}

const navlinks: Array<NavLinks> = [
  { label: "Home", ref: "/", icon: "Home" },
  {
    label: "Seasons",
    ref: "/seasons",
    icon: "Assignment",
  },
  {
    label: "Companies",
    ref: "/companies",
    icon: "Business",
  },
  {
    label: "Members",
    ref: "/members",
    icon: "ManageAccounts",
  },
];

const LoggedInLayout: FunctionComponent<LoggedInLayoutProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <div className="h-[8vh] min-h-[60px] flex justify-end sm:justify-between bg-blue-500 px-2 items-center">
        <div className="text-[25px] font-bold font-sans ml-8 hidden sm:block">
          Training And Placement Cell
        </div>
        <div>
          <LogoutButton variant="contained" label="Logout" />
        </div>
      </div>
      <div className="flex h-[92vh] min-h-[440px]">
        <div className="flex-col w-fit ml-0 pt-5 border-r-2 bg-white">
          {navlinks &&
            navlinks.map((item: NavLinks, index) => {
              return (
                <LinkItem
                  key={index + 1}
                  link={item.ref}
                  label={item.label}
                  icon={item.icon}
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

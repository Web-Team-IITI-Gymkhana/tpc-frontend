"use client";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";
import { Button, Fade, Tooltip, Zoom, duration } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  Home,
  Business,
  Assignment,
  ManageAccounts,
} from "@mui/icons-material";

const LinkItem = ({
  link,
  label,
  icon,
}: {
  link: string;
  label: String;
  icon: String;
}) => {
  return (
    <div className="block px-2 my-2">
      <Link href={{ pathname: link }} prefetch={true}>
        <Tooltip
          title={label}
          TransitionComponent={Zoom}
          enterDelay={200}
          leaveDelay={200}
          placement="right"
          disableInteractive
        >
          {/* <Button
            size="medium"
            variant="contained"
            className="w-full items-start rounded-md bg-blue-400"
          > */}
          <IconButton className="h-fit aspect-square">
            {icon === "Home" && <Home color="secondary" />}
            {icon === "Business" && <Business color="secondary" />}
            {icon === "Assignment" && <Assignment color="secondary" />}
            {icon === "ManageAccounts" && <ManageAccounts color="secondary" />}
          </IconButton>
          {/* </Button> */}
        </Tooltip>
      </Link>
    </div>
  );
};

export default LinkItem;

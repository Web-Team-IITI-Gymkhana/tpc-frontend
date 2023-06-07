"use client";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { FunctionComponent } from "react";
import { Logout } from "@mui/icons-material";

interface MyButtonProps {}

const LogoutButton = ({ variant, label }: { variant: any; label: string }) => {
  return (
    <Tooltip
      placement="bottom"
      title="Logout"
      TransitionComponent={Zoom}
      disableInteractive
    >
      <IconButton>
        {label === "Logout" && <Logout color="secondary" />}
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;

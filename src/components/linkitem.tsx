"use client";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";
import { Button, Fade, ListItemButton, Tooltip, Zoom, duration } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  Home,
  Business,
  Assignment,
  ManageAccounts,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

const LinkItem = ({
  link,
  label,
  icon,
}: {
  link: string;
  label: String;
  icon: String;
}) => {
  const pathname = usePathname();
  const isSelected = () => {
    return pathname === link;
  }

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
          <ListItemButton 
            className="h-fit aspect-square"
            sx={{ 
              borderRadius: 8, 
              backgroundColor: (isSelected() ? '#b3e5fc': 'none' ),
              "&:hover": { 
                backgroundColor: (isSelected() ? '#9addfb': '#d1e5f4' )
              },
            }}
          >
            {icon === "Home" && <Home color="secondary" />}
            {icon === "Business" && <Business color="secondary" />}
            {icon === "Assignment" && <Assignment color="secondary" />}
            {icon === "ManageAccounts" && <ManageAccounts color="secondary" />}
          </ListItemButton>
        </Tooltip>
      </Link>
    </div>
  );
};

export default LinkItem;

"use client";

import { Button, Card, IconButton, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import { ImportContactsOutlined, MoreVert } from "@mui/icons-material";
import { useState } from "react";

const CompanyCard = (
    {name, icon, date}: {name: string, icon: string, date: string}
) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <Card className="flex p-4 mx-2 my-4 justify-between" elevation={4}>
        <div className="flex space-x-4">
            <Image 
                src={icon} 
                width={40} 
                height={40} 
                alt="Company Icon" 
            />
            <h1 className="self-center font-semibold text-lg">{name}</h1>
        </div>
        <div className="flex justify-end items-center space-x-4">
            <h1 className="text-sm text-gray-500">{`Last Modified: ${date}`}</h1>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                aria-label="menu"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Add Contacts</MenuItem>
            </Menu>
        </div>
    </Card>
  )
}

export default CompanyCard
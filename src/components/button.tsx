"use client";

import { FunctionComponent } from "react";
import { Button } from "@mui/material";

interface MyButtonProps {
  label: String;
}

const MyButton: FunctionComponent<MyButtonProps> = ({ label }) => {
  return (
    <div>
      <Button fullWidth size="large" variant="outlined" color="secondary">
        {label}
      </Button>
    </div>
  );
};

export default MyButton;

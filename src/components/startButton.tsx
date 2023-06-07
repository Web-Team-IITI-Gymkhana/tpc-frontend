"use client";
import { Button } from "@mui/material";
import { FunctionComponent } from "react";
import Link from "next/link";

interface StartButtonProps {}

const StartButton: FunctionComponent<StartButtonProps> = () => {
  return (
    <Link href="/seasons">
      <Button variant="outlined" color="secondary">
        Get Started
      </Button>
    </Link>
  );
};

export default StartButton;

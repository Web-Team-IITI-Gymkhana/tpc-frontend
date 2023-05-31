"use client";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Button } from "@mui/material";

interface LinkItemProps {
  link: string;
  label: String;
}

const LinkItem: FunctionComponent<LinkItemProps> = ({
  link,
  label,
}: {
  link: string;
  label: String;
}) => {
  return (
    <div className="block w-full px-2 my-2">
      <Button
        size="medium"
        color="secondary"
        variant="outlined"
        className="w-full items-start rounded-md hover:bg-blue-200"
      >
        <Link href={{ pathname: link }}>{label}</Link>
      </Button>
    </div>
  );
};

export default LinkItem;

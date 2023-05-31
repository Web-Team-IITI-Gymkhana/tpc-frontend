"use client";
import { FunctionComponent } from "react";
import { TextField } from "@mui/material";

interface TextInputFieldProps {
  label: String;
  type: string;
}

const TextInputField: FunctionComponent<TextInputFieldProps> = ({
  label,
  type,
}) => {
  return (
    <div className="px-6 py-2 w-full">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        fullWidth
        type={type}
      />
    </div>
  );
};

export default TextInputField;

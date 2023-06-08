import { FunctionComponent } from "react";
import { Button } from "@mui/material";

interface MyButtonProps {
  label: string;
  onClick: () => void;
  variant: any;
  color: any;
}

const MyButton: FunctionComponent<MyButtonProps> = ({
  label,
  onClick,
  variant,
  color,
}) => {
  return (
    <Button onClick={onClick} variant={variant} color={color} className="bg-sky-500">
      {label}
    </Button>
  );
};

export default MyButton;

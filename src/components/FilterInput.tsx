// FilterInput.tsx

import React from "react";
import { Input } from "./ui/input";
interface FilterInputProps {
  columnId: string;
  value: string | undefined;
  onFilterChange: (columnId: string, value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({
  columnId,
  value,
  onFilterChange,
}) => {
  return (
    <Input
      placeholder={`Filter ${columnId}...`}
      value={value || ""}
      onChange={(event) => onFilterChange(columnId, event.target.value)}
      className="w-full"
    />
  );
};

export default FilterInput;

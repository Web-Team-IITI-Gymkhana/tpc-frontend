"use client";
import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface OptionInterface {
  value: string;
  label: string;
  selected: boolean;
}

interface Props {
  data: OptionInterface[];
  value: string;
  setValue: Function;
}

const MultiSelectDropDown = ({ data, value, setValue }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between !text-black"
        >
          {value.length > 0
            ? data?.find((option: OptionInterface) => option.value === value)
                ?.label
            : "Select One"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {data?.length > 8 && (
            <>
              <CommandInput
                placeholder="Search..."
                className="h-9 !text-black"
              />
              <CommandEmpty>Found Nothing.</CommandEmpty>
            </>
          )}
          <CommandGroup>
            {data?.map((option: OptionInterface) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue: string) => handleSelect(currentValue)}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectDropDown;

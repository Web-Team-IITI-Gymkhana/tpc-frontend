"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import { useRouter } from "next/navigation";

interface Students {
  value: string;
  label: string;
  path: string;
}

interface Props {
  userRole: string;
}

export function StudentDropDown({ userRole }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

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
          className="w-[200px] justify-between !text-black"
        >
          {value
            ? students.find((student) => student.value === value)?.label
            : "Select Event"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Season..."
            className="h-9 !text-black"
          />
          <CommandEmpty>Found Nothing...</CommandEmpty>
          <CommandGroup>
            {students.map((student: Students) => (
              <CommandItem
                key={student.value}
                value={student.value}
                onSelect={(currentValue: string) => handleSelect(currentValue)}
              >
                <Link
                  className="flex w-full"
                  href={`/${userRole}/students${student.path}`}
                >
                  {student.label}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const students: Students[] = [
  {
    value: "all students",
    label: "All Students",
    path: "/",
  },
  {
    value: "add students",
    label: "Add Students",
    path: "/add",
  },
];

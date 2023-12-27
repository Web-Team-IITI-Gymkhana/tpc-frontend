import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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

interface Framework {
  value: string;
  label: string;
}

export function SessionDropDown() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter()

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    const handleSelect = (currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        localStorage.setItem('season', currentValue);
      
        
        setTimeout(() => {
          router.push('/admin/id/company');
        }, 200); 
      };
      
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
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Season"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Season..." className="h-9 !text-black" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework: Framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue: string) => handleSelect(currentValue)}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const frameworks: Framework[] = [
  {
    value: "season 1",
    label: "Season 1",
  },
  {
    value: "season 2",
    label: "Season 2",
  },
  {
    value: "season 3",
    label: "Season 3",
  },
  {
    value: "season 4",
    label: "Season 4",
  },
  {
    value: "season 5",
    label: "Season 5",
  },
];

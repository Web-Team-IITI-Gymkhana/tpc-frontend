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

interface SeasonInDropDown {
  value: string;
  label: string;
  id: string;
}

interface Season {
  id: string;
  year: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  AllSeasons: {
    seasons: Season[];
  };
}

export function SessionDropDown({ AllSeasons }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const handleSelect = (currentValue: string, id: string | null) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    if (id) {
      localStorage.setItem("season", id);
    } else {
      localStorage.removeItem("season");
    }
  };
  const SeasonsInDropDown: SeasonInDropDown[] = AllSeasons?.seasons?.map(
    (season) => ({
      value: `${season?.type?.toLowerCase()}-${season?.year?.toLowerCase()}`,
      label: `${season?.type?.toLowerCase()}-${season?.year?.toLowerCase()}`,
      id: season.id,
    }),
  );
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
            ? SeasonsInDropDown.find(
                (season) => season.value === value,
              )?.label.toUpperCase()
            : "Select Season"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Season..."
            className="h-9 !text-black"
          />
          <CommandEmpty>No Seasons found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              key={"None"}
              value={"None"}
              onSelect={(currentValue: string) => handleSelect("", null)}
            >
              {"None"}
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === "" ? "opacity-100" : "opacity-0",
                )}
              />
            </CommandItem>
            {SeasonsInDropDown?.map((season: SeasonInDropDown) => (
              <CommandItem
                key={season.value}
                value={season.value}
                onSelect={(currentValue: string) =>
                  handleSelect(currentValue, season?.id)
                }
              >
                {season.label.toUpperCase()}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === season.value ? "opacity-100" : "opacity-0",
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

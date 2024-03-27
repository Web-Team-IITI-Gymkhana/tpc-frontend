"use client";
import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface OptionInterface {
    value: string;
    label: string;
}

interface Props {
    data: OptionInterface[];
    value: string;
    setValue: Function;
}

const FormDropDown = ({ data, value, setValue }: Props) => {
    const [open, setOpen] = React.useState(false);
    //   const [value, setValue] = React.useState("");

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
                    {value ? data.find((option: OptionInterface) => option.value === value)?.label : "Select Event"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search Season..." className="h-9 !text-black" />
                    <CommandEmpty>Found Nothing.</CommandEmpty>
                    <CommandGroup>
                        {data.map((option: OptionInterface) => (
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

export default FormDropDown;

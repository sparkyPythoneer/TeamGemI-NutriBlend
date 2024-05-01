
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { cn } from "@/utils/classname";

export default function Combobox({ options, placeholder, isLoadingOptions, containerClass, labelClass, label, withIcon, name, value, onChange }) {
    const [open, setOpen] = useState(false);

    
    const optionsArray = options ?? [];

    const handleSelect = (currentValue) => {
        const selectedOption = optionsArray.find(option => {
            const optionValue = option?.value?.toLowerCase();
            return optionValue === String(currentValue)?.toLowerCase();
        }) || {};
        const selectedValue = selectedOption?.value || '';
        onChange(String(selectedValue));
        setOpen(false);
    }

    const selectedOption = optionsArray.find(option => option?.value === value) ?? {};
    const selectedName = selectedOption?.name || placeholder || "Select...";

    return (
        <div className={cn("inputdiv", withIcon && "withicon", containerClass)}>
            {label && <label className={cn(labelClass)} htmlFor={name}>{label}</label>}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        onClick={() => setOpen(!open)}
                    >
                        {selectedName}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {isLoadingOptions && (
                                <CommandItem disabled>
                                    <Check className="mr-2 h-4 w-4 opacity-0" />
                                    Loading...
                                </CommandItem>
                            )}
                            {!isLoadingOptions && options?.map((option) => (
                                <CommandItem
                                    key={option?.value}
                                    value={option?.value}
                                    onSelect={(currentValue) => handleSelect(currentValue)}
                                >
                                    <Check
                                        className={value === option?.value ? "mr-2 h-4 w-4 opacity-100" : "opacity-0"}
                                    />
                                    {option?.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}


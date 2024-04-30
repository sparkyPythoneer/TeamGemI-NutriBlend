import * as React from "react"
import { FieldErrors, FieldValues } from "react-hook-form"
import { areIntervalsOverlappingWithOptions } from "date-fns/fp"

import { cn } from "@/utils/classname"
import { convertKebabAndSnakeToTitleCase } from "@/utils/strings"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, Popover, PopoverContent, PopoverTrigger, SmallSpinner } from "../ui"
import { CaretDown, StrokeCheck } from "../icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"



const ComboboxDemo = ({
    value,
    onChange,
    options,
    placeholder,
    errors,
    label,
    name,
    className,
    containerClass,
    labelClass,
    itemClass,
    errorClass,
    fullWidth,
    required,
    withIcon,
    isLoadingOptions,
    valueKey,
    transparent = false,
    triggerColor
}) => {
    const [open, setOpen] = React.useState(false)

    // const handleSelect = (currentValue: string | boolean) => {
    //     onChange(String(currentValue))
    //     setOpen(false)
    // }
    const handleSelect = (currentValue) => {
        const selectedOption = options?.find(option => {
            const optionValue = option[valueKey]?.toLowerCase() || option.value?.toLowerCase();
            return optionValue === String(currentValue).toLowerCase();
        }) || {};
        const selectedValue = selectedOption.value || selectedOption[valueKey] || '';
        onChange(String(selectedValue));
        setOpen(false);
    }
    


    const triggerRef = React.useRef<HTMLDivElement | null>(null)
    const width = triggerRef && triggerRef.current?.clientWidth ? `${triggerRef.current?.clientWidth}px` : 'auto'

    const getOptionLabel = (option) => {
        if (value && options) {
            return option[valueKey] || option.name || option.value || option.id
        } else {
            return `Select ${convertKebabAndSnakeToTitleCase(name).toLowerCase()}`

        }
    }

    return (
        <div className={cn("inputdiv", withIcon && "withicon", containerClass)}>
            {label && <label className={cn(labelClass)} htmlFor={name}>{label}</label>}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div
                        ref={triggerRef}
                        className={cn(
                            "flex h-max w-full max-w-[520px] items-center justify-between gap-2 rounded-lg px-3.5 py-2 sm:px-4 sm:py-3 !text-[13px] ",
                            "ring-offset-white transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                            "data-[placeholder]:text-[#98A2B3] text-body-text border-2 border-transparent focus:border-primary bg-white !overflow-hidden whitespace-nowrap cursor-pointer",
                            className
                        )}
                        role="combobox"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        <span className={cn(
                            '!overflow-hidden',
                            (!value || !options) && (transparent ? "!text-white/60" : "!text-[#98A2B3]")
                        )}>
                            {(value && options && options?.length)
                                ? getOptionLabel(options.find(option => option[valueKey]?.toLowerCase() === value.toString()?.toLowerCase()) || {})
                                : `Select ${convertKebabAndSnakeToTitleCase(name).toLowerCase()}`
                            }
                        </span>
                        <FontAwesomeIcon icon={faCaretDown} className={cn("ml-2 h-5 w-5 shrink-0 opacity-70 transition-transform duration-300", open && "rotate-180")} fill={triggerColor || "#755AE2"} />
                        
                    </div>
                </PopoverTrigger>

                <PopoverContent className={cn("p-0", triggerRef?.current && `!w-[${width}]`)} style={{ width }}>
                    <Command>
                        <CommandInput placeholder={`Search ${convertKebabAndSnakeToTitleCase(name).toLowerCase()}`} />
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {isLoadingOptions &&
                                <CommandItem disabled value={"loading"}>
                                    <SmallSpinner color='#000000' />
                                </CommandItem>
                            }
                            {!isLoadingOptions && options && options?.length > 0
                                ? options?.map((option, index) => (
                                    <CommandItem
                                        key={index}
                                        value={option[valueKey] || option.name || option.value || option.id}
                                        onSelect={(currentValue) => handleSelect(currentValue)}
                                        className={cn("grid grid-cols-[max-content_1fr] text-sm", itemClass)}
                                    >
                                        <StrokeCheck
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                valueKey && option[valueKey] === value
                                                    ? "opacity-100"
                                                    : option.value && value === option.value
                                                        ? "opacity-100"
                                                        : option.id && value === option.id
                                                            ? "opacity-100"
                                                            : option.id && value === option.id?.toLowerCase()
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                            )}
                                        />
                                        {option.label || option.name}
                                    </CommandItem>
                                ))
                                : <CommandItem value={""} disabled className={cn("text-[0.8125rem]", itemClass)}>
                                    There are no options to select from
                                </CommandItem>
                            }
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {errors && errors[name] && <span className={cn('formerror', errorClass)}>{String(errors[name]?.message)}</span>}
        </div>
    )
}

export default ComboboxDemo

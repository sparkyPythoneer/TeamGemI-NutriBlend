import * as React from 'react';

import { cn } from '@/utils/classname';

import { Select as Selection, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui';
import { SmallSpinner } from '.';



const Select = ({
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
    valueClass,
    fullWidth,
    required,
    valueKey = "value",
    withIcon,
    isLoadingOptions,
    triggerColor
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenChange = (open) => {
        setIsOpen(open);
    };





    return (
        <div className={cn("inputdiv", withIcon && "withicon", containerClass)}>
            {
                label && <label className={cn(labelClass, "")} htmlFor={name}>{label}</label>
            }
            <div className={cn("w-full", fullWidth ? "max-w-full" : "max-w-[550px]")}>
                <Selection value={value?.toString()} required={required} open={isOpen} onValueChange={onChange} onOpenChange={handleOpenChange}>
                    <SelectTrigger
                        className={cn("w-full bg-[#F5F7F9] !overflow-hidden whitespace-nowrap", errors && errors[name] && 'error', className)}
                        id={name}
                        triggerColor={triggerColor}
                        data-state={isOpen ? 'open' : 'closed'}
                    >
                        <SelectValue className={cn('!overflow-hidden !text-ellipsis', valueClass)} placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            isLoadingOptions &&
                            <SelectItem disabled value={"loading"}>
                                <SmallSpinner color='#000000' />
                            </SelectItem>
                        }
                        {
                            options && options?.length > 0 ?
                                options.map((option) => (
                                    <SelectItem
                                        key={`${option.name}.${option.value}.${option.id}.${option.label} `}
                                        value={option[valueKey] || option.value || option.name}
                                        className={cn(itemClass, "!overflow-hidden text-ellipsis")}
                                    >
                                        {option.name}
                                    </SelectItem>
                                ))
                                :
                                <SelectItem value={""} disabled className={cn(itemClass, "px-4")}>
                                    There are no options to select from.
                                </SelectItem>
                        }
                    </SelectContent>
                </Selection>
                {errors && errors[name] && <span className={cn('formerror', errorClass)}>{String(errors[name]?.message)}</span>}
            </div>
        </div>
    );
};

export default Select;
import { cn } from "@/utils/classname";



export function SmallSpinner({
    className,
    pathClassName,
    color = '#22c55e',
}) {
    return (
        <span
            className={cn(
                'flex h-4 w-4 animate-spin items-center justify-center',
                className
            )}
        >
            <svg
                fill="none"
                height={14}
                viewBox="0 0 14 14"
                width={14}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className={pathClassName}
                    d="M13 7a6 6 0 1 1-4.146-5.706"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                />
            </svg>

            <span className="sr-only">Loading</span>
        </span>
    );
}
export default function Spinner({ className, pathClassName }) {
    return (
        <span
            className={cn('flex animate-spin items-center justify-center', className)}
        >
            <svg
                fill="none"
                height={32}
                viewBox="0 0 32 32"
                width={32}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className={pathClassName}
                    d="M28 16a12 12 0 1 1-8.292-11.413"
                    stroke="#032282"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                />
            </svg>

            <span className="sr-only">Loading</span>
        </span>
    );
}

"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounce } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

export const SearchInput = () => {
    // Initialize the router hook to navigate between pages
    const router = useRouter();

    // State to hold the search input value
    const [value, setValue] = useState("");

    // Debounce the input value to delay processing until typing stops
    const debouncedValue = useDebounce(value,  500);

    // Handle changes to the search input field
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // Effect to update the URL with the search query when the debounced value changes
    useEffect(() => {
        // Create a URL with the search query parameter
        const url = qs.stringifyUrl({
            url: "/",
            query: {
                search: debouncedValue,
            },
        }, { skipEmptyString: true, skipNull: true });

        // Navigate to the new URL without causing a full page refresh
        router.push(url);
    }, [debouncedValue, router]);

    // Render the search input component
    return (
        <div className="w-full relative">
            {/* Icon for the search input */}
            <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
            {/* Actual search input field */}
            <Input
                className="w-full max-w-[516px] pl-9"
                placeholder="Search boards"
                onChange={handleChange}
                value={value}
            />
        </div>
    );
};

import React, { useState } from "react";
import * as Papa from "papaparse";
import { Button } from "@/components/ui/button";

const ExportData = ({ data }: { data: any[] }) => {
    const [isLoading, setIsLoading] = useState(false);

    const flattenObject = (obj: any, parentKey = ""): any => {
        return Object.keys(obj).reduce((acc: any, key: string) => {
            let prefixedKey = parentKey ? `${parentKey}.${key}` : key;

            // Replace dots with spaces and capitalize the first letter of each word
            prefixedKey = prefixedKey.replace(/\./g, " ").replace(/\b\w/g, (match) => match.toUpperCase());

            if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                Object.assign(acc, flattenObject(obj[key], prefixedKey));
            } else {
                acc[prefixedKey] = obj[key];
            }
            return acc;
        }, {});
    };

    const handleExportData = async () => {
        setIsLoading(true);
        const flattenedData = data.map((item) => flattenObject(item));
        const csvData = Papa.unparse(flattenedData);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Button variant="default" className="w-full" onClick={handleExportData} disabled={isLoading}>
                {isLoading ? "Exporting..." : "Export Data"}
            </Button>
        </div>
    );
};

export default ExportData;

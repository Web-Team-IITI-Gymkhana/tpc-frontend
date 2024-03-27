// CSVParser.tsx
"use client";
import React, { useState } from "react";
import csvParser from "csv-parser";

function CSVParser() {
    const [jsonData, setJsonData] = useState<any>(null);

    const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const data = await parseCSV(file);
            setJsonData(data);
        }
    };

    const parseCSV = async (file: File) => {
        const results: any[] = [];
        const reader = new FileReader();
        reader.readAsText(file);
        await new Promise((resolve) => (reader.onload = resolve));
        const data = reader.result as string;
        const parser = csvParser();

        const records = data.split("\n");
        const headers = records[0].split(",");

        for (let i = 1; i < records.length; i++) {
            const record = records[i].split(",");
            const obj: any = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = record[j];
            }
            results.push(obj);
        }

        return results;
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleCSVUpload} />
            {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
        </div>
    );
}

export default CSVParser;

import React, { useState, useRef } from "react";
import * as Papa from "papaparse";
import axios from "axios";
import { Button } from "@/components/ui/button";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const ImportData = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleImportData = async () => {
    if (!file) return;
    setIsLoading(true);
    setError("");

    try {
      const results = await new Promise<Papa.ParseResult<any>>(
        (resolve, reject) => {
          Papa.parse(file, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: resolve,
            error: reject,
          });
        },
      );

      const { data } = results;
      const formattedData = data.map((row: any) => ({
        rollNo: row["Roll No"],
        programId: row["Program Id"],
        category: row["Category"],
        cpi: parseFloat(row["CPI"]),
        gender: row["Gender"],
        user: {
          name: row["Name"],
          email: row["Email"],
          contact: row["Contact"],
        },
      }));

      console.log(formattedData);
      await axios.post(`${baseUrl}/api/v1/students/`, formattedData);
      console.log("Students added successfully!");
    } catch (err) {
      setError(
        "Error adding students. Please check the CSV file and try again.",
      );
      console.error("Error adding students:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-2 w-full">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Button className="w-full" onClick={openFileDialog}>
          Choose File
        </Button>
      </div>
      <Button
        className="w-full "
        onClick={handleImportData}
        disabled={isLoading || !file}
      >
        {isLoading ? "Importing..." : "Import Data"}
      </Button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default ImportData;

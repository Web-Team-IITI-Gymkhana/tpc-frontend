"use client";

import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

interface CSVImportModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: T[]) => void;
  templateHeaders: string[];
  templateFileName: string;
  parseRow: (row: any) => T | null;
  entityName?: string;
}

export function CSVImportModal<T>({
  open,
  onClose,
  onSubmit,
  templateHeaders,
  templateFileName,
  parseRow,
  entityName = "data",
}: CSVImportModalProps<T>) {
  const [parsedData, setParsedData] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = () => {
    const csvContent = templateHeaders.join(",") + "\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = templateFileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const parsed = rows.map(parseRow).filter(Boolean) as T[];
        if (parsed.length === 0) {
          setError("No valid rows found.");
        } else {
          setParsedData(parsed);
        }
      },
      error: (err) => setError(err.message),
    });
  };

  const handleSubmit = () => {
    if (parsedData) onSubmit(parsedData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[80vw] overflow-y-auto">
        <DialogTitle className="text-black">
          Import {entityName} from CSV
        </DialogTitle>
        <div className="flex flex-col gap-4 text-black">
          <Button
            onClick={handleDownloadTemplate}
            variant="outline"
            className="w-fit"
          >
            Download Template
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="text-black"
          />
          {error && <div className="text-red-500">{error}</div>}
          {parsedData && (
            <div className="text-black">
              <div className="font-semibold mb-2">Preview:</div>
              <div
                className="overflow-x-auto max-h-64 border rounded"
                style={{ maxHeight: "40vh", overflowY: "auto" }}
              >
                <table className="min-w-full text-xs text-black">
                  <thead>
                    <tr>
                      {templateHeaders.map((h) => (
                        <th key={h} className="px-2 py-1 border-b text-black">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.map((row, i) => (
                      <tr key={i} className="text-black">
                        {templateHeaders.map((h) => (
                          <td key={h} className="px-2 py-1 border-b text-black">
                            {(row as any)[h]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button className="mt-4" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

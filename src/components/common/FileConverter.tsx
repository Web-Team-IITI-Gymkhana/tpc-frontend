// components/FileConverter.tsx
"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { utils, WorkBook, write } from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";

interface FileConverterProps {
    jsonData: string;
}

const FileConverter: React.FC<FileConverterProps> = () => {
    const [csvData, setCSVData] = useState<string>("");
    const [xlsxData, setXLSXData] = useState<WorkBook | null>(null);
    const jsonData = `[
        {
            "A": "11",
            "B": "11",
            "C": "11",
            "D ": "11",
            "E": "11",
            "F": "11",
            "G": "11",
            "H": "11",
            "I\r": "11\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
          {
            "A": "11",
            "B": "22",
            "C": "33",
            "D ": "44",
            "E": "55",
            "F": "66",
            "G": "77",
            "H": "88",
            "I\r": "99\r"
          },
    ]`;

    //to csv
    const convertToCSV = () => {
        const results = Papa.parse(jsonData, {
            header: true,
            skipEmptyLines: true,
        });
        const csv = Papa.unparse(results.data);
        setCSVData(csv);
    };
    //download csv
    const downloadCSV = () => {
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-csv.csv";
        a.click();
    };
    //to excel
    const convertToXLSX = () => {
        const results = Papa.parse(jsonData, {
            header: true,
            skipEmptyLines: true,
        });
        const worksheet = utils.json_to_sheet(results.data);
        const newWorkbook: WorkBook = {
            Sheets: { "Sheet 1": worksheet },
            SheetNames: ["Sheet 1"],
        };
        setXLSXData(newWorkbook);
    };
    //download excel
    const downloadXLSX = () => {
        if (xlsxData) {
            const arrayBuffer = write(xlsxData, { bookType: "xlsx", type: "array" });
            const blob = new Blob([arrayBuffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "generated-xlsx.xlsx";
            a.click();
        }
    };
    //to pdf
    const convertToPDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 300]);
        const { width, height } = page.getSize();

        // page.drawText(jsonData, {
        //     x: 50,
        //     y: height - 50,
        //     size: 12,
        //     color: rgb(0, 0, 0),
        // });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-pdf.pdf";
        a.click();
    };

    return (
        <div>
            <button onClick={convertToCSV}>Convert to CSV</button>
            <button onClick={downloadCSV}>Download CSV</button>
            <button onClick={convertToXLSX}>Convert to XLSX</button>
            <button onClick={downloadXLSX}>Download XLSX</button>
            <button onClick={convertToPDF}>Convert to PDF</button>
        </div>
    );
};

export default FileConverter;

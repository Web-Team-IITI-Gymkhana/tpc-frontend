import React, { useState } from 'react';
import * as Papa from 'papaparse';
import { Button } from '@/components/ui/button'

const ExportData = ({ data }: { data: any[] }) => {
    const [isLoading, setIsLoading] = useState(false);

    const flattenObject = (obj: any, parentKey = ''): any => {
        return Object.keys(obj).reduce((acc: any, key: string) => {
            let prefixedKey = parentKey ? `${parentKey}.${key}` : key;

            // Map the keys to the desired column names
            switch (prefixedKey) {
                case 'user.id':
                    prefixedKey = 'User Id';
                    break;
                case 'rollNo':
                    prefixedKey = 'Roll No';
                    break;
                case 'category':
                    prefixedKey = 'Category';
                    break;
                case 'gender':
                    prefixedKey = 'Gender';
                    break;
                case 'cpi':
                    prefixedKey = 'CPI';
                    break;
                case 'programId':
                    prefixedKey = 'Program Id';
                    break;
                case 'user.email':
                    prefixedKey = 'Email';
                    break;
                case 'user.name':
                    prefixedKey = 'Name';
                    break;
                case 'user.contact':
                    prefixedKey = 'Contact';
                    break;
                case 'program.course':
                    prefixedKey = 'Course';
                    break;
                case 'program.branch':
                    prefixedKey = 'Branch';
                    break;
                case 'program.year':
                    prefixedKey = 'Year';
                    break;

            }

            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
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
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <Button variant="default" className='w-full' onClick={handleExportData} disabled={isLoading}>
                {isLoading ? 'Exporting...' : 'Export Data'}
            </Button>
        </div>
    );
};

export default ExportData;
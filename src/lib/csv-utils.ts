import * as XLSX from 'xlsx';

export const convertToCSV = (data: any) => {
  if (!data || Object.keys(data).length === 0) return '';

  // Handle nested objects by flattening them
  const flattenObject = (obj: any, prefix = '') => {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  // Flatten the data
  const flatData = Object.keys(data).reduce((acc: any, key: string) => {
    acc[key] = typeof data[key] === 'object' ? 
      flattenObject(data[key]) : 
      data[key];
    return acc;
  }, {});

  // Get all unique headers
  const headers = Array.from(new Set(
    Object.values(flatData)
      .flatMap(item => Object.keys(item))
  ));

  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...Object.keys(flatData).map(key => {
      return headers.map(header => {
        const value = flatData[key][header] ?? '';
        return typeof value === 'string' ? `"${value}"` : value;
      }).join(',');
    })
  ];

  return csvRows.join('\n');
};

export const convertToExcel = (data: any) => {
  if (!data || Object.keys(data).length === 0) return null;

  const workbook = XLSX.utils.book_new();

  // Function to flatten object for a sheet
  const flattenObject = (obj: any, prefix = '') => {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  // Process each category of stats
  const categories = {
    'Overall Stats': data.overallStats,
    'Department Stats': data.departmentWiseStats,
    'Course Stats': data.courseWiseStats,
    'Gender Stats': data.genderWiseStats,
    'Category Stats': data.categoryWiseStats,
    'Academic Stats': data.academicWiseStats
  };

  Object.entries(categories).forEach(([sheetName, statsData]) => {
    if (!statsData) return;

    let flatData;
    
    // Special handling for overall stats
    if (sheetName === 'Overall Stats') {
      flatData = Object.entries(statsData).map(([key, value]) => ({
        'Metric': key,
        'Value': value
      }));
    } else {
      // Handle other stats as before
      flatData = Object.entries(statsData).map(([key, value]) => ({
        Category: key,
        ...flattenObject(value)
      }));
    }

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(flatData);

    // Add column width for better readability
    const colWidths = [
      { wch: 30 }, // First column
      { wch: 15 }  // Second column
    ];
    worksheet['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};
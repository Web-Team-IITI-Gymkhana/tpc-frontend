import { ColumnDef } from "@tanstack/react-table";

export default function generateColumns(dto: any): ColumnDef<any>[] {
  const generatedColumns: ColumnDef<any>[] = [];

  function generateColumnsRecursive(data: any, prefix = "") {
    Object.entries(data).forEach(([key, value]) => {
      const header = key.charAt(0).toUpperCase() + key.slice(1);
      const accessorKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "object" && value !== null) {
        generateColumnsRecursive(value, accessorKey);
      } else {
        const column: ColumnDef<any> = {
          accessorKey,
          header,
          size: getColumnSize(key),
        };

        generatedColumns.push(column);
      }
    });
  }

  function getColumnSize(key: string): number {
    const sizes: { [key: string]: number } = {
      id: 40,
      userId: 120,
      programId: 120,
      rollNo: 80,
      category: 120,
      gender: 100,
      cpi: 80,
      name: 200,
      email: 250,
      contact: 150,
      course: 200,
      branch: 200,
      year: 80,
    };

    return sizes[key] || 150;
  }

  if (dto.length > 0) {
    generateColumnsRecursive(dto[0]);
  }

  return generatedColumns;
}

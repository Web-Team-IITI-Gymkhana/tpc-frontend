export default function generateColumns(jsonData: any) {
  const generatedColumns: any = [];

  function generateColumnsRecursive(data: any, prefix = "") {
    Object.entries(data).forEach(([key, value]) => {
      const header = prefix ? `${prefix}_${key}` : key;
      console.log("prefix", prefix);
      if (typeof value === "object" && value !== null) {
        generateColumnsRecursive(value, header);
      } else {
        const column = {
          accessorKey: prefix ? `${prefix}.${key}` : key,
          header: header.charAt(0).toUpperCase() + header.slice(1),
          cell: ({ row }: any) => (
            <div>
              {prefix && row.original[prefix]
                ? row.original[prefix][key] || "N/A"
                : row.getValue(key) || "N/A"}
            </div>
          ),
        };

        generatedColumns.push(column);
      }
    });
  }
  generateColumnsRecursive(jsonData);

  return generatedColumns;
}

interface FilterOption {
  columnId: string;
  value: string;
  operator: "eq" | "lt" | "gt";
}

export default function mapFiltersToJsonOutput(
  filters: FilterOption[],
  dto: any,
) {
  const output: any = {
    q: {
      filterBy: {},
    },
  };

  filters.forEach((filter) => {
    const { columnId, value, operator } = filter;
    const keys = columnId.split("_");
    let currentNode = output.q.filterBy;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (!currentNode[key]) {
          currentNode[key] = {};
        }

        const columnType = (dto[0] as any)[key];
        if (columnType === "number") {
          const convertedValue = Number(value);

          // For "eq" operator, store as an array of numbers
          if (operator === "eq") {
            const values = value.includes(",")
              ? value.split(",").map((v) => Number(v.trim()))
              : [convertedValue];
            currentNode[key][operator] = values;
          } else {
            // For "lt" and "gt" operator, store as a single number
            currentNode[key][operator] = convertedValue;
          }
        } else {
          // Keep the value as a string for other data types
          if (operator === "eq") {
            const values = value.includes(",")
              ? value.split(",").map((v) => v.trim())
              : [value];
            currentNode[key][operator] = values;
          } else {
            if (!currentNode[key][operator]) {
              currentNode[key][operator] = [];
            }
            currentNode[key][operator].push(value);
          }
        }
      } else {
        if (!currentNode[key]) {
          currentNode[key] = {};
        }
        currentNode = currentNode[key];
      }
    });
  });
  return output;
}

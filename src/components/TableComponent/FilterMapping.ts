interface FilterOption {
    columnId: string;
    value: string;
    operator: "eq" | "lt" | "gt";
}

export default function mapFiltersToJsonOutput(filters: FilterOption[]) {
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
                if (operator === "eq") {
                    const values = value.includes(",") ? value.split(",").map((v) => v.trim()) : [value];
                    currentNode[key][operator] = values;
                } else {
                    if (!currentNode[key][operator]) {
                        currentNode[key][operator] = [];
                    }
                    currentNode[key][operator].push(value);
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

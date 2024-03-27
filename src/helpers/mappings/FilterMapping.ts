interface FilterOption {
    columnId: string;
    value: string;
    operator: "eq" | "lt" | "gt";
  }
  
  const mapFiltersToJsonOutput = (filters: FilterOption[]): any => {
    const output: any = {
      from: 0,
      to: 0,
      filterBy: {},
      orderBy: {},
    };
  
    filters.forEach((filter) => {
      const { columnId, value, operator } = filter;
      const keys = columnId.split(".");
      let currentNode = output.filterBy;
  
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          if (!currentNode[key]) {
            currentNode[key] = {};
          }
  
          if (operator === "eq") {
            if (!currentNode[key].eq) {
              currentNode[key].eq = [];
            }
            currentNode[key].eq.push(value);
          } else if (operator === "lt") {
            currentNode[key].lt = parseFloat(value);
          } else if (operator === "gt") {
            currentNode[key].gt = parseFloat(value);
          }
        } else {
          if (!currentNode[key]) {
            currentNode[key] = {};
          }
          currentNode = currentNode[key];
        }
      });
    });
  
    const orderByKeys = Object.keys(output.filterBy);
    orderByKeys.forEach((key) => {
      output.orderBy[key] = "ASC/DESC";
    });
  
    return output;
  };
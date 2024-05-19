import qs from "qs";
import axios from "axios";

export const handleFilterChange = (
  columnId: string,
  value: string,
  filters: any,
  setFilters: any,
) => {
  const existingFilterIndex = filters.findIndex(
    (filter: any) => filter.columnId === columnId,
  );
  if (existingFilterIndex === -1) {
    setFilters([...filters, { columnId, value, operator: "eq" }]);
  } else {
    setFilters((prevFilters: any) =>
      prevFilters.filter((filter: any) => filter.columnId !== columnId),
    );
  }
};

export const handleOperatorChange = (
  columnId: string,
  operator: "eq" | "lt" | "gt",
  setFilters: any,
) => {
  setFilters((prevFilters: any) =>
    prevFilters.map((filter: any) =>
      filter.columnId === columnId ? { ...filter, operator } : filter,
    ),
  );
};

export const handleSubmit = (filterOutput: any,setFilteredTableData:any) => {
  const queryObject = filterOutput;
  console.log(queryObject);
  const encodedQueryString = qs.stringify(queryObject, {
    encodeValuesOnly: true,
    encode: false,
  });
  const url = `${window.location.href}/${encodedQueryString}`;
  console.log(url)
  window.open(url, '_blank');
};
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

export const handleSubmit = async (filterOutput: any, setTableData: any) => {
  const queryObject = filterOutput;
  console.log(queryObject);
  const encodedQueryString = qs.stringify(queryObject, {
    encodeValuesOnly: true,
    encode: false,
  });

  const url = `http://localhost:5000/api/v1/students?${encodedQueryString}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    console.log(response.data);
    setTableData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

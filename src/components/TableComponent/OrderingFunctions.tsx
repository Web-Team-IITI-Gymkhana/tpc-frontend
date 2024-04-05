export const handleColumnHeaderClick = (
  columnId: string,
  sortingOrder: any,
  filterOutput: any,
  setSortingOrder: any,
  setSorting: any,
) => {
  const newSortingOrder = { ...sortingOrder };
  const newSorting = [];

  newSortingOrder[columnId] = sortingOrder[columnId] === "asc" ? "desc" : "asc";

  newSorting.push({
    id: columnId,
    desc: newSortingOrder[columnId] === "desc",
  });

  Object.keys(newSortingOrder).forEach((key) => {
    if (key !== columnId) {
      delete newSortingOrder[key];
    }
  });

  filterOutput.orderBy = newSortingOrder;

  setSortingOrder(newSortingOrder);
  setSorting(newSorting);
};

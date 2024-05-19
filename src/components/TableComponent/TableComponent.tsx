"use client";
import * as React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { fetchStudentData } from "@/helpers/api";
import Cookies from "js-cookie";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DeleteStudentModal from "../Students/Operations/DeleteStudentModal";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImportData from "./ImportData";
import ExportData from "./ExportData";
import mapFiltersToJsonOutput from "./FilterMapping";
import copyIDsToClipboard from "./CopyToClipBoard";
import { handleFilterChange, handleOperatorChange } from "./FilteringFunctions";
import { handleColumnHeaderClick } from "./OrderingFunctions";
import { handleSubmit } from "./FilteringFunctions";
import { customStyles } from "./CustomModelStyles";

interface FilterOption {
  columnId: string;
  value: string;
  operator: "eq" | "lt" | "gt";
}

export default function TableComponent({
  data,
  columns,
  AddButtonText,
  isAddButton,
  dto,
}: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [sortingOrder, setSortingOrder] = React.useState<{
    [key: string]: "asc" | "desc";
  }>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isDeleteModal, setisDeleteModal] = useState(false);
  const [filters, setFilters] = React.useState<FilterOption[]>([]);
  const [tableData, setTableData] = useState(data);
  const [checkedRows, setCheckedRows] = React.useState<any[]>([]);
  const checkboxColumn: ColumnDef<any> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          setCheckedRows((prevCheckedRows) =>
            !!value
              ? [...prevCheckedRows, row.original]
              : prevCheckedRows.filter((r) => r !== row.original),
          );
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const table = useReactTable({
    data: tableData,
    columns: [checkboxColumn, ...columns],
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  let filterOutput = mapFiltersToJsonOutput(filters, dto);

  return (
    <div className="w-full">
      <Modal
        isOpen={isDeleteModal}
        onRequestClose={() => setisDeleteModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DeleteStudentModal
          isDeleteModalOpen={isDeleteModal}
          memberId={rowSelection}
          setisDeleteModal={setisDeleteModal}
        />
      </Modal>
      <div className="flex flex-col items-center py-4 bg-white rounded-lg">
        <div className="flex items-center justify-between w-full mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto mx-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                <span className="text-gray-800">Filters</span>{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-800" />
              </Button>
            </DropdownMenuTrigger>
            <Button
              onClick={() => {
                handleSubmit(filterOutput, setTableData);
              }}
              className="rounded-md mx-2 bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Submit Filters
            </Button>
            <Button
              onClick={async () => {
                setFilters([]);
                const AllStudents = await fetchStudentData(
                  Cookies.get("accessToken"),
                  undefined
                );
                setTableData(AllStudents);
              }}
              className="rounded-md mx-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Clear Filters
            </Button>
            <DropdownMenuContent align="end" className="bg-white shadow-lg">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-gray-800 hover:bg-gray-100"
                      checked={!!filters.find((x) => x.columnId === column.id)}
                      onCheckedChange={(value) => {
                        handleFilterChange(column.id, "", filters, setFilters);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                <span className="text-gray-800">Columns</span>{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-gray-800 hover:bg-gray-100"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto mx-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                <span className="text-gray-800">Actions</span>{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-gray-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg">
              <ImportData />
              <DropdownMenuSeparator className="border-gray-300 mx-2 bg-gray-300 my-2" />
              <ExportData data={tableData} />
              <DropdownMenuSeparator className="border-gray-300 mx-2 bg-gray-300 my-2" />
              <Button
                onClick={() => {
                  copyIDsToClipboard(table);
                }}
                className="w-full rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                Copy IDs to Clipboard
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAddButton && (
            <Button
              variant="default"
              className="mx-2 bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {AddButtonText}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center w-full">
          {filters.map((filter: any, index) => (
            <div
              key={index}
              className="flex items-center mx-2 mb-2 border rounded-md p-2 bg-gray-100 shadow-md"
            >
              <Input
                placeholder={`Filter ${filter.columnId}...`}
                value={filter.value}
                onChange={(event: any) => {
                  const { columnId } = filter;
                  const updatedFilters = filters.map((existingFilter) =>
                    existingFilter.columnId === columnId
                      ? { ...existingFilter, value: event.target.value }
                      : existingFilter,
                  );
                  setFilters(updatedFilters);
                }}
                className="w-full rounded-md bg-white text-gray-800"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    {filter.operator === "eq" && <span>{"="}</span>}
                    {filter.operator === "lt" && <span>{"<"}</span>}
                    {filter.operator === "gt" && <span>{">"}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white shadow-lg">
                  <DropdownMenuItem
                    onClick={() =>
                      handleOperatorChange(filter.columnId, "eq", setFilters)
                    }
                    className="hover:bg-gray-100 text-gray-800"
                  >
                    <span className="mr-2 text-gray-800">{"="}</span>
                    Equals
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleOperatorChange(filter.columnId, "lt", setFilters)
                    }
                    className="hover:bg-gray-100 text-gray-800"
                  >
                    <span className="mr-2 text-gray-800">{"<"}</span>
                    Less Than
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleOperatorChange(filter.columnId, "gt", setFilters)
                    }
                    className="hover:bg-gray-100 text-gray-800"
                  >
                    <span className="mr-2 text-gray-800">{">"}</span>
                    Greater Than
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md border shadow-md bg-white mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnId = header.column.id;
                  const isAscending = sortingOrder[columnId] === "asc";
                  const isDescending = sortingOrder[columnId] === "desc";
                  return (
                    <TableHead key={header.id}>
                      {/* Column Header */}
                      <div className="flex items-center text-gray-800">
                        {/* Render the column header */}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {/* Sorting Button */}
                        <button
                          onClick={() =>
                            handleColumnHeaderClick(
                              columnId,
                              sortingOrder,
                              filterOutput,
                              setSortingOrder,
                              setSorting,
                            )
                          }
                          className={`ml-2 ${
                            sortingOrder[columnId] === "asc"
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          <ArrowUpDown size={16} />
                        </button>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-100 transition-colors duration-200 odd:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={`${row.id}-${cell.column.id}`}
                      className="py-3 px-4 text-sm font-medium text-gray-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500 font-medium"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4 text-gray-800">
        <div className="flex items-center">
          <div className="flex-1 text-sm text-gray-600 items-center">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows?.length || 0} row(s) selected.
          </div>
          <div>
            <Button
              onClick={() => {
                setisDeleteModal(true);
              }}
              className="ml-3 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Selected Students
            </Button>
          </div>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

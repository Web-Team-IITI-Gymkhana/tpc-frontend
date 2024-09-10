"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
  MRT_Row,
  MRT_TableInstance,
  MRT_RowSelectionState,
} from "material-react-table";
import React, { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "copy-to-clipboard";
import { Box, Button, MenuItem } from "@mui/material";
import { Button as UIButton } from "@/components/ui/button";
import StudentModal from "./StudentModal";
import PenaltyModal from "./PenaltyModal";
import RecruiterModal from "./RecruiterModal";
import SeasonModal from "./SeasonModal";
import Link from "next/link";
import toast from "react-hot-toast";

type TableProps = {
  data: any[];
  columns: any[];
  type: string;
  showExport?: boolean;
  buttonText?: string;
  buttonAction?: (rows: any) => void;
};

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Table: React.FC<TableProps> = ({
  data,
  columns,
  type,
  showExport = true,
  buttonText,
  buttonAction,
}) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {},
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [seasontype, setSeasonType] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const flattenObject = (obj: any, prefix = ""): Record<string, any> => {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + " " : "";
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };

  const flattenData = (data: any[]): any[] => {
    return data.map((item) => flattenObject(item));
  };

  const handleExportRows = (rows: MRT_Row<any>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(flattenData(rowData));
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(flattenData(data));
    download(csvConfig)(csv);
  };

  const handleCopyIds = (rows: MRT_Row<any>[]) => {
    const ids = rows.map((row) => row.original.id).join(", ");
    copy(ids);
    toast.success(`Copied IDs`);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableRowActions: true,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    enableGlobalFilterModes: true,
    positionToolbarAlertBanner: "bottom",
    getRowId: (row: any) => row.id,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    renderRowActionMenuItems: ({
      row,
      table,
    }: {
      row: MRT_Row<any>;
      table: MRT_TableInstance<any>;
    }): React.ReactNode[] => [
      ...(type === "student"
        ? [
            <MenuItem
              key="edit"
              onClick={() => {
                setId(row.original.id);
                handleOpenModal();
              }}
            >
              Add Penalty
            </MenuItem>,
          ]
        : []),
      ...(type === "job"
        ? [
            <Link href={`/admin/jobs/${row.original.id}`} key="view">
              <MenuItem>View {type}</MenuItem>
            </Link>,
          ]
        : type === "season"
          ? [
              <MenuItem
                key="view"
                onClick={() => {
                  setId(row.original.student.id);
                  setSeasonType(row.original.season.type);
                  setYear(row.original.season.year);
                  setOpen(true);
                }}
              >
                View Season
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="view"
                onClick={() => {
                  setId(row.original.id);
                  setOpen(true);
                }}
              >
                View {type}
              </MenuItem>,
            ]),
    ],
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        {showExport && (
          <>
            <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
              Export All Data
            </Button>
            <Button
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              startIcon={<FileDownloadIcon />}
            >
              Export All Rows
            </Button>
            <Button
              disabled={table.getRowModel().rows.length === 0}
              onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />}
            >
              Export Page Rows
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
            >
              Export Selected Rows
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              onClick={() => handleCopyIds(table.getSelectedRowModel().rows)}
              startIcon={<ContentCopyIcon />}
            >
              Copy Selected IDs
            </Button>
          </>
        )}
      </Box>
    ),
  });

  return (
    <>
      {type === "student" && (
        <StudentModal open={open} setOpen={setOpen} id={id} />
      )}
      {type === "recruiter" && (
        <RecruiterModal open={open} setOpen={setOpen} id={id} />
      )}
      <div className="my-2">
        <MaterialReactTable table={table} />
        {buttonText && (
          <div className="w-full p-4 flex justify-center">
            <UIButton
              className="px-16 bg-gradient-to-br from-gray-400 to-gray-700"
              onClick={() => {
                buttonAction(
                  table.getSelectedRowModel().rows.map((row) => row.original),
                );
              }}
            >
              {buttonText}
            </UIButton>
          </div>
        )}
      </div>
      {type === "student" && (
        <PenaltyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          studentId={id}
        />
      )}
      {type === "season" && (
        <SeasonModal
          open={open}
          setOpen={setOpen}
          id={id}
          type={seasontype}
          year={year}
        />
      )}
    </>
  );
};

export default Table;

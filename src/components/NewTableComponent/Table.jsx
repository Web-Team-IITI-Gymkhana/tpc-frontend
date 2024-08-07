"use client";
import {
  MaterialReactTable,
  useMaterialReactTable,
  createMRTColumnHelper,
} from "material-react-table";
import { useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import copy from 'copy-to-clipboard';
import { Box, Button } from "@mui/material";
import { MenuItem } from "@mui/material";
import StudentModal from "./StudentModal";
import JobModal from "./NewJobModal";
import PenaltyModal from "./PenaltyModal";
import RecruiterModal from "./RecruiterModal";
import SeasonModal from "./SeasonModal";
import Link from "next/link";
import toast from "react-hot-toast";
const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Table = ({ data, columns, type }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const flattenObject = (obj, prefix = "") => {
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
  const flattenData = (data) => {
    return data.map((item) => flattenObject(item));
  };
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    console.log(rowData);
    const csv = generateCsv(csvConfig)(flattenData(rowData));
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    console.log(flattenData);
    const csv = generateCsv(csvConfig)(flattenData(data));
    download(csvConfig)(csv);
  };

  const handleCopyIds = (rows) => {
    const ids = rows.map((row) => row.original.id).join(', ');
    copy(ids);
    toast.success(`Copied IDs`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [seasontype, setSeasonType] = useState(null);
  const [year, setYear] = useState(null);

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
    renderRowActionMenuItems: ({ row, table }) => (
      <Box>
        {type === "student" && (
            <MenuItem
            key="edit"
            onClick={() => {
              setId(row.original.id);
              handleOpenModal();
            }}
          > Add Penalty</MenuItem>
        )}
        
        {type == "job" ? (
          <Link href={`/admin/jobs/${row.original.id}`}>
            <MenuItem key="view">View {type}</MenuItem>
          </Link>
        ) : (
          type == "season" ? (
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
          </MenuItem>
          
          ) : (
          <MenuItem
            key="view"
            onClick={() => {
              setId(row.original.id);
              setOpen(true);
            }}
          >
            View {type}
          </MenuItem>
          )
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
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
      </Box>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <div className="my-5 mx-5">
        <div>Penalty</div>
        <input placeholde="Add Penalty" />
        <button>Submit</button>
      </div>
    ),
  });

  return (
    <>
      {type === "student" && (
        <StudentModal open={open} setOpen={setOpen} id={id} />
      )}
      {/* {type == "job" && <JobModal open={open} setOpen={setOpen} jobID={id} />} */}
      {type == "recruiter" && (
        <RecruiterModal open={open} setOpen={setOpen} id={id} />
      )}
      <div className="my-2">
        <MaterialReactTable table={table} />
      </div>
      {type === "student" && (
        <PenaltyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          studentId={id}
        />
      )}
      {type === "season" && (
        <SeasonModal open={open} setOpen={setOpen} id={id} type={seasontype} year={year} />
      )}

    </>
  );
};
export default Table;

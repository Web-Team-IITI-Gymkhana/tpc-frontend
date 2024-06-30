'use client'
import {
    MaterialReactTable,
    useMaterialReactTable,
    createMRTColumnHelper,
} from 'material-react-table';
import { useState } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Box, Button } from '@mui/material';
import { MenuItem } from '@mui/material';
import StudentModal from './StudentModal';
import JobModal from './JobModal';
import PenaltyModal from './PenaltyModal';
import RecruiterModal from './RecruiterModal'
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const Table = ({ data, columns, type }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const pre = prefix.length ? prefix + ' ' : '';
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(acc, flattenObject(obj[key], pre + key));
            } else {
                acc[pre + key] = obj[key];
            }
            return acc;
        }, {});
    };
    const flattenData = (data) => {
        return data.map(item => flattenObject(item));
    };
    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        console.log(rowData)
        const csv = generateCsv(csvConfig)(flattenData(rowData));
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        console.log(flattenData)
        const csv = generateCsv(csvConfig)(flattenData(data));
        download(csvConfig)(csv);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const table = useMaterialReactTable({
        columns,
        data,
        createDisplayMode: 'modal',
        editDisplayMode: 'modal',
        enableRowActions: true,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        enableGlobalFilterModes: true,
        positionToolbarAlertBanner: 'bottom',
        renderRowActionMenuItems: ({ row, table }) => (
            <Box>
                {type === 'student' && (
                    <MenuItem key="edit" onClick={handleOpenModal}>
                        Add Penalty
                    </MenuItem>
                )}
                <MenuItem key="view" onClick={() => {
                    setId(row.original.id);
                    setOpen(true)
                }}>
                    View {type}
                </MenuItem>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    onClick={handleExportData}
                    startIcon={<FileDownloadIcon />}
                >
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
            </Box>
        ),
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <div className='my-5 mx-5'>
                <div>Penalty</div>
                <input placeholde="Add Penalty" />
                <button>Submit</button>
            </div>
        ),
    });

    return (
        <>
            {type === 'student' && (
                <StudentModal open={open} setOpen={setOpen} id={id} />
            )}{type == "job" && (
                <JobModal open={open} setOpen={setOpen} id={id} />
            )}
            {type == "recruiter" && (
                <RecruiterModal open={open} setOpen={setOpen} id={id} />
            )}
            <div className='my-2'>
                <MaterialReactTable table={table} />
            </div>
            {type === 'student' && (
                <PenaltyModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    studentId={id}
                />
            )}
        </>
    );
};
export default Table;
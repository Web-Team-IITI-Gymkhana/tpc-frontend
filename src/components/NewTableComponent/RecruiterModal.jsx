'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: grey[800],
        },
        background: {
            default: grey[100],
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '90vh',
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function RecruiterModal({ open, setOpen, id }) {
    const [recruiterData, setRecruiterData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecruiterData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/v1/recruiters/${id}`);
                const data = await response.json();
                setRecruiterData(data);
            } catch (error) {
                console.error('Error fetching recruiter data:', error);
            }
            setLoading(false);
        };

        if (open && id) {
            fetchRecruiterData();
        }
    }, [open, id]);

    const handleClose = () => setOpen(false);

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                className='!text-black !border-none'
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {recruiterData && (
                                <>
                                    <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
                                        Recruiter Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell>{recruiterData.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Designation
                                                    </TableCell>
                                                    <TableCell>{recruiterData.designation}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Landline
                                                    </TableCell>
                                                    <TableCell>{recruiterData.landline}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        User Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell>{recruiterData.user.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>{recruiterData.user.email}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Contact
                                                    </TableCell>
                                                    <TableCell>{recruiterData.user.contact}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Company Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell>{recruiterData.company.name}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Jobs
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Season</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {recruiterData.jobs.map((job) => (
                                                    <TableRow key={job.id}>
                                                        <TableCell>{job.role}</TableCell>
                                                        <TableCell>{job.company.name}</TableCell>
                                                        <TableCell>
                                                            {job.season.type} {job.season.year}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </ThemeProvider>
    );
}
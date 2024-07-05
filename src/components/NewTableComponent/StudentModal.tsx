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
import { Button } from '@mui/material';

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

export default function StudentModal({ open, setOpen, id }) {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStudentData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/v1/students/${id}`);
                const data = await response.json();
                setStudentData(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
            setLoading(false);
        };

        if (open && id) {
            fetchStudentData();
        }
    }, [open, id]);

    const handleClose = () => setOpen(false);

    return (
        <ThemeProvider theme={theme} >
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
                            {studentData && (
                                <>
                                    <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
                                        Student Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell>{studentData.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Roll No
                                                    </TableCell>
                                                    <TableCell>{studentData.rollNo}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Category
                                                    </TableCell>
                                                    <TableCell>{studentData.category}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Gender
                                                    </TableCell>
                                                    <TableCell>{studentData.gender}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        CPI
                                                    </TableCell>
                                                    <TableCell>{studentData.cpi}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        10th Marks
                                                    </TableCell>
                                                    <TableCell>{studentData.tenthMarks}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        12th Marks
                                                    </TableCell>
                                                    <TableCell>{studentData.twelthMarks}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Total Penalty
                                                    </TableCell>
                                                    <TableCell>{studentData.totalPenalty}</TableCell>
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
                                                    <TableCell>{studentData.user.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>{studentData.user.email}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Contact
                                                    </TableCell>
                                                    <TableCell>{studentData.user.contact}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Program Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Branch
                                                    </TableCell>
                                                    <TableCell>{studentData.program.branch}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Course
                                                    </TableCell><TableCell>{studentData.program.course}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Year
                                                    </TableCell>
                                                    <TableCell>{studentData.program.year}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Department
                                                    </TableCell>
                                                    <TableCell>{studentData.program.department}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Resumes
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Filepath</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Verified</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {studentData.resumes.map((resume) => (
                                                    <TableRow key={resume.id}>
                                                        <TableCell>{resume.id}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                href={resume.filepath}
                                                                target="_blank"
                                                                download
                                                            >
                                                                Download
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>{resume.verified.toString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Penalties
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Penalty</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {studentData.penalties.map((penalty) => (
                                                    <TableRow key={penalty.id}>
                                                        <TableCell>{penalty.id}</TableCell>
                                                        <TableCell>{penalty.penalty}</TableCell>
                                                        <TableCell>{penalty.reason}</TableCell>
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
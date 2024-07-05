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

export default function ViewJobModal({ open, setOpen, id }) {
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/api/v1/jobs/${id}`);
                const data = await response.json();
                setJobData(data);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
            setLoading(false);
        };

        if (open && id) {
            fetchJobData();
        }
    }, [open, id]);

    const handleClose = () => setOpen(false);

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                className='!text-black'
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
                            {jobData && (
                                <>
                                    <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom>
                                        Job Details
                                    </Typography>
                                    {/* General Job Information */}
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell>{jobData.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Role
                                                    </TableCell>
                                                    <TableCell>{jobData.role}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Active
                                                    </TableCell>
                                                    <TableCell>{jobData.active.toString()}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Current Status
                                                    </TableCell>
                                                    <TableCell>{jobData.currentStatus}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        No. of Vacancies
                                                    </TableCell>
                                                    <TableCell>{jobData.noOfVacancies}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Duration
                                                    </TableCell>
                                                    <TableCell>{jobData.duration}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Location
                                                    </TableCell>
                                                    <TableCell>{jobData.location}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Season Information */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Season Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell>{jobData.season.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Year
                                                    </TableCell>
                                                    <TableCell>{jobData.season.year}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Type
                                                    </TableCell>
                                                    <TableCell>{jobData.season.type}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Company Information */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Company Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell>{jobData.company.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell>{jobData.company.name}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Recruiter Information */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Recruiter Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        ID
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiter.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Designation
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiter.designation}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiter.user.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiter.user.email}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Contact
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiter.user.contact}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Company Details Filled */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Company Details Filled
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Category
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.category}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Year of Establishment
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.yearOfEstablishment}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Website
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.website}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Size
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.size}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Annual Turnover
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.annualTurnover}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Social Media Link
                                                    </TableCell>
                                                    <TableCell>{jobData.companyDetailsFilled.socialMediaLink}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Domains
                                                    </TableCell>
                                                    <TableCell>
                                                        {jobData.companyDetailsFilled.domains.join(', ')}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Address
                                                    </TableCell>
                                                    <TableCell>
                                                        {`${jobData.companyDetailsFilled.address.line1}, ${jobData.companyDetailsFilled.address.line2}, ${jobData.companyDetailsFilled.address.city}, ${jobData.companyDetailsFilled.address.state}, ${jobData.companyDetailsFilled.address.country}`}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Recruiter Details Filled */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Recruiter Details Filled
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiterDetailsFilled.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiterDetailsFilled.email}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Contact
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiterDetailsFilled.contact}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Designation
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiterDetailsFilled.designation}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Landline
                                                    </TableCell>
                                                    <TableCell>{jobData.recruiterDetailsFilled.landline}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Selection Procedure */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Selection Procedure
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Selection Mode
                                                    </TableCell>
                                                    <TableCell>{jobData?.selectionProcedure?.selectionMode}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Shortlist from Resume
                                                    </TableCell>
                                                    <TableCell>
                                                        {jobData?.selectionProcedure?.shortlistFromResume.toString()}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Group Discussion
                                                    </TableCell>
                                                    <TableCell>
                                                        {jobData?.selectionProcedure?.groupDiscussion.toString()}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Tests
                                                    </TableCell>
                                                    <TableCell>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                                                    <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {jobData?.selectionProcedure?.tests.map((test) => (
                                                                    <TableRow key={test.type}>
                                                                        <TableCell>{test.type}</TableCell>
                                                                        <TableCell>{test.duration}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Interviews
                                                    </TableCell>
                                                    <TableCell>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                                                    <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {jobData?.selectionProcedure?.interviews.map((interview) => (
                                                                    <TableRow key={interview.type}>
                                                                        <TableCell>{interview.type}</TableCell>
                                                                        <TableCell>{interview.duration}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Requirements
                                                    </TableCell>
                                                    <TableCell>
                                                        <Table>
                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                                        No. of Members
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {jobData?.selectionProcedure?.requirements?.numberOfMembers}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                                        No. of Rooms
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {jobData?.selectionProcedure?.requirements?.numberOfRooms}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                                        Other Requirements
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {jobData?.selectionProcedure?.requirements?.otherRequirements}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Others
                                                    </TableCell>
                                                    <TableCell>{jobData?.selectionProcedure?.others}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Other Details */}
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Description
                                                    </TableCell>
                                                    <TableCell>{jobData.description}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Attachment
                                                    </TableCell>
                                                    <TableCell>{jobData.attachment}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Skills
                                                    </TableCell>
                                                    <TableCell>{jobData.skills}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Offer Letter Release Date
                                                    </TableCell>
                                                    <TableCell>{new Date(jobData.offerLetterReleaseDate).toLocaleString()}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Joining Date
                                                    </TableCell>
                                                    <TableCell>{new Date(jobData.joiningDate).toLocaleString()}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                                                        Feedback
                                                    </TableCell>
                                                    <TableCell>{jobData.feedback}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Job Coordinators */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Recruiter Details
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Job ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Job Role</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Season</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {jobData.jobCoordinators.map((coordinator) => (
                                                    <TableRow key={coordinator.id}>
                                                        <TableCell>{coordinator.id}</TableCell>
                                                        <TableCell>{coordinator.role}</TableCell>
                                                        <TableCell>{coordinator.job.id}</TableCell>
                                                        <TableCell>{coordinator.job.role}</TableCell>
                                                        <TableCell>{coordinator.job.company.name}</TableCell>
                                                        <TableCell>
                                                            {coordinator.job.season.year} - {coordinator.job.season.type}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Events */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Events
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3} sx={{ mb: 4 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Round Number</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Metadata</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Start DateTime</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>End DateTime</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Visible to Recruiter</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {jobData.events.map((event) => (
                                                    <TableRow key={event.id}>
                                                        <TableCell>{event.id}</TableCell>
                                                        <TableCell>{event.roundNumber}</TableCell>
                                                        <TableCell>{event.type}</TableCell>
                                                        <TableCell>{event.metadata}</TableCell>
                                                        <TableCell>{new Date(event.startDateTime).toLocaleString()}</TableCell>
                                                        <TableCell>{new Date(event.endDateTime).toLocaleString()}</TableCell>
                                                        <TableCell>{event.visibleToRecruiter.toString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Salaries */}
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 2 }}>
                                        Salaries
                                    </Typography>
                                    <TableContainer component={Paper} elevation={3}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Total CTC</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Salary Period</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Genders</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Programs</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Faculty Approvals</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Categories</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Min CPI</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>10th Marks</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>12th Marks</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {jobData.salaries.map((salary) => (
                                                    <TableRow key={salary?.id}>
                                                        <TableCell>{salary?.id}</TableCell>
                                                        <TableCell>{salary?.totalCTC}</TableCell>
                                                        <TableCell>{salary?.salaryPeriod}</TableCell>
                                                        <TableCell>{salary?.genders?.join(', ')}</TableCell>
                                                        <TableCell>{salary?.programs?.join(', ')}</TableCell>
                                                        <TableCell>{salary?.facultyApprovals?.join(', ')}</TableCell>
                                                        <TableCell>{salary?.categories?.join(', ')}</TableCell>
                                                        <TableCell>{salary?.minCPI}</TableCell>
                                                        <TableCell>{salary?.tenthMarks}</TableCell>
                                                        <TableCell>{salary?.twelthMarks}</TableCell>
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
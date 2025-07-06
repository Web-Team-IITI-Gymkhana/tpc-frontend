"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { Button } from "@mui/material";
import { fetchRegistrations } from "@/helpers/api";
import Loader from "@/components/Loader/loader";
import {
  fetchStudentDataById,
  fetchRegistrationDataById,
  fetchAllSeasons,
  fetchSeasonDataById,
  postRegistration,
  debarStudent,
  getResumeFile,
  patchResumeVerify,
  patchStudentData,
} from "@/helpers/api";

import toast from "react-hot-toast";
const redirect = () => {};
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: grey[800],
    },
    background: {
      default: grey[100],
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  maxHeight: "90vh",
};

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const handleRegistration = async (
  studentId: any,
  seasonId: any,
  currentStatus: any,
) => {
  try {
    const response = await fetchRegistrations(
      studentId,
      seasonId,
      currentStatus,
    );

    if (!response) {
      toast.error("Failed to update registration status");
      throw new Error("Failed to update registration status");
      //Will change it in a separate toast removal PR
    }

    toast.success("Registration status updated successfully");
    return true;
  } catch (error) {
    toast.error("Error updating registration status:", error.message);
    alert(`Error updating registration status: ${error.message}`);
    return false;
  }
};

export default function StudentModal({ open, setOpen, id }) {
  const [studentData, setStudentData] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [activeSeasons, setActiveSeasons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchStudentData = async (id: any) => {
    setLoading(true);
    try {
      const data = await fetchStudentDataById(id);
      setStudentData(data);
    } catch (error) {
      toast.error("Error fetching student data");
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrationData = async (studentId: any) => {
    setLoading(true);
    try {
      const data = await fetchRegistrationDataById(studentId);
      setRegistrationData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const fetchActiveSeasonsData = async (studentId: any) => {
    setLoading(true);
    try {
      const data = await fetchAllSeasons();
      const registrations = await fetchRegistrationDataById(studentId);
      const activeSeasons = data.filter((season) => season.status === "ACTIVE");
      const seasonids = registrations.map(
        (registration: any) => registration.season.id,
      );
      const displayedSeasons = activeSeasons.filter(
        (season: any) => !seasonids.includes(season.id),
      );
      setActiveSeasons(displayedSeasons);
    } catch (error) {
      toast.error("Error fetching active seasons data");
    }
  };
  const createRegistration = async (
    studentId: string,
    seasonId: string,
    registered: boolean,
  ) => {
    setActionLoading(true);
    try {
      const response = await postRegistration(studentId, seasonId, false);
      setActiveSeasons((prevData: any) =>
        prevData.filter((season: any) => season.id !== seasonId),
      );
      const newRegistration = await fetchRegistrationDataById(studentId);
      setRegistrationData(newRegistration);

      if (!response) {
        toast.error("Failed to create registration");
        throw new Error("Failed to create registration");
      }
      toast.success("Registration created successfully");
      return true;
    } catch (error) {
      toast.error("Error creating registration:", error.message);
      alert(`Error creating registration: ${error.message}`);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    if (open && id) {
      fetchStudentData(id);
      fetchRegistrationData(id);
      fetchActiveSeasonsData(id);
      setEditMode(false);
      setEditData(null);
    }
  }, [open, id]);

  const handleClose = () => setOpen(false);

  const handleStatusChange = async (
    studentId: any,
    seasonId: any,
    currentStatus: any,
  ) => {
    setActionLoading(true);
    try {
      const success = await handleRegistration(
        studentId,
        seasonId,
        currentStatus,
      );
      if (success) {
        setRegistrationData((prevData: any) =>
          prevData.map((registration: any) =>
            registration.season.id === seasonId
              ? { ...registration, registered: !currentStatus }
              : registration,
          ),
        );
      }
    } finally {
      setActionLoading(false);
    }
  };
  const handleDebar = async (registrationId: string, seasonId: string) => {
    setActionLoading(true);
    try {
      const response = await debarStudent(registrationId);

      if (!response) {
        toast.error("Failed to debar student");
        throw new Error("Failed to debar student");
      }
      setRegistrationData((prevData: any) =>
        prevData.filter(
          (registration: any) => registration.id !== registrationId,
        ),
      );
      const seasonData = await fetchSeasonDataById(seasonId);
      if (seasonData[0].status === "ACTIVE") {
        setActiveSeasons((prevData: any) => [...prevData, ...seasonData]);
      }
      toast.success("Student debarred successfully");
      return true;
    } catch (error) {
      toast.error("Error debarring student:", error.message);
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleResumeVerification = async (resumeId: string) => {
    setActionLoading(true);
    try {
      const success = await patchResumeVerify([
        { id: resumeId, verified: true },
      ]);
      if (success) {
        // Update the student data to reflect the change
        setStudentData((prevData: any) => ({
          ...prevData,
          resumes: prevData.resumes.map((resume: any) =>
            resume.id === resumeId ? { ...resume, verified: true } : resume,
          ),
        }));
        toast.success("Resume verified successfully");
      } else {
        throw new Error("Failed to verify resume");
      }
    } catch (error) {
      toast.error("Error verifying resume");
    } finally {
      setActionLoading(false);
    }
  };

  // When entering edit mode, copy studentData to editData
  const handleEdit = () => {
    setEditMode(true);
    setEditData({
      ...studentData,
      user: { ...studentData.user },
      program: { ...studentData.program },
    });
  };

  const handleEditChange = (field, value, nested = null) => {
    if (nested) {
      setEditData((prev) => ({
        ...prev,
        [nested]: { ...prev[nested], [field]: value },
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditCancel = () => {
    setEditMode(false);
    setEditData(null);
  };

  const handleEditSubmit = async () => {
    setActionLoading(true);
    try {
      const patchBody = {
        id: editData.id,
        programId: editData.program?.id || studentData.programId,
        rollNo: editData.rollNo,
        category: editData.category,
        gender: editData.gender,
        cpi: editData.cpi,
        backlog: editData.backlog || studentData.backlog,
        tenthMarks: editData.tenthMarks,
        twelthMarks: editData.twelthMarks,
        user: {
          name: editData.user.name,
          email: editData.user.email,
          contact: editData.user.contact,
        },
      };
      const res = await patchStudentData(patchBody);
      if (res) {
        toast.success("Student data updated successfully");
        setStudentData((prev) => ({ ...prev, ...editData }));
        setEditMode(false);
        setEditData(null);
      } else {
        toast.error("Failed to update student data");
      }
    } catch (error) {
      toast.error("Error updating student data");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        className="!text-black !border-none"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Edit button at top right */}
          {!loading && studentData && !editMode && (
            <Button
              variant="outlined"
              color="primary"
              style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          {/* Edit mode action buttons */}
          {editMode && (
            <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
              <Button
                variant="contained"
                color="success"
                onClick={handleEditSubmit}
                disabled={actionLoading}
              >
                {actionLoading ? "Saving..." : "Submit"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleEditCancel}
                disabled={actionLoading}
              >
                Cancel
              </Button>
            </Box>
          )}
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={200}
            >
              <div className="h-screen w-full flex justify-center items-center">
                <Loader />
              </div>
            </Box>
          ) : (
            <>
              {studentData && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    gutterBottom
                  >
                    Student Details
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{ mb: 4 }}
                  >
                    <Table>
                      <TableBody>
                        {/* ID */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            ID
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.id}
                                disabled
                                style={{ width: "100%" }}
                              />
                            ) : (
                              studentData.id
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Roll No */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Roll No
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.rollNo}
                                onChange={(e) =>
                                  handleEditChange("rollNo", e.target.value)
                                }
                                style={{ width: "100%" }}
                              />
                            ) : (
                              studentData.rollNo
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Category */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Category
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <select
                                value={editData.category}
                                onChange={(e) =>
                                  handleEditChange("category", e.target.value)
                                }
                                style={{ width: "100%" }}
                              >
                                <option value="GENERAL">GENERAL</option>
                                <option value="OBC">OBC</option>
                                <option value="SC">SC</option>
                                <option value="ST">ST</option>
                                <option value="EWS">EWS</option>
                              </select>
                            ) : (
                              studentData.category
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Gender */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Gender
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <select
                                value={editData.gender}
                                onChange={(e) =>
                                  handleEditChange("gender", e.target.value)
                                }
                                style={{ width: "100%" }}
                              >
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                                <option value="OTHER">OTHER</option>
                              </select>
                            ) : (
                              studentData.gender
                            )}
                          </TableCell>
                        </TableRow>
                        {/* CPI */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            CPI
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="number"
                                value={editData.cpi}
                                onChange={(e) =>
                                  handleEditChange("cpi", e.target.value)
                                }
                                style={{ width: "100%" }}
                              />
                            ) : (
                              studentData.cpi
                            )}
                          </TableCell>
                        </TableRow>
                        {/* 10th Marks */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            10th Marks
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="number"
                                value={editData.tenthMarks}
                                onChange={(e) =>
                                  handleEditChange("tenthMarks", e.target.value)
                                }
                                style={{ width: "100%" }}
                              />
                            ) : (
                              studentData.tenthMarks
                            )}
                          </TableCell>
                        </TableRow>
                        {/* 12th Marks */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            12th Marks
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="number"
                                value={editData.twelthMarks}
                                onChange={(e) =>
                                  handleEditChange(
                                    "twelthMarks",
                                    e.target.value,
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : (
                              studentData.twelthMarks
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Total Penalty */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Total Penalty
                          </TableCell>
                          <TableCell>{studentData.totalPenalty}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    User Details
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{ mb: 4 }}
                  >
                    <Table>
                      <TableBody>
                        {/* Name */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Name
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.user.name}
                                onChange={(e) =>
                                  handleEditChange(
                                    "name",
                                    e.target.value,
                                    "user",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.user ? (
                              studentData.user.name
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Email */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Email
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="email"
                                value={editData.user.email}
                                onChange={(e) =>
                                  handleEditChange(
                                    "email",
                                    e.target.value,
                                    "user",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.user ? (
                              studentData.user.email
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Contact */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Contact
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.user.contact}
                                onChange={(e) =>
                                  handleEditChange(
                                    "contact",
                                    e.target.value,
                                    "user",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.user ? (
                              studentData.user.contact
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Program Details
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{ mb: 4 }}
                  >
                    <Table>
                      <TableBody>
                        {/* Branch */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Branch
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.program.branch}
                                onChange={(e) =>
                                  handleEditChange(
                                    "branch",
                                    e.target.value,
                                    "program",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.program ? (
                              studentData.program.branch
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Course */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Course
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.program.course}
                                onChange={(e) =>
                                  handleEditChange(
                                    "course",
                                    e.target.value,
                                    "program",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.program ? (
                              studentData.program.course
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Year */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Year
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="number"
                                value={editData.program.year}
                                onChange={(e) =>
                                  handleEditChange(
                                    "year",
                                    e.target.value,
                                    "program",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.program ? (
                              studentData.program.year
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Department */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Department
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData.program.department || ""}
                                onChange={(e) =>
                                  handleEditChange(
                                    "department",
                                    e.target.value,
                                    "program",
                                  )
                                }
                                style={{ width: "100%" }}
                              />
                            ) : studentData.program ? (
                              studentData.program.department
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Resumes
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{ mb: 4 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Preview
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentData.resumes
                          ? studentData.resumes.map((resume) => (
                              <TableRow key={resume.id}>
                                <TableCell>
                                  {resume.name || `Resume ${resume.id}`}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      getResumeFile(resume.filepath as string);
                                    }}
                                  >
                                    Open Resume
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  {!resume.verified ? (
                                    <Button
                                      variant="contained"
                                      color="success"
                                      disabled={actionLoading}
                                      onClick={() => {
                                        handleResumeVerification(resume.id);
                                      }}
                                    >
                                      {actionLoading
                                        ? "Verifying..."
                                        : "Verify"}
                                    </Button>
                                  ) : (
                                    <span
                                      style={{
                                        color: "green",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      ✓ Verified
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          : "N/A"}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Penalties
                  </Typography>
                  <TableContainer component={Paper} elevation={3}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Penalty
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Reason
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {studentData.penalties
                          ? studentData.penalties.map((penalty) => (
                              <TableRow key={penalty.id}>
                                <TableCell>{penalty.penalty}</TableCell>
                                <TableCell>{penalty.reason}</TableCell>
                              </TableRow>
                            ))
                          : "N/A"}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Active Seasons
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{ mb: 4 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Year
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Type
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {activeSeasons
                          ? activeSeasons.map((season) => (
                              <TableRow key={season.id}>
                                <TableCell>{season.year}</TableCell>
                                <TableCell>{season.type}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={actionLoading}
                                    onClick={() =>
                                      createRegistration(
                                        studentData.id,
                                        season.id,
                                        true,
                                      )
                                    }
                                  >
                                    {actionLoading
                                      ? "Creating..."
                                      : "Create Registration"}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          : "N/A"}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Registration
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={3}
                    sx={{ mb: 2 }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Year
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Type
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Status
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Actions
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Delete Registration
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {registrationData
                          ? registrationData.map((registration) => (
                              <TableRow key={registration.id}>
                                <TableCell>
                                  {registration.season.year}
                                </TableCell>
                                <TableCell>
                                  {registration.season.type}
                                </TableCell>
                                <TableCell>
                                  {registration.registered
                                    ? "Registered"
                                    : "Not Registered"}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color={
                                      registration.registered
                                        ? "secondary"
                                        : "primary"
                                    }
                                    disabled={actionLoading}
                                    onClick={() =>
                                      handleStatusChange(
                                        studentData.id,
                                        registration.season.id,
                                        registration.registered,
                                      )
                                    }
                                  >
                                    {actionLoading
                                      ? "Processing..."
                                      : registration.registered
                                        ? "Deregister"
                                        : "Register"}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    disabled={actionLoading}
                                    onClick={() =>
                                      handleDebar(
                                        registration.id,
                                        registration.season.id,
                                      )
                                    }
                                  >
                                    {actionLoading ? "Processing..." : "Debar"}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          : "N/A"}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {editMode && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" component="h4" gutterBottom>
                        Edit Student Data
                      </Typography>
                      <TableContainer component={Paper} elevation={3}>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Roll No
                              </TableCell>
                              <TableCell>
                                <input
                                  type="text"
                                  value={editData.rollNo}
                                  onChange={(e) =>
                                    handleEditChange("rollNo", e.target.value)
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Category
                              </TableCell>
                              <TableCell>
                                <select
                                  value={editData.category}
                                  onChange={(e) =>
                                    handleEditChange("category", e.target.value)
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                >
                                  <option value="GENERAL">General</option>
                                  <option value="OBC">OBC</option>
                                  <option value="SC">SC</option>
                                  <option value="ST">ST</option>
                                </select>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Gender
                              </TableCell>
                              <TableCell>
                                <select
                                  value={editData.gender}
                                  onChange={(e) =>
                                    handleEditChange("gender", e.target.value)
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                >
                                  <option value="MALE">Male</option>
                                  <option value="FEMALE">Female</option>
                                  <option value="OTHER">Other</option>
                                </select>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                CPI
                              </TableCell>
                              <TableCell>
                                <input
                                  type="number"
                                  value={editData.cpi}
                                  onChange={(e) =>
                                    handleEditChange("cpi", e.target.value)
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                10th Marks
                              </TableCell>
                              <TableCell>
                                <input
                                  type="number"
                                  value={editData.tenthMarks}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "tenthMarks",
                                      e.target.value,
                                    )
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                12th Marks
                              </TableCell>
                              <TableCell>
                                <input
                                  type="number"
                                  value={editData.twelthMarks}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "twelthMarks",
                                      e.target.value,
                                    )
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Backlog
                              </TableCell>
                              <TableCell>
                                <input
                                  type="number"
                                  value={editData.backlog || ""}
                                  onChange={(e) =>
                                    handleEditChange("backlog", e.target.value)
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Name
                              </TableCell>
                              <TableCell>
                                <input
                                  type="text"
                                  value={editData.user.name}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "name",
                                      e.target.value,
                                      "user",
                                    )
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Email
                              </TableCell>
                              <TableCell>
                                <input
                                  type="email"
                                  value={editData.user.email}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "email",
                                      e.target.value,
                                      "user",
                                    )
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                component="th"
                                scope="row"
                                sx={{ fontWeight: "bold" }}
                              >
                                Contact
                              </TableCell>
                              <TableCell>
                                <input
                                  type="text"
                                  value={editData.user.contact}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "contact",
                                      e.target.value,
                                      "user",
                                    )
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

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
  fetchPrograms,
  fetchSeasonDataById,
  postRegistration,
  debarStudent,
  getResumeFile,
  patchResumeVerify,
  patchStudentData,
  fetchStudentOffers,
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
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  // Cascading program selection (Year -> Course -> Branch)
  const [programsData, setProgramsData] = useState({
    programs: [],
    coursesMap: new Map(),
    branchesMap: new Map(),
  });
  const [years, setYears] = useState([]);
  const [courses, setCourses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

  const toggleYearExpanded = (year: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const toggleCourseExpanded = (year: string, course: string) => {
    const key = `${year}-${course}`;
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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

  const fetchOffersData = async (studentId: any) => {
    setLoading(true);
    try {
      const data = await fetchStudentOffers(studentId);
      setOffers(data);
    } catch (error) {
      toast.error("Error fetching offers data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && id) {
      fetchStudentData(id);
      fetchRegistrationData(id);
      fetchActiveSeasonsData(id);
      fetchOffersData(id);
      setEditMode(false);
      setEditData(null);
    }
  }, [open, id]);

  // Load programs for cascading selection when modal opens
  useEffect(() => {
    if (!open) return;
    (async () => {
      try {
        const data = await fetchPrograms();
        const programs = (data || []).map((p: any) => ({
          id: p.id,
          year: String(p.year),
          course: String(p.course),
          branch: String(p.branch),
        }));
        const uniqueYears = new Set<string>();
        const coursesMap = new Map<string, Set<string>>();
        const branchesMap = new Map<string, Set<string>>();
        programs.forEach((p: any) => {
          uniqueYears.add(p.year);
          if (!coursesMap.has(p.year)) coursesMap.set(p.year, new Set());
          coursesMap.get(p.year)?.add(p.course);
          const key = `${p.year}-${p.course}`;
          if (!branchesMap.has(key)) branchesMap.set(key, new Set());
          branchesMap.get(key)?.add(p.branch);
        });
        setProgramsData({ programs, coursesMap, branchesMap });
        setYears(Array.from(uniqueYears));
      } catch (_) {
        // noop
      }
    })();
  }, [open]);

  // Initialize cascading selection when entering edit mode
  useEffect(() => {
    if (!editMode || !studentData || programsData.programs.length === 0) return;
    const current = (studentData as any).program;
    if (current) {
      const year = String(current.year || "");
      const course = String(current.course || "");
      const branch = String(current.branch || "");
      setSelectedYear(year);
      const yearCourses = Array.from((programsData.coursesMap as any).get(year) || []);
      setCourses(yearCourses as any);
      setSelectedCourse(course);
      const key = `${year}-${course}`;
      const yearCourseBranches = Array.from((programsData.branchesMap as any).get(key) || []);
      setBranches(yearCourseBranches as any);
      setSelectedBranch(branch);
    }
  }, [editMode, studentData, programsData]);

  const updateSelectedProgramInEditData = (
    year: string,
    course: string,
    branch: string,
  ) => {
    const program = (programsData.programs as any).find(
      (p: any) => p.year === year && p.course === course && p.branch === branch,
    );
    if (program) {
      setEditData((prev: any) => ({
        ...prev,
        program: { ...(prev?.program || {}), id: program.id, year, course, branch },
      }));
    }
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    const newCourses = Array.from((programsData.coursesMap as any).get(year) || []);
    setCourses(newCourses as any);
    const nextCourse = (newCourses as any).includes(selectedCourse) ? selectedCourse : (newCourses as any)[0] || "";
    setSelectedCourse(nextCourse);
    const key = `${year}-${nextCourse}`;
    const newBranches = Array.from((programsData.branchesMap as any).get(key) || []);
    setBranches(newBranches as any);
    const nextBranch = (newBranches as any).includes(selectedBranch) ? selectedBranch : (newBranches as any)[0] || "";
    setSelectedBranch(nextBranch);
    if (year && nextCourse && nextBranch) updateSelectedProgramInEditData(year, nextCourse, nextBranch);
  };

  const handleCourseChange = (course: string) => {
    setSelectedCourse(course);
    const key = `${selectedYear}-${course}`;
    const newBranches = Array.from((programsData.branchesMap as any).get(key) || []);
    setBranches(newBranches as any);
    const nextBranch = (newBranches as any).includes(selectedBranch) ? selectedBranch : (newBranches as any)[0] || "";
    setSelectedBranch(nextBranch);
    if (selectedYear && course && nextBranch) updateSelectedProgramInEditData(selectedYear, course, nextBranch);
  };

  const handleBranchChange = (branch: string) => {
    setSelectedBranch(branch);
    if (selectedYear && selectedCourse && branch) updateSelectedProgramInEditData(selectedYear, selectedCourse, branch);
  };

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
        // Refresh student data from server instead of updating local state
        await fetchStudentData(id);
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
                        {/* Backlog */}
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Backlog
                          </TableCell>
                          <TableCell>
                            {editMode ? (
                              <select
                                value={editData.backlog || "NEVER"}
                                onChange={(e) =>
                                  handleEditChange("backlog", e.target.value)
                                }
                                style={{ width: "100%" }}
                              >
                                <option value="NEVER">NEVER</option>
                                <option value="PREVIOUS">PREVIOUS</option>
                                <option value="ACTIVE">ACTIVE</option>
                              </select>
                            ) : (
                              studentData.backlog || "N/A"
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
                              <div style={{ border: "1px solid #e5e7eb", borderRadius: 6 }}>
                                <div style={{ padding: "8px 12px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                                  <span style={{ fontWeight: 600, color: "#374151" }}>Program Selection (Based on Course Completion Year)</span>
                                </div>
                                <div style={{ padding: 8 }}>
                                  {(years as any).map((year: string) => (
                                    <div key={year} style={{ borderBottom: "1px solid #f3f4f6" }}>
                                      <div style={{ padding: "8px 12px", background: "#ffffff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                          <button
                                            type="button"
                                            onClick={() => toggleYearExpanded(year)}
                                            style={{ minWidth: 20, height: 20, padding: 0, fontSize: 10, color: "#6b7280", background: "transparent", border: "none" }}
                                            aria-label="Toggle Year"
                                          >
                                            {expandedYears.has(year) ? "▼" : "▶"}
                                          </button>
                                          <span style={{ fontWeight: 600, fontSize: 14 }}>{year} Batch</span>
                                        </div>
                                      </div>
                                      {expandedYears.has(year) && (
                                        <div style={{ paddingLeft: 32, background: "#fafbfc" }}>
                                          {Array.from((programsData.coursesMap as any).get(year) || []).map((course: string) => (
                                            <div key={`${year}-${course}`}>
                                              <div style={{ padding: "6px 12px", background: "#ffffff", margin: "2px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                  <button
                                                    type="button"
                                                    onClick={() => toggleCourseExpanded(year, course)}
                                                    style={{ minWidth: 16, height: 16, padding: 0, fontSize: 8, color: "#6b7280", background: "transparent", border: "none" }}
                                                    aria-label="Toggle Course"
                                                  >
                                                    {expandedCourses.has(`${year}-${course}`) ? "▼" : "▶"}
                                                  </button>
                                                  <span style={{ fontWeight: 500, fontSize: 13 }}>{course}</span>
                                                </div>
                                              </div>
                                              {expandedCourses.has(`${year}-${course}`) && (
                                                <div style={{ paddingLeft: 24, marginBottom: 4 }}>
                                                  {Array.from((programsData.branchesMap as any).get(`${year}-${course}`) || []).map((branch: string) => (
                                                    <label
                                                      key={`${year}-${course}-${branch}`}
                                                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", background: selectedYear === year && selectedCourse === course && selectedBranch === branch ? "#f0fdf4" : "#ffffff", margin: "1px 0", borderRadius: 4 }}
                                                    >
                                                      <input
                                                        type="radio"
                                                        name="single-branch"
                                                        value={branch}
                                                        checked={selectedYear === year && selectedCourse === course && selectedBranch === branch}
                                                        onChange={() => {
                                                          setSelectedYear(year);
                                                          setSelectedCourse(course);
                                                          handleBranchChange(branch);
                                                        }}
                                                      />
                                                      <span style={{ fontSize: 12 }}>{branch}</span>
                                                    </label>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : studentData.program ? (
                              studentData.program.branch
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                        </TableRow>
                        {/* Course */}
                        {!editMode && (
                          <TableRow>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontWeight: "bold" }}
                            >
                              Course
                            </TableCell>
                            <TableCell>
                              {studentData.program ? studentData.program.course : "N/A"}
                            </TableCell>
                          </TableRow>
                        )}
                        {/* Year */}
                        {!editMode && (
                          <TableRow>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontWeight: "bold" }}
                            >
                              Year
                            </TableCell>
                            <TableCell>
                              {studentData.program ? studentData.program.year : "N/A"}
                            </TableCell>
                          </TableRow>
                        )}
                        {/* Department */}
                        {!editMode && (
                          <TableRow>
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontWeight: "bold" }}
                            >
                              Department
                            </TableCell>
                            <TableCell>
                              {studentData.program ? studentData.program.department : "N/A"}
                            </TableCell>
                          </TableRow>
                        )}
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
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Offers
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
                            Company
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Role
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Package (CTC)
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {offers && offers.length > 0 ? (
                          offers.map((offer) => (
                            <TableRow key={offer.id}>
                              <TableCell>
                                {offer.salary?.job?.company?.name || "N/A"}
                              </TableCell>
                              <TableCell>
                                {offer.salary?.job?.role || "N/A"}
                              </TableCell>
                              <TableCell>
                                ₹
                                {offer.salary?.totalCTC?.toLocaleString() ||
                                  "N/A"}
                              </TableCell>
                              <TableCell>
                                <span
                                  style={{
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    backgroundColor:
                                      offer.status === "ACCEPTED"
                                        ? "#d4edda"
                                        : offer.status === "PENDING"
                                          ? "#fff3cd"
                                          : offer.status === "REJECTED"
                                            ? "#f8d7da"
                                            : "#e2e3e5",
                                    color:
                                      offer.status === "ACCEPTED"
                                        ? "#155724"
                                        : offer.status === "PENDING"
                                          ? "#856404"
                                          : offer.status === "REJECTED"
                                            ? "#721c24"
                                            : "#383d41",
                                  }}
                                >
                                  {offer.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              No offers available
                            </TableCell>
                          </TableRow>
                        )}
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
                                <select
                                  value={editData.backlog || "NEVER"}
                                  onChange={(e) =>
                                    handleEditChange("backlog", e.target.value)
                                  }
                                  disabled={actionLoading}
                                  style={{ width: "100%" }}
                                >
                                  <option value="NEVER">NEVER</option>
                                  <option value="PREVIOUS">PREVIOUS</option>
                                  <option value="ACTIVE">ACTIVE</option>
                                </select>
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

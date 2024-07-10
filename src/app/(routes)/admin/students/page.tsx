"use client";
import { useState, useEffect } from 'react';
import { fetchStudentData, deregisterStudent, registerStudents, fetchSeasonData } from "@/helpers/api";
import Cookies from "js-cookie";
import Table from "@/components/NewTableComponent/Table";
import type { DTO } from '@/dto/StudentDto';
import { createMRTColumnHelper } from 'material-react-table';
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { jsondto } from "@/dto/StudentDto";
import { Form } from 'antd';
import { cookies } from 'next/headers';
const hiddenColumns = ['userId', 'programId'];

const StudentPage = () => {
  const [students, setStudents] = useState<DTO[]>([]);
  const [showForm, setShowForm] = useState(false);
  const columnHelper = createMRTColumnHelper<DTO>();
  const columns = generateColumns(jsondto);



  // Add the deregister column to the columns array


  // Filter out the hidden columns
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey)
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentData(Cookies.get("accessToken"), null);
      setStudents(data);
      console.log(data);
    };
   const fetchSeason= async () => {
      const data = await fetchSeasonData(Cookies.get("accessToken"), null);
      console.log(data);
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (values: any) => {
    try {
      await registerStudents(Cookies.get("accessToken"), [values]);
      // Refresh the student data after successful registration
      const data = await fetchStudentData(Cookies.get("accessToken"), null);
      setStudents(data);
      setShowForm(false); // Hide the form after successful submission
    } catch (error) {
      console.error("Failed to register student", error);
    }
  };

  const DummyRegisterButton = ({ accessToken }) => {
    const handleRegister = async () => {
      const dummyStudents = [
        {
          id: "5c6c11eb-f8c9-40c4-9ddd-a3b7c33e62a2", // Ensure this is a UUID
          seasonId: "db7e95bf-5722-45f0-9854-46ad59a1e16f" // Ensure this is a UUID
        },
        {
          id: "96608894-686e-4a5d-ab5b-f26dfb1f6b1e", // Ensure this is a UUID
          seasonId: "db7e95bf-5722-45f0-9854-46ad59a1e16f" // Ensure this is a UUID
        }
      ];
  
      try {
        await registerStudents(accessToken, dummyStudents);
        alert('Registration successful!');
      } catch (error) {
        console.error("Error registering students:", error);
        alert('Registration failed.');
      }
    };
  
    return (
      <button onClick={handleRegister}>Register Dummy Data</button>
    );
  };
  

  return (
    <div className="m-10">
      <h1 className="text-center font-bold text-3xl my-5 py-5">Students</h1>
     <DummyRegisterButton accessToken={Cookies.get("accessToken")}></DummyRegisterButton>
    {/* <StudentRegistrationForm accessToken={Cookies.get("accessToken")} /> */}
      <div>
        {students.length > 0 && (
          <Table
            data={students}
            columns={visibleColumns}
            type={"student"}
          />
        )}
      </div>
    </div>
  );
};

export default StudentPage;

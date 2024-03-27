"use client";
import React from "react";

interface Props {}

const StudentPage = ({
    params,
}: {
    params: {
        studentId: String;
    };
}) => {
    return (
        <div>
            <h1>Student Page</h1>
            <p>Student ID: {params.studentId}</p>
        </div>
    );
};

export default StudentPage;

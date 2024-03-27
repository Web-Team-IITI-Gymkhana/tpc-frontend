"use client";
import React from "react";

interface Props {}

const RecruiterPage = ({
    params,
}: {
    params: {
        recruiterId: String;
    };
}) => {
    return (
        <div>
            <h1>Recruiter Page</h1>
            <p>Recruiter ID: {params.recruiterId}</p>
        </div>
    );
};

export default RecruiterPage;

"use client";
import React from "react";
import JAF from "@/components/JAF/JAF";

interface Props {}

const JAFPage = ({
  params,
}: {
  params: {
    recruiterId: String;
  };
}) => {
  return (
    <>
      <JAF />
    </>
  );
};

export default JAFPage;

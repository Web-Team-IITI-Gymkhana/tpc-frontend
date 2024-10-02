import { ClashesFC } from "@/dto/Clashes";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TableComponent from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { Button } from "@/components/ui/button";
import ClashModal from "./ClashModal";

const eventColumns = [
  {
    viewEvent: "View",
    name: "string",
    email: "string",
    course: "string",
    branch: "string",
    department: "Astronomy, Astrophysics and Space Engineering",
    year: "string",
    startDateTime: "2024-10-02T06:50:14.371Z",
    cstartDateTime: "2024-10-02T06:50:14.371Z",
    endDateTime: "2024-10-02T06:50:14.371Z",
    cendDateTime: "2024-10-02T06:50:14.371Z",
    rollNo: "string",
    gender: "MALE",
  },
];

const Clashes = ({ clashes }: { clashes: ClashesFC }) => {
  const [selectedClash, setSelectedClash] = useState<any>(null);

  const formatClashes = (clashesEvent: any) => {
    return clashesEvent.map((clash) => ({
      ...clash,
      startDateTime: new Date(clash.startDateTime).toLocaleString(),
      cstartDateTime: new Date(clash.cstartDateTime).toLocaleString(),
      endDateTime: new Date(clash.endDateTime).toLocaleString(),
      cendDateTime: new Date(clash.cendDateTime).toLocaleString(),
      viewEvent: (
        <Button
          onClick={() => {
            setSelectedClash(clash);
          }}
        >
          View Event
        </Button>
      ),
    }));
  };

  const onViewClash = async (event: any) => {
    setSelectedClash(event);
  };

  const onCloseModal = () => {
    setSelectedClash(null);
  };

  const formattedClashes = {
    event: formatClashes(clashes.event),
    onCampus: formatClashes(clashes.onCampus),
    offCampus: formatClashes(clashes.offCampus),
  };

  return (
    <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
      <Modal
        open={selectedClash}
        onClose={onCloseModal}
        aria-labelledby="Event Details"
        aria-describedby="Event Details"
        className="flex justify-center items-center"
      >
        <ClashModal event={selectedClash} />
      </Modal>

      <div className="font-semibold text-lg mb-4">Clashes</div>
      <div>
        <h4 className="font-semibold text-lg mb-4">Events</h4>
        <TableComponent
          columns={generateColumns(eventColumns)}
          data={formattedClashes.event}
          type="clash"
        />
        <h4 className="font-semibold text-lg mb-4">On Campus</h4>
        <TableComponent
          columns={generateColumns(eventColumns)}
          data={formattedClashes.onCampus}
          type="clash"
        />
        <h4 className="font-semibold text-lg mb-4">Off Campus</h4>
        <TableComponent
          columns={generateColumns(eventColumns)}
          data={formattedClashes.offCampus}
          type="clash"
        />
      </div>
    </div>
  );
};

export default Clashes;

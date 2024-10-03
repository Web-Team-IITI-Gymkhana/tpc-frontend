import { ClashesFC } from "@/dto/Clashes";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TableComponent from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { Button } from "@/components/ui/button";
import { EventModal, OffCampusModal, OnCampusModal } from "./ClashModal";

const eventColumns = [
  {
    viewMore: "View",
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
  const [modalType, setModalType] = useState<string>("");

  const formatClashes = (clashesEvent: any, modalType: string) => {
    return clashesEvent.map((clash) => ({
      ...clash,
      startDateTime: new Date(clash.startDateTime).toLocaleString(),
      cstartDateTime: new Date(clash.cstartDateTime).toLocaleString(),
      endDateTime: new Date(clash.endDateTime).toLocaleString(),
      cendDateTime: new Date(clash.cendDateTime).toLocaleString(),
      viewMore: (
        <Button
          onClick={() => {
            setSelectedClash(clash);
            setModalType(modalType);
          }}
        >
          View More
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
    event: formatClashes(clashes.event, "event"),
    onCampus: formatClashes(clashes.onCampus, "onCampus"),
    offCampus: formatClashes(clashes.offCampus, "offCampus"),
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
        <>
          {modalType === "event" && <EventModal event={selectedClash} />}
          {modalType === "onCampus" && (
            <OnCampusModal onCampusEvent={selectedClash} />
          )}
          {modalType === "offCampus" && (
            <OffCampusModal offCampusEvent={selectedClash} />
          )}
        </>
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

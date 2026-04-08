import { ClashesFC, Event, OffCampus, OnCampus } from "@/dto/Clashes";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import TableComponent from "@/components/NewTableComponent/Table";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { Button } from "@/components/ui/button";
import { EventModal, OffCampusModal, OnCampusModal } from "./ClashModal";

type ClashDateFields = {
  startDateTime?: string;
  cstartDateTime?: string;
  endDateTime?: string;
  cendDateTime?: string;
};

type ClashModalType = "event" | "onCampus" | "offCampus";
type ClashModalData = Event | OnCampus | OffCampus;

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
  const [selectedClash, setSelectedClash] = useState<ClashModalData | null>(
    null,
  );
  const [modalType, setModalType] = useState<ClashModalType | "">("");

  const toDisplayDate = (value?: string) => {
    if (!value) return "N/A";

    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleString();
  };

  const formatClashes = <T extends ClashModalData & ClashDateFields>(
    clashesEvent: T[],
    currentModalType: ClashModalType,
  ) => {
    const safeClashes = Array.isArray(clashesEvent) ? clashesEvent : [];

    return safeClashes.map((clash) => ({
      ...clash,
      startDateTime: toDisplayDate(clash.startDateTime),
      cstartDateTime: toDisplayDate(clash.cstartDateTime),
      endDateTime: toDisplayDate(clash.endDateTime),
      cendDateTime: toDisplayDate(clash.cendDateTime),
      viewMore: (
        <Button
          onClick={() => {
            setSelectedClash(clash);
            setModalType(currentModalType);
          }}
        >
          View More
        </Button>
      ),
    }));
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
        open={Boolean(selectedClash)}
        onClose={onCloseModal}
        aria-labelledby="Event Details"
        aria-describedby="Event Details"
        className="flex justify-center items-center"
      >
        <>
          {modalType === "event" &&
            selectedClash &&
            "ceventId" in selectedClash && (
              <EventModal event={selectedClash} />
            )}
          {modalType === "onCampus" && selectedClash && "baseSalary" in selectedClash && (
            <OnCampusModal onCampusEvent={selectedClash} />
          )}
          {modalType === "offCampus" && selectedClash && "salary" in selectedClash && (
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

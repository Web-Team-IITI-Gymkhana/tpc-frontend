import React from "react";
import { Event, OffCampus, OnCampus } from "@/dto/Clashes";

interface EventModalProps {
  event: Event;
}

const EventModal: React.FC<EventModalProps> = ({ event }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <div className="w-max h-max bg-[#ffffff] p-8 rounded-xl">
      <h2 className="text-black mb-4">Event </h2>
      <table className="table-auto text-left text-black w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Detail</th>
            <th className="px-4 py-2">Current Event</th>
            <th className="px-4 py-2">Clashing Event</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Event ID</td>
            <td className="border px-4 py-2">{event.eventId}</td>
            <td className="border px-4 py-2">{event.ceventId}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Start DateTime</td>
            <td className="border px-4 py-2">
              {formatDateTime(event.startDateTime)}
            </td>
            <td className="border px-4 py-2">
              {formatDateTime(event.cstartDateTime)}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">End DateTime</td>
            <td className="border px-4 py-2">
              {formatDateTime(event.endDateTime)}
            </td>
            <td className="border px-4 py-2">
              {formatDateTime(event.cendDateTime)}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-black mb-2">Additional Event Details</h3>
      <div className="text-black">
        <p>
          <strong>Type:</strong> {event.type}
        </p>
        <p>
          <strong>Round Number:</strong> {event.roundNumber}
        </p>
        <p>
          <strong>Student Name:</strong> {event.name}
        </p>
        <p>
          <strong>Email:</strong> {event.email}
        </p>
        <p>
          <strong>Roll No:</strong> {event.rollNo}
        </p>
      </div>
    </div>
  );
};

interface OnCampusModalProps {
  onCampusEvent: OnCampus;
}

const OnCampusModal: React.FC<OnCampusModalProps> = ({ onCampusEvent }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <div className="w-max h-max bg-[#ffffff] p-8 rounded-xl">
      <h2 className="text-black mb-4">OnCampus Event </h2>
      <table className="table-auto text-left text-black w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Detail</th>
            <th className="px-4 py-2">Current OnCampus Event</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Event ID</td>
            <td className="border px-4 py-2">{onCampusEvent.eventId}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Start DateTime</td>
            <td className="border px-4 py-2">
              {formatDateTime(onCampusEvent.startDateTime)}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">End DateTime</td>
            <td className="border px-4 py-2">
              {formatDateTime(onCampusEvent.endDateTime)}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-black mb-2">Additional OnCampus Event Details</h3>
      <div className="text-black">
        <p>
          <strong>Student Name:</strong> {onCampusEvent.name}
        </p>
        <p>
          <strong>Email:</strong> {onCampusEvent.email}
        </p>
        <p>
          <strong>Roll No:</strong> {onCampusEvent.rollNo}
        </p>
        <p>
          <strong>Course:</strong> {onCampusEvent.course}
        </p>
      </div>
    </div>
  );
};

interface OffCampusModalProps {
  offCampusEvent: OffCampus;
}

const OffCampusModal: React.FC<OffCampusModalProps> = ({ offCampusEvent }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <div className="w-max h-max bg-[#ffffff] p-8 rounded-xl">
      <h2 className="text-black mb-4">OffCampus Event </h2>
      <table className="table-auto text-left text-black w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Detail</th>
            <th className="px-4 py-2">Current OffCampus Event</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Event ID</td>
            <td className="border px-4 py-2">{offCampusEvent.eventId}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Start DateTime</td>
            <td className="border px-4 py-2">
              {formatDateTime(offCampusEvent.startDateTime)}
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">End DateTime</td>
            <td className="border px-4 py-2">
              {formatDateTime(offCampusEvent.endDateTime)}
            </td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-black mb-2">Additional OffCampus Event Details</h3>
      <div className="text-black">
        <p>
          <strong>Company Name:</strong> {offCampusEvent.companyName}
        </p>
        <p>
          <strong>Role:</strong> {offCampusEvent.role}
        </p>
        <p>
          <strong>Salary:</strong> {offCampusEvent.salary}
        </p>
        <p>
          <strong>Student Name:</strong> {offCampusEvent.name}
        </p>
        <p>
          <strong>Email:</strong> {offCampusEvent.email}
        </p>
        <p>
          <strong>Roll No:</strong> {offCampusEvent.rollNo}
        </p>
      </div>
    </div>
  );
};

export { EventModal, OnCampusModal, OffCampusModal };

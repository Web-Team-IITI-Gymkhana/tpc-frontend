import React from "react";
import { Event } from "@/dto/Clashes";

interface ClashModalProps {
  event: Event;
}

const ClashModal: React.FC<ClashModalProps> = ({ event }) => {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString();
  };

  return (
    <div className="w-max h-max bg-[#ffffff] p-8 rounded-xl">
      <h2 className="text-black mb-4">Event Comparison</h2>
      <table className="table-auto text-left text-black w-full">
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
          <tr>
            <td className="border px-4 py-2">Round Number</td>
            <td className="border px-4 py-2">{event.roundNumber}</td>
            <td className="border px-4 py-2">{event.croundNumber}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Type</td>
            <td className="border px-4 py-2">{event.type}</td>
            <td className="border px-4 py-2">{event.ctype}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClashModal;

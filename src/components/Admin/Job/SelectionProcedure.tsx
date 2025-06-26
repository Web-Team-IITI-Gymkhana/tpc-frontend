import React from "react";

const SelectionProcedure = ({ selectionProcedure, editMode, handleChange }) => (
  <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
    <div className="font-semibold text-lg mb-4">Selection Procedure</div>
    <div className="flex md:flex-row flex-col justify-between mb-6">
      <div>
        <div className="font-semibold my-2">Selection mode</div>
        {editMode ? (
          <select
            value={selectionProcedure.selectionMode}
            onChange={(e) => handleChange(e, "selectionMode")}
          >
            <option>ONLINE</option>
            <option>OFFLINE</option>
            <option>HYBRID</option>
          </select>
        ) : (
          <div>{selectionProcedure.selectionMode}</div>
        )}
      </div>
      <div>
        <div className="font-semibold my-2">Shortlist from Resume</div>
        {editMode ? (
          <input
            type="checkbox"
            name="shortlistFromResume"
            checked={selectionProcedure.shortlistFromResume}
            onChange={(e) => handleChange(e, "shortlistFromResume")}
          />
        ) : (
          <div>{selectionProcedure.shortlistFromResume ? "YES" : "NO"}</div>
        )}
      </div>
      <div>
        <div className="font-semibold my-2">Group Discussion</div>
        {editMode ? (
          <input
            type="checkbox"
            name="groupDiscussion"
            checked={selectionProcedure.groupDiscussion}
            onChange={(e) => handleChange(e, "groupDiscussion")}
          />
        ) : (
          <div>{selectionProcedure.groupDiscussion ? "YES" : "NO"}</div>
        )}
      </div>
      <div>
        <div className="font-semibold my-2">Number of members</div>
        {editMode ? (
          <input
            type="number"
            name="numberOfMembers"
            value={selectionProcedure.requirements?.numberOfMembers || ''}
            onChange={(e) => handleChange(e, "numberOfMembers")}
          />
        ) : (
          <div>{selectionProcedure.requirements?.numberOfMembers || 'Not specified'}</div>
        )}
      </div>
    </div>
    <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start md:items-stretch">
      <div className="bg-gray-200 p-8 rounded-lg">
        <div className="font-semibold bg-gray-200">Tests</div>
        <ul className="list-disc capitalize">
          {selectionProcedure.tests.map((test, index) => (
            <li key={index} className="my-2">
              Test Type: {test.type}
              <br />
              Test Duration: {test.duration}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-200 p-8 rounded-lg">
        <div className="font-semibold bg-gray-200">Interviews</div>
        <ul className="list-disc capitalize">
          {selectionProcedure.interviews.map((interview, index) => (
            <li key={index} className="my-2">
              Interview Type: {interview.type}
              <br />
              Interview Duration: {interview.duration}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-8">
      <div>
        <span className="font-semibold">Other requirements: </span>
        {editMode ? (
          <input
            type="text"
            name="otherRequirements"
            value={selectionProcedure.requirements?.otherRequirements || ''}
            onChange={(e) => handleChange(e, "otherRequirements")}
          />
        ) : (
          <div>{selectionProcedure.requirements?.otherRequirements || 'Not specified'}</div>
        )}
      </div>
      {selectionProcedure.requirements?.numberOfRooms && (
        <div className="mt-4">
          <span className="font-semibold">Number of rooms: </span>
          {editMode ? (
            <input
              type="number"
              name="numberOfRooms"
              value={selectionProcedure.requirements?.numberOfRooms || ''}
              onChange={(e) => handleChange(e, "numberOfRooms")}
            />
          ) : (
            <div>{selectionProcedure.requirements?.numberOfRooms}</div>
          )}
        </div>
      )}
      {selectionProcedure.others && (
        <div className="mt-4">
          <span className="font-semibold">Other notes: </span>
          {editMode ? (
            <textarea
              name="others"
              value={selectionProcedure.others || ''}
              onChange={(e) => handleChange(e, "others")}
              className="w-full p-2 border rounded"
            />
          ) : (
            <div>{selectionProcedure.others}</div>
          )}
        </div>
      )}
    </div>
  </div>
);

export default SelectionProcedure;

import React, { useState } from "react";
import { JobDetailFC } from "@/helpers/recruiter/types";
import Select from "react-select";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { patchJobData, patchSalaryData } from "@/helpers/api";

const currentStatusOptions = [
  "INITIALIZED",
  "SCHEDULED",
  "PPT_DONE",
  "POLL_FREEZED",
  "TEST_COMPLETED",
  "INTERVIEW_COMPLETED",
  "RECRUITMENT_PROCESS_COMPLELETED",
  "OFFER_LETTER_RELEASED",
  "PROCESS_ON_HOLD",
  "PROCESS_TERMINATED",
  "OFFER_REVOKED",
];

const JobHeader = ({ job, formData, setFormData, editMode, setEditMode }) => {
  const [saving, setSaving] = useState(false);
  const newCurrentStatusOptions = currentStatusOptions.map((option) => ({
    value: option,
    label: option,
  }));

  const handleEditClick = async () => {
    if (editMode) {
      setSaving(true);
      try {
        await handleSubmit();
      } finally {
        setSaving(false);
      }
    }
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await patchJobData(job.id, formData);
    formData.salaries.map((salary, index) => patchSalaryData(salary));
    setEditMode(false);
    window.location.reload();
  };

  return (
    <div className="bg-white p-4 px-8 rounded-lg border-gray-300 hover:border-blue-200 border-2">
      <div className="flex md:flex-row flex-col justify-between leading-8">
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Role </span>
          {editMode ? (
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          ) : (
            <span>{job.role}</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Activity </span>
          {editMode ? (
            <input
              type="checkbox"
              name="activity"
              value={formData.active}
              onChange={(e) => {
                setFormData((form) => ({
                  ...form,
                  active: e.target.checked,
                }));
              }}
            />
          ) : (
            <span>{job.active ? "Active" : "Inactive"}</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Registration Status </span>
          {editMode ? (
            <input
              defaultChecked={job.registration === "OPEN" ? true : false}
              type="checkbox"
              name="registration"
              value={formData.registration}
              onChange={(e) => {
                setFormData((form) => ({
                  ...form,
                  registration: e.target.checked ? "OPEN" : "CLOSED",
                }));
              }}
            />
          ) : (
            <span>{job.registration === "OPEN" ? "Open" : "Closed"}</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">Current Status </span>
          {editMode ? (
            <Select
              options={newCurrentStatusOptions}
              value={{
                value: formData.currentStatus,
                label: formData.currentStatus,
              }}
              onChange={(value) => {
                setFormData((form) => ({
                  ...formData,
                  currentStatus: value.value,
                }));
              }}
            />
          ) : (
            <span>{job.currentStatus}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href={`/admin/jobs/events/${job.id}`}
            className="flex flex-col gap-4"
          >
            <Button variant="default">Events and Applications</Button>
          </Link>
          {!job.active && (
            <Button onClick={handleEditClick} disabled={saving}>
              {saving ? "Saving..." : editMode ? "Save Application" : "Edit Application"}
            </Button>
          )}
        </div>
      </div>

      <div>
        <div className="font-semibold text-lg my-4">Skills</div>
        <div className="flex flex-wrap gap-4">
          {editMode ? (
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
          ) : (
            job.skills
          )}
        </div>
        <div className="flex md:flex-row flex-col flex-wrap bg-gray-200 rounded-lg justify-between py-4 px-6 my-3">
          <div>
            <div className="font-semibold my-2">Location</div>{" "}
            {editMode ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            ) : (
              <div>{job.location}</div>
            )}
          </div>
          <div>
            <div className="font-semibold my-2">Offer letter release</div>{" "}
            {editMode ? (
              <input
                type="date"
                name="offerLetterReleaseDate"
                value={formData.offerLetterReleaseDate}
                onChange={handleChange}
              />
            ) : (
              <div>{new Date(job.offerLetterReleaseDate).toLocaleString()}</div>
            )}
          </div>
          <div>
            <div className="font-semibold my-2">Joining Date</div>{" "}
            {editMode ? (
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
              />
            ) : (
              <div>{new Date(job.joiningDate).toLocaleString()}</div>
            )}
          </div>
          <div>
            <div className="font-semibold my-2">Duration</div>{" "}
            {editMode ? (
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            ) : (
              <div>{job.duration}</div>
            )}
          </div>
          <div>
            <div className="font-semibold my-2">Attachment</div>{" "}
            {editMode ? (
              <input
                type="text"
                name="attachment"
                value={formData.attachment}
                onChange={handleChange}
              />
            ) : (
              <div>{job.attachment}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;

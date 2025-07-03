"use client";
import React from "react";
import { useState, useEffect } from "react";
import { SeasonFC, ApplicationFC } from "@/helpers/season/types";
import { CircularProgress, Modal, Typography } from "@mui/material";
import { seasonDTO } from "@/dto/SeasonDto";
import { fetchSeasonData } from "@/helpers/api";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Select from "react-select";
import Table from "../NewTableComponent/Table";
import generateColumns from "../NewTableComponent/ColumnMapping";
import {
  addSeason,
  activateSeason,
  getSeasonPolicyDocumentAdmin,
} from "@/helpers/api";

const hiddenColumns = [
  "id",
  "registered",
  "season.id",
  "student.id",
  "student.program.id",
  "student.user.id",
];
const typeOptions = ["INTERN", "PLACEMENT"];

const options = typeOptions.map((option) => ({
  value: option,
  label: option,
}));

export const AddSeason = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [formValues, setFormValues] = useState({
    year: "",
    type: "",
    policy: null as File | null,
  });

  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Validate file size (10MB limit)
    if (file && file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      e.target.value = "";
      return;
    }

    // Validate file type
    if (file && file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    setFormValues({
      ...formValues,
      policy: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("year", formValues.year);
      formData.append("type", formValues.type);
      if (formValues.policy) {
        formData.append("policy", formValues.policy);
      }

      await addSeason(formData);
      toast.success("Successfully added");
      setFormValues({ year: "", type: "", policy: null });
      setOpen(false);
      window.location.reload();
    } catch {
      toast.error("Some Error Occured");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="!text-black flex justify-center items-center"
    >
      <div className="p-4 bg-white rounded-xl md:w-1/3 w-11/12">
        <form className="max-w-sm mx-auto p-8" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="roundNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="year"
              value={formValues.year}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type
            </label>
            <Select
              name="type"
              value={{ value: formValues.type, label: formValues.type }}
              // @ts-ignore
              options={options}
              onChange={(value: any) => {
                setFormValues({ ...formValues, type: value.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            ></Select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="policy"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Policy Document (PDF)
            </label>
            <input
              type="file"
              name="policy"
              accept=".pdf"
              onChange={handleFileChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Upload a season policy document (PDF only, max 10MB)
            </p>
          </div>
          <Button type="submit">Add Season</Button>
        </form>
      </div>
    </Modal>
  );
};
interface AllSeasonsProps {
  seasons: SeasonFC[];
  setSeason: React.Dispatch<React.SetStateAction<SeasonFC[]>>;
}

export const AllSeasons: React.FC<AllSeasonsProps> = ({
  seasons,
  setSeason,
}) => {
  const [seasonYear, setSeasonYear] = useState<string>(null);

  const changeRegistered = (seasonYear: string) => {
    setSeasonYear(seasonYear);
  };
  const changeUnRegistered = (seasonYear: string) => {
    setSeasonYear(seasonYear);
  };

  const handleStatus = async (
    seasonID: string,
    year: string,
    type: string,
    status: string,
    index,
  ) => {
    try {
      await activateSeason(
        seasonID,
        year,
        type,
        status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      );
      setSeason((prev) => {
        const newSeason = [...prev];
        newSeason[index].status = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        return newSeason;
      });
      toast.success("Successfully updated");
    } catch {
      toast.error("Some Error Occured");
    }
  };

  return (
    <div>
      <div className="overflow-y-auto">
        <table className="w-full overflow-y-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Policy Document
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {seasons.map((season, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  seasonYear === season.year
                    ? `bg-blue-200 dark:bg-sky-800 hover:bg-sky-100 dark:hover:bg-sky-700`
                    : `bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600`
                } border-b dark:border-gray-700`}
                onClick={() => {
                  changeRegistered(season.year);
                  changeUnRegistered(season.year);
                }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {season.type}
                </th>
                <td className="px-6 py-4">{season.year}</td>
                <td className="px-6 py-4">{season.status}</td>
                <td className="px-6 py-4">
                  {season.policyDocument ? (
                    <Button
                      onClick={() =>
                        getSeasonPolicyDocumentAdmin(season.policyDocument!)
                      }
                      variant="outline"
                      size="sm"
                    >
                      View Policy
                    </Button>
                  ) : (
                    <span className="text-gray-400">No Policy</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => {
                      handleStatus(
                        season.id,
                        season.year,
                        season.type,
                        season.status,
                        index,
                      );
                    }}
                  >
                    {season.status === "ACTIVE" ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-2xl my-4 text-center font-semibold">Registered</h4>
      {seasonYear ? (
        <div className="overflow-y-auto">
          <Registered seasonYear={seasonYear} seasons={seasons} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Season to view more</div>
      )}
      <h4 className="text-2xl my-4 text-center font-semibold">
        Not Registered
      </h4>
      {seasonYear ? (
        <div className="overflow-y-auto">
          <UnRegistered seasonYear={seasonYear} seasons={seasons} />
        </div>
      ) : (
        <div className="text-center mt-4">Select Season to view more</div>
      )}
    </div>
  );
};

export const Registered = ({
  seasonYear,
}: {
  seasonYear: string;
  seasons: SeasonFC[];
}) => {
  const [Registered, setRegistered] = useState<[ApplicationFC]>(null);
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(seasonDTO);
  const [loadingbutton, setloadingbutton] = useState<boolean>(false);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );
  useEffect(() => {
    setLoading(true);
    setRegistered(null);
    const fetchData = async () => {
      try {
        const jsonData = await fetchSeasonData(seasonYear, true);
        setRegistered(jsonData);
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonYear]);

  return (
    <div className="w-full">
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {Registered && (
        <Table data={Registered} columns={visibleColumns} type={"season"} />
      )}
    </div>
  );
};

export const UnRegistered = ({
  seasonYear,
}: {
  seasonYear: string;
  seasons: SeasonFC[];
}) => {
  const [UnRegistered, setUnRegistered] = useState<[ApplicationFC]>(null);
  const [loading, setLoading] = useState(true);
  const columns = generateColumns(seasonDTO);
  const [loadingbutton, setloadingbutton] = useState<boolean>(false);
  const visibleColumns = columns.filter(
    (column: any) => !hiddenColumns.includes(column?.accessorKey),
  );

  useEffect(() => {
    setLoading(true);
    setUnRegistered(null);
    const fetchData = async () => {
      try {
        const jsonData = await fetchSeasonData(seasonYear, null);
        setUnRegistered(jsonData);
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seasonYear]);

  return (
    <div className="w-full">
      {loading && (
        <div className="flex justify-center">
          <CircularProgress />
        </div>
      )}
      {UnRegistered && (
        <Table data={UnRegistered} columns={visibleColumns} type={"season"} />
      )}
    </div>
  );
};

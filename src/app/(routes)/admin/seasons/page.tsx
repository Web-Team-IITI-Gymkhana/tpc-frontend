"use client";
import React from "react";
import { useState, useEffect } from "react";
import { AllSeasons } from "@/components/Admin/AllSeasons";
import { fetchAllSeasons } from "@/helpers/api";
import { SeasonFC } from "@/helpers/season/types";
import { Button } from "@/components/ui/button";
import { AddSeason } from "@/components/Admin/AllSeasons";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";

const SeasonsPage = () => {
  const [seasons, setData] = useState<SeasonFC[]>(null);
  const [loading, setLoading] = useState(true);
  const [addSeasonForm, setAddSeasonForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await fetchAllSeasons();
        setData(jsonData);
      } catch (error) {
        toast.error("Some error occured");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto my-4 md:my-8 px-2 md:px-4">
      <h1 className="text-2xl md:text-3xl mb-4 md:mb-8 font-bold mx-auto text-center">
        Seasons
      </h1>
      {addSeasonForm && (
        <AddSeason open={addSeasonForm} setOpen={setAddSeasonForm} />
      )}
      <div className="w-full px-2 md:px-4 pb-4 flex justify-center md:justify-end">
        <Button
          onClick={() => {
            setAddSeasonForm(true);
          }}
          className="w-full sm:w-auto"
        >
          Add Season
        </Button>
      </div>
      {loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
      {seasons && (
        <div>
          <AllSeasons seasons={seasons} setSeason={setData} />
        </div>
      )}
    </div>
  );
};

export default SeasonsPage;

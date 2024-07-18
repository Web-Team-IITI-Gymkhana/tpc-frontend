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
  const [seasons, setData] = useState<[SeasonFC]>(null);
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
    <div className="container my-8">
      <h1 className="text-3xl mb-8 font-bold mx-auto text-center">
        Seasons
      </h1>
      {addSeasonForm && (
        <AddSeason
          open={addSeasonForm}
          setOpen={setAddSeasonForm}
        />
      )}
      <div className="w-full px-4 pb-4 flex justify-end">
        <Button
          onClick={() => {
            setAddSeasonForm(true);
          }}
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
          <AllSeasons seasons={seasons} />
        </div>
      )}
    </div>
  );
};

export default SeasonsPage;

"use client";
import { fetchAllSeasons, fetchOnCampusOffers } from "@/helpers/api";
import generateColumns from "@/components/NewTableComponent/ColumnMapping";
import { onCampusOfferDTO } from "@/dto/onCampusOfferDTO";
import Table from "@/components/NewTableComponent/Table";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/loader";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const internHiddenColumns = ["salary.firstYearCTC", "salary.totalCTC", "salary.salaryPeriod"];
const placementHiddenColumns = ["salary.stipend", "salary.otherCompensations", "salary.salaryPeriod"];

const OnCampusOffersPage = () => {
  const columns = generateColumns(onCampusOfferDTO);
  const [seasons, setSeasons] = useState<{ id: string; name: string, type: string }[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [allOffers, setAllOffers] = useState();
  const [visibleColumns, setVisibleColumns] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllSeasons();
        if (Array.isArray(data)) {
          setSeasons(
            data.map((s: any) => ({
              id: s.id,
              name: `${s.type} - ${s.year}`,
              type: s.type,
            })),
          );
        }
        setSelectedSeason(data[0]?.id);
      } catch (error) {
        console.log(error);
        toast.error("Failed to select a season");
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectedSeason) {
      try {
      setLoading(true);
      fetchOnCampusOffers(selectedSeason).then((data) => {
        setAllOffers(data);
      });
      if (seasons.find(season => season.id === selectedSeason)?.type === "INTERN") {
        setVisibleColumns(columns.filter((column: any) => !internHiddenColumns.includes(column?.accessorKey)));
      } else {
          setVisibleColumns(columns.filter((column: any) => !placementHiddenColumns.includes(column?.accessorKey)));
        }
      } catch (error) {
        toast.error("Failed to fetch on campus offers");
      } finally {
        setLoading(false);
      }
    }
  }, [selectedSeason]);

  return (
    <div className="container mx-auto my-4 md:my-8 px-2 md:px-4">
      <h1 className="text-2xl md:text-3xl mb-4 md:mb-8 font-bold mx-auto text-center">
        On Campus Offers
      </h1>
      <div className="flex justify-center">
          <Select onValueChange={(value) => setSelectedSeason(value)} value={selectedSeason}>
            <SelectTrigger>
              <SelectValue>
                {seasons.find(season => season.id === selectedSeason)?.name || "Select a season"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season.id} value={season.id}>
                  {season.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
      </div>
      {loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}
      {allOffers && (
        <div>
          <Table
            data={allOffers}
            columns={visibleColumns}
            type={"on-campus-offers"}
          />
        </div>
      )}
    </div>
  );
};

export default OnCampusOffersPage;
